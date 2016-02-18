'use strict';

var path = require('path');
var async = require('async');
var yeoman = require('yeoman-generator');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('XH Generator with default options', function () {
  before(function (done) {

    async.series([
      function (callback) {
        helpers
          .run(path.join(__dirname, '../../app'))
          .withOptions({
            'skip-install': true,
            'skip-update': true
          })
          .withPrompts({
            projectName: 'Test Project'
          })
          .on('end', callback);
      },
      function (callback) {
        helpers
          .run(path.join(__dirname, '../../page'), { tmpdir: false })
          .withArguments(['Home', 'Test'])
          .withOptions({
            'skip-build': true
          })
          .on('ready', function (generator) {
            generator.conflicter.force = true;
          })
          .on('end', callback);
      }
    ], done);

  });

  describe('Page subgenerator', function () {
    it('can be imported without blowing up', function (done) {
      assert(require('../../page') !== undefined);

      done();
    });

    it('should generate HTML files', function (done) {
      assert.file([
        'src/home.html',
        'src/test.html'
      ]);

      done();
    });

    it('should create valid Yeoman configuration file', function (done) {
      assert.file('.yo-rc.json');
      assert.fileContent('.yo-rc.json', '"pages": [');
      assert.fileContent('.yo-rc.json', '"Home"');
      assert.fileContent('.yo-rc.json', '"Test"');

      done();
    });
  });
});

'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;

describe('XH Generator with Less', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../../app'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompts({
        projectName: 'Test Project',
        cssPreprocessor: 'less'
      })
      .on('end', done);

  });

  it('should generate grunt files', function (done) {
    assert.file([
      'grunt/contrib-less.js'
    ]);

    done();
  });

  it('should generate Less files', function (done) {
    assert.file([
      'src/less/main.less',
      'src/less/setup/_variables.less',
      'src/less/setup/_mixins.less',
      'src/less/common/_utilities.less',
      'src/less/common/_layout.less',
      'src/less/components/.keep',
      'src/less/vendor/.keep'
    ]);

    done();
  });

  it('should create valid Yeoman configuration file', function (done) {
    assert.file('.yo-rc.json');
    assert.fileContent('.yo-rc.json', '"cssPreprocessor": "less"');

    done();
  });
});

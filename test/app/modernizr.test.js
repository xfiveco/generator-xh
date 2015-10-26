'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;

describe('XH Generator with Modernizr', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../../app'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompts({
        projectName: 'Test Project',
        features: ['useModernizr']
      })
      .on('end', done);

  });

  it('should generate Modernizr files', function (done) {
    assert.file([
      'grunt/modernizr.js'
    ]);

    done();
  });

  it('should add Modernizr declaration in head template', function (done) {
    assert.fileContent('src/includes/head.html', /modernizr.min.js/);

    done();
  });

  it('should create valid Yeoman configuration file', function (done) {
    assert.file('.yo-rc.json');
    assert.fileContent('.yo-rc.json', '"useModernizr": true');

    done();
  });
});

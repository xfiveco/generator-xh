'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('XH Generator with Bootstrap', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../../app'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompts({
        projectName: 'Test Project',
        features: ['useBootstrap']
      })
      .on('end', done);

  });

  it('should generate Bootstrap files', function (done) {
    assert.file([
      'src/bootstrap.html',
      'src/scss/vendor/bootstrap/_variables.scss'
    ]);

    done();
  });

  it('should add Bootstrap declaration to Bower components', function (done) {
    assert.fileContent('bower.json', /bootstrap/);

    done();
  });

  it('shouldn\'t add Normalize explicitly as a dependency', function () {
    assert.noFileContent('bower.json', '"normalize.css"');
  });

  it('should create valid Yeoman configuration file', function (done) {
    assert.file('.yo-rc.json');
    assert.fileContent('.yo-rc.json', '"useBootstrap": true');

    done();
  });
});

'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;

describe('XH Generator with Icomoon support', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../../app'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompts({
        projectName: 'Test Project',
        features: ['useIcomoon']
      })
      .on('end', done);

  });

  it('should generate grunt files', function (done) {
    assert.file([
      'grunt/icomoon-zip.js'
    ]);

    done();
  });

  it('should generate Icomoon files', function (done) {
    assert.file([
      'src/scss/vendor/_icomoon.scss'
    ]);

    done();
  });

  it('should generate icomoon style reference', function (done) {
    assert.fileContent('src/scss/main.scss', 'icomoon');

    done();
  });

  it('should create valid Yeoman configuration file', function (done) {
    assert.file('.yo-rc.json');
    assert.fileContent('.yo-rc.json', '"useIcomoon": true');

    done();
  });
});

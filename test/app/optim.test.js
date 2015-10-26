'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;

describe('XH Generator with Image optimisation', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../../app'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompts({
        projectName: 'Test Project',
        features: ['useOptim']
      })
      .on('end', done);

  });

  it('should generate grunt files', function (done) {
    assert.file([
      'grunt/contrib-imagemin.js',
      'grunt/svg2png.js'
    ]);

    done();
  });

  it('should create valid Yeoman configuration file', function (done) {
    assert.file('.yo-rc.json');
    assert.fileContent('.yo-rc.json', '"useOptim": true');

    done();
  });
});

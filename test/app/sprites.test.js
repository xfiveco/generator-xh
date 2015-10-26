'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;

describe('XH Generator with Image sprites', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../../app'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompts({
        projectName: 'Test Project',
        features: ['useSprites']
      })
      .on('end', done);

  });

  it('should generate grunt files', function (done) {
    assert.file([
      'grunt/contrib-imagemin.js',
      'grunt/svg2png.js',
      'grunt/spritesmith.js'
    ]);

    done();
  });

  it('should generate sprites assets structure', function (done) {
    assert.file([
      'src/img/sprites/1x/.keep',
      'src/img/sprites/2x/.keep'
    ]);

    done();
  });

  it('should generate sprites style files', function (done) {
    assert.file([
      'src/scss/setup/_sprites.scss',
      'src/scss/setup/_sprites.scss.mustache'
    ]);

    done();
  });

  it('should create valid Yeoman configuration file', function (done) {
    assert.file('.yo-rc.json');
    assert.fileContent('.yo-rc.json', '"useSprites": true');

    done();
  });
});

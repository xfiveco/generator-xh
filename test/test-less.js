/*global describe, before, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('XH Generator Less', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp', 'less'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompt({
        projectName: 'Test Project',
        useBranding: false,
        reloader: 'LiveReload',
        server: true,
        cssPreprocessor: 'less',
        ignoreDist: true,
        isWP: false,
        features: ['useSprites']
      })
      .on('end', done);

  });

  it('creates configuration files', function (done) {
    var expectedFiles = [
      '.yo-rc.json',
      '.bowerrc',
      '.editorconfig',
      '.gitattributes',
      '.jshintrc',
      '.gitignore',
      'package.json',
      'bower.json',
      'README.md'
    ];

    assert.file(expectedFiles);
    done();
  });

  it('creates Grunt files', function (done) {
    var expectedFiles = [
      'Gruntfile.js',
      'grunt/contrib-clean.js',
      'grunt/contrib-concat.js',
      'grunt/contrib-connect.js',
      'grunt/contrib-copy.js',
      'grunt/contrib-jshint.js',
      'grunt/contrib-less.js',
      'grunt/contrib-uglify.js',
      'grunt/contrib-watch.js',
      'grunt/cssbeautifier.js',
      'grunt/html-validation.js',
      'grunt/include-replace.js',
      'grunt/jsbeautifier.js',
      'grunt/postcss.js',
      'grunt/search.js',
      'grunt/spritesmith.js',
      'grunt/text-replace.js',
      'grunt/usemin.js',
      'grunt/build-helpers.js'
    ];

    assert.file(expectedFiles);
    done();
  });

  it('creates HTML structure', function (done) {
    var expectedFiles = [
      'index.html',
      'src/template.html',
      'src/includes/head.html',
      'src/includes/header.html',
      'src/includes/sidebar.html',
      'src/includes/scripts.html',
      'src/includes/footer.html'
    ];

    assert.file(expectedFiles);
    done();
  });

  it('creates Less structure', function (done) {
    var expectedFiles = [
      'src/less/main.less',
      'src/less/setup/_variables.less',
      'src/less/setup/_mixins.less',
      'src/less/common/_utilities.less',
      'src/less/common/_layout.less',
      'src/less/components/.keep',
      'src/less/vendor/.keep'
    ];

    assert.file(expectedFiles);
    done();
  });

  it('creates JS structure', function (done) {
    var expectedFiles = [
      'src/js/main.js'
    ];

    assert.file(expectedFiles);
    done();
  });

  it('creates assets structure', function (done) {
    var expectedFiles = [
      'src/fonts/.keep',
      'src/img/.keep',
      'src/media/.keep',
      'src/designs/.keep'
    ];

    assert.file(expectedFiles);
    done();
  });

  it('creates sprites structure', function (done) {
    var expectedFiles = [
      'src/img/sprites/1x/.keep',
      'src/img/sprites/2x/.keep',
      'src/less/setup/_sprites.less',
      'src/less/setup/_sprites.less.mustache'
    ];

    assert.file(expectedFiles);
    done();
  });
});

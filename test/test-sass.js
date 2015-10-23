/*global describe, before, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('XH Generator Sass', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp', 'scss'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompts({
        projectName: 'Test Project',
        useBranding: true,
        reloader: 'None',
        server: false,
        cssPreprocessor: 'scss',
        ignoreDist: false,
        isWP: false,
        features: []
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
      'grunt/contrib-copy.js',
      'grunt/contrib-jshint.js',
      'grunt/contrib-uglify.js',
      'grunt/contrib-watch.js',
      'grunt/cssbeautifier.js',
      'grunt/html-validation.js',
      'grunt/include-replace.js',
      'grunt/jsbeautifier.js',
      'grunt/sass.js',
      'grunt/postcss.js',
      'grunt/search.js',
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

  it('creates Sass structure', function (done) {
    var expectedFiles = [
      'src/scss/main.scss',
      'src/scss/setup/_variables.scss',
      'src/scss/setup/_mixins.scss',
      'src/scss/common/_utilities.scss',
      'src/scss/common/_layout.scss',
      'src/scss/components/.keep',
      'src/scss/vendor/.keep'
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
});

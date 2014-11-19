/*global describe, before, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('XH Generator Defaults', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp', 'defaults'))
      .withOptions({
        'skip-install': true
      })
      .withPrompt({
        projectName: 'Test Project',
        useBranding: true,
        reloader: 'BrowserSync',
        server: true,
        cssPreprocessor: 'LIBSASS',
        ignoreDist: true,
        isWP: true,
        features: ['useBootstrap', 'useModernizr', 'useCSS3Pie', 'useSprites']
      })
      .on('end', done);

  });

  it('creates expected files', function (done) {
    var expectedFiles = [
      // add files you expect to exist here.
      '.yo-rc.json',
      '.bowerrc',
      '.editorconfig',
      '.gitattributes',
      '.jshintrc',
      '.gitignore',
      'package.json',
      'bower.json',
      'Gruntfile.js',
      'grunt/autoprefixer.js',
      'grunt/browser-sync.js',
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
      'grunt/remfallback.js',
      'grunt/sass.js',
      'grunt/search.js',
      'grunt/spritesmith.js',
      'grunt/text-replace.js',
      'grunt/usemin.js',
      'grunt/build-helpers.js',
      'index.html',
      'src/fonts/.keep',
      'src/img/.keep',
      'src/img/sprites/1x/.keep',
      'src/img/sprites/2x/.keep',
      'src/media/.keep',
      'src/designs/.keep',
      'src/template.html',
      'src/includes/head.html',
      'src/includes/header.html',
      'src/includes/sidebar.html',
      'src/includes/scripts.html',
      'src/includes/footer.html',
      'src/wp.html',
      'src/scss/main.scss',
      'src/scss/setup/_variables.scss',
      'src/scss/setup/_mixins.scss',
      'src/scss/_common.scss',
      'src/scss/_wordpress.scss',
      'src/scss/setup/_sprites.scss',
      'src/js/main.js',
      'src/js/PIE.htc',
      'wp/wp-content/themes'
    ];

    assert.file(expectedFiles);
    done();
  });

  it('creates pages', function (done) {
    var expectedFiles = [
      'src/home.html',
      'src/test.html'
    ];

    helpers
      .run(path.join(__dirname, '../page'))
      .withArguments(['Home', 'Test'])
      .withOptions({
        'skip-build': true
      })
      .on('ready', function (generator) {
        generator.conflicter.force = true;
      })
      .on('end', function () {
        assert.file(expectedFiles);
        done();
      });
  });

});


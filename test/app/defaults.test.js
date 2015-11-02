'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;

describe('XH Generator with default options', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../../app'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompts({
        projectName: 'Test Project',
        features: ['useJquery']
      })
      .on('end', done);

  });

  it('can be imported without blowing up', function (done) {
    assert(require('../../app') !== undefined);

    done();
  });

  it('should generate configuration files', function (done) {
    assert.file([
      '.bowerrc',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jshintrc',
      'bower.json',
      'package.json',
      'README.md'
    ]);

    done();
  });

  it('should generate grunt files', function (done) {
    assert.file([
      'Gruntfile.js',
      'grunt/build-helpers.js',
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
      'grunt/postcss.js',
      'grunt/sass.js',
      'grunt/search.js',
      'grunt/text-replace.js',
      'grunt/usemin.js'
    ]);

    done();
  });

  it('should generate HTML files', function (done) {
    assert.file([
      'index.html',
      'src/template.html',
      'src/includes/head.html',
      'src/includes/header.html',
      'src/includes/sidebar.html',
      'src/includes/scripts.html',
      'src/includes/footer.html'
    ]);

    done();
  });

  it('should generate Sass files', function (done) {
    assert.file([
      'src/scss/main.scss',
      'src/scss/setup/_variables.scss',
      'src/scss/setup/_mixins.scss',
      'src/scss/common/_utilities.scss',
      'src/scss/common/_layout.scss',
      'src/scss/components/.keep',
      'src/scss/vendor/.keep'
    ]);

    done();
  });

  it('should generate JS files', function (done) {
    assert.file([
      'src/js/main.js'
    ]);

    done();
  });

  it('should generate assets structure', function (done) {
    assert.file([
      'src/fonts/.keep',
      'src/img/.keep',
      'src/media/.keep'
    ]);

    done();
  });

  it('should generate the same app name in every file', function (done) {
    var expectedName = 'test-project';

    assert.fileContent('bower.json', '"name": "' + expectedName + '"');
    assert.fileContent('package.json', '"name": "' + expectedName + '"');

    done();
  });

  it('should create valid Yeoman configuration file', function (done) {
    assert.file('.yo-rc.json');
    assert.fileContent('.yo-rc.json', '"projectName": "Test Project"');
    assert.fileContent('.yo-rc.json', '"useBranding": true');
    assert.fileContent('.yo-rc.json', '"reloader": "BrowserSync"');
    assert.fileContent('.yo-rc.json', '"devServer": true');
    assert.fileContent('.yo-rc.json', '"cssPreprocessor": "scss"');
    assert.fileContent('.yo-rc.json', '"ignoreDist": true');
    assert.fileContent('.yo-rc.json', '"isWP": false');
    assert.fileContent('.yo-rc.json', '"extension": "html"');

    done();
  });
});

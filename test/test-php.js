/*global describe, before, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('XH Generator with PHP option', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp', 'php'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompt({
        projectName: 'Test Project',
        useBranding: true,
        reloader: 'BrowserSync',
        server: false,
        extension: 'php',
        cssPreprocessor: 'LIBSASS',
        ignoreDist: true,
        isWP: true,
        features: []
      })
      .on('end', done);

  });

  it('creates HTML structure', function (done) {
    var expectedFiles = [
      'index.html',
      'src/template.php',
      'src/includes/head.php',
      'src/includes/header.php',
      'src/includes/sidebar.php',
      'src/includes/scripts.php',
      'src/includes/footer.php'
    ];

    assert.file(expectedFiles);
    done();
  });

  it('creates pages using \'page\' subgenerator', function (done) {
    var expectedFiles = [
      'src/home.php',
      'src/test.php'
    ];

    helpers
      .run(path.join(__dirname, '../page'), {
        tmpdir: false
      })
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

/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('XH generator Less', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('xh:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.bowerrc',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jshintrc',
      '.yo-rc.json',
      'bower.json',
      'Gruntfile.js',
      'index.html',
      'package.json',
      'src',
      'src/includes',
      'src/includes/footer.html',
      'src/includes/head.html',
      'src/includes/header.html',
      'src/includes/scripts.html',
      'src/includes/sidebar.html',
      'src/js',
      'src/js/main.js',
      'src/less',
      'src/less/common.less',
      'src/less/mixins.less',
      'src/less/variables.less',
      'src/less/main.less',
      'dist',
      'dist/_xprecise',
      'dist/css',
      'dist/img',
      'dist/media',
      'dist/js'
    ];

    helpers.mockPrompt(this.app, {
      projectName: 'Test Project',
      useBranding: false,
      cssPreprocessor: 'LESS',
      isWP: false,
      features: []
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});


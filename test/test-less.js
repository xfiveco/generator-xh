/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('XH generator Less', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp', 'less'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('xh:app', [
        '../../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
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
      'index.html',
      'src/fonts/do_not_delete_me.png',
      'src/img/do_not_delete_me.png',
      'src/media/do_not_delete_me.png',
      'src/xprecise/do_not_delete_me.png',
      'src/template.html',
      'src/includes/head.html',
      'src/includes/header.html',
      'src/includes/sidebar.html',
      'src/includes/scripts.html',
      'src/includes/footer.html',
      'src/less/main.less',
      'src/less/variables.less',
      'src/less/mixins.less',
      'src/less/common.less',
      'src/js/main.js'
    ];

    helpers.mockPrompt(this.app, {
      projectName: 'Test Project',
      useBranding: false,
      reloader: 'LiveReload',
      server: true,
      cssPreprocessor: 'LESS',
      ignoreDist: true,
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


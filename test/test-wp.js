/*global describe, before, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('XH WP Defaults + XH Generator Defaults', function () {
  before(function (done) {
    this.timeout(60000);

    helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp', 'wp'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompts({
        projectName: 'Test Project',
        useBranding: true,
        reloader: 'BrowserSync',
        server: true,
        cssPreprocessor: 'scss',
        ignoreDist: true,
        isWP: true,
        features: ['useJquery', 'useBootstrap', 'useModernizr', 'useSprites']
      })
      .on('end', function () {
        helpers
          .run(path.join(__dirname, '../wp'), {
            tmpdir: false
          })
          .withPrompts({
            databaseHost: '$_SERVER[\'XTEAM_DB_HOST\']',
            databaseName: '$_SERVER[\'XTEAM_DB_NAME\']',
            databaseUser: '$_SERVER[\'XTEAM_DB_USER\']',
            databasePassword: '$_SERVER[\'XTEAM_DB_PASSWORD\']',
            features: [ 'installWPizedLight', 'installWpSyncDb', 'installWpStream' ]
          })
          .on('ready', function (generator) {
            generator.conflicter.force = true;
          })
          .on('end', function () {
            done();
          });
      });

  });

  it('creates WordPress config', function () {
    var expectedFiles = [
      'wp/wp-config.php'
    ];

    assert.file(expectedFiles);
  });

  it('creates WPLight theme file', function () {
    var expectedFiles = [
      'wp/wp-content/themes/test-project/style.css'
    ];

    assert.file(expectedFiles);
  });
});

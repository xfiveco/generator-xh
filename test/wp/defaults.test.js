'use strict';

var path = require('path');
var async = require('async');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;

describe('XH Generator with default options', function () {
  before(function (done) {
    this.timeout(60000);

    async.series([
      function (callback) {
        helpers
          .run(path.join(__dirname, '../../app'))
          .inDir(path.join(__dirname, 'temp'))
          .withOptions({
            'skip-install': true,
            'skip-update': true
          })
          .withPrompts({
            projectName: 'Test Project',
            isWP: true,
          })
          .on('end', callback);
      },
      function (callback) {
        helpers
          .run(path.join(__dirname, '../../wp'), { tmpdir: false })
          .withPrompts({
            databaseHost: '$_SERVER[\'XTEAM_DB_HOST\']',
            databaseName: '$_SERVER[\'XTEAM_DB_NAME\']',
            databaseUser: '$_SERVER[\'XTEAM_DB_USER\']',
            databasePassword: '$_SERVER[\'XTEAM_DB_PASSWORD\']',
            features: ['installWPizedLight', 'installWpSyncDb', 'installWpStream']
          })
          .on('ready', function (generator) {
            generator.conflicter.force = true;
          })
          .on('end', callback);
      }
    ], done);

  });

  describe('WordPress subgenerator', function () {
    it('can be imported without blowing up', function (done) {
      assert(require('../../wp') !== undefined);

      done();
    });

    it('should generate WordPress core files', function (done) {
      assert.file([
        'wp/index.php',
        'wp/wp-config-sample.php',
        'wp/wp-content/index.php'
      ]);

      done();
    });

    it('should generate customized WordPress config', function (done) {
      assert.file('wp/wp-config.php');
      assert.fileContent('wp/wp-config.php', '\'DB_NAME\', $_SERVER');

      done();
    });

    it('should generate vhost config', function (done) {
      assert.file('dev-vhost.conf');

      done();
    });

    it('should generate WP Stream plugin', function (done) {
      assert.file('wp/wp-content/plugins/wp-stream/');

      done();
    });

    it('should generate WP Sync DB plugin', function (done) {
      assert.file('wp/wp-content/plugins/wp-sync-db/');
      assert.file('wp/wp-content/plugins/wp-sync-db-media-files/');

      done();
    });

    it('should generate WPized Light theme', function (done) {
      assert.file('wp/wp-content/themes/test-project/style.css');

      done();
    });
  });
});

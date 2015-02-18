'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var config = require(process.cwd() + '/.yo-rc.json')['generator-xh'].config;
var path = require('path');
var Download = require('download');
var fs = require('fs');
var tar = require('tar');
var zlib = require('zlib');

var WPGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    if (!config.isWP) {
      this.log('This project was not set up as a WordPress project');
      process.exit();
    }

    if (yeoman.file.exists(config.wpFolder + '/wp-config.php')) {
      this.log('WordPress is already installed.');
      process.exit();
    }
  },

  prompting: function () {
    var done = this.async();

    // Welcome user
    this.log('');
    this.log(chalk.cyan(' **********************************************') + '\n');
    this.log(chalk.white('  Set up WordPress installation') + '\n');
    this.log(chalk.cyan(' **********************************************') + '\n');

    var prompts = [{
        name: 'databaseHost',
        message: 'Please enter the database host:',
        default: '$_SERVER[\'XTEAM_DB_HOST\']'
      }, {
        name: 'databaseName',
        message: 'Please enter the database name:',
        default: '$_SERVER[\'XTEAM_DB_NAME\']'
      }, {
        name: 'databaseUser',
        message: 'Please enter the database user:',
        default: '$_SERVER[\'XTEAM_DB_USER\']'
      }, {
        name: 'databasePassword',
        message: 'Please enter the database password:',
        default: '$_SERVER[\'XTEAM_DB_PASSWORD\']'
      }, {
        type: 'checkbox',
        name: 'features',
        message: 'Select additional features:',
        choices: [{
            name: 'WPized Light Base Theme',
            value: 'installWPizedLight',
            checked: true
        }, {
            name: 'WP Sync DB Plugin',
            value: 'installWpSyncDb',
            checked: true
        }, {
            name: 'Stream Plugin',
            value: 'installWpStream',
            checked: true
        }]
      }
    ];

    this.prompt(prompts, function (props) {
      this.databaseHost = props.databaseHost;
      this.databaseName = props.databaseName;
      this.databaseUser = props.databaseUser;
      this.databasePassword = props.databasePassword;
      this.features = props.features;

      var features = this.features;

      function hasFeature(feat) {
        return features.indexOf(feat) !== -1;
      }

      this.installWPizedLight = hasFeature('installWPizedLight');
      this.installWpSyncDb = hasFeature('installWpSyncDb');
      this.installWpStream = hasFeature('installWpStream');

      done();

    }.bind(this));
  },

  writing: {
    installWordPress: function () {
      var done = this.async();
      var self = this;

      this._getCurrentWpVersion(function(err, ver) {

        var username = 'wordpress';
        var repo = 'wordpress';
        var url = 'https://github.com/' + [username, repo, 'archive', ver].join('/') + '.tar.gz';
        var cache = path.join(self.cacheRoot(), username, repo);
        var file = path.join(cache, ver + '.tar.gz');
        var extractPath = path.join(cache, ver);

        self.log.write()
          .info('... Fetching %s ...', url)
          .info(chalk.yellow('This might take a few moments'));

        var cb = function (err) {
          if (err) {
            return done();
          }

          var onError = function (err) {
            done(err);
          };

          var onEnd = function () {
            self.bulkDirectory(extractPath, config.wpFolder);

            self.cachePath = extractPath;
            self._createConfig(self);

            done();
          };

          self.log('\nCopying WordPress ' + ver + '\n');

          var extractor = tar.Extract({
            path: extractPath,
            strip: 1
          })
            .on('error', onError)
            .on('end', onEnd);

          fs.createReadStream(file)
            .on('error', onError)
            .pipe(zlib.createGunzip())
            .pipe(extractor);
        };

        fs.stat(file, function (err) {
          // already cached
          if (!err) {
            self.log.write().ok('Found cached archive in ' + cache).write();
            return cb(null, self);
          }

          var opts = { extract: false };
          var download = new Download(opts)
            .get(url)
            .dest(cache);

          download.run(function (err) {
            if (err) {
              return cb(err, self);
            }

            self.log.write().ok('Done in ' + cache).write();
            return cb(null, self);
          });
        });
      });

    },

    installWPizedLight: function () {
      if (!this.installWPizedLight) {
        return;
      }

      var done = this.async();
      var self = this;

      this.remote('xhtmlized', 'wpized-light', 'master', function (err, remote) {

        if (err) {
          return done(err);
        }

        self.log('\nCopying WPized Light Theme\n');

        // cannot use remote.bulkDirectory here
        // since we need to specify 'process' argument to update file contents
        var root = self.sourceRoot();
        self.sourceRoot(remote.cachePath);
        self.bulkDirectory('.', config.wpThemeFolder, self._updateThemeStyles);
        self.sourceRoot(root);

        done();
      }, true);

    },

    installWpSyncDb: function () {
      if (!this.installWpSyncDb) {
        return;
      }

      var done = this.async();
      var self = this;

      this.remote('wp-sync-db', 'wp-sync-db', 'master', function (err, remote) {

        if (err) {
          return done(err);
        }

        self.log('\nCopying WP Sync DB Plugin\n');

        remote.bulkDirectory('.', 'wp/wp-content/plugins/wp-sync-db');

        done();
      });
    },

    installWpStream: function () {
      if (!this.installWpStream) {
        return;
      }

      var done = this.async();
      var self = this;

      this.remote('x-team', 'wp-stream', 'master', function (err, remote) {

        if (err) {
          return done(err);
        }

        self.log('\nCopying Stream Plugin\n');

        remote.bulkDirectory('.', 'wp/wp-content/plugins/stream');

        done();
      });
    },

    createVhostFile: function () {
      var name = this._.slugify(config.projectName);
      this.documentRoot = process.cwd();
      this.serverName = 'dev-' + name + '.previewized.com';
      this.dbName = name;
      this.template('dev-vhost.conf', 'dev-vhost.conf');
    }
  },

  end: function () {
    this.log('\nAll done!');
  },

  /**
   * Find out current WordPress version from repository tags.
   */
  _getCurrentWpVersion: function (callback) {

    var latestVersion = '4.1';

    require('simple-git')().listRemote('--tags git://github.com/WordPress/WordPress.git', function (err, tagsList) {

      if (err) {
        return callback(err, latestVersion);
      }

      var tagList = ('' + tagsList).split('\n');
      tagList.pop();

      var lastTag = /\d\.\d(\.\d)?/ig.exec(tagList.pop());

      if (lastTag !== null) {
        latestVersion = lastTag[0];
      }

      callback(null, latestVersion);
    });

  },

  /**
   * Wrap setting in quotes if needed.
   */
  _getDbSetting: function (setting) {
    if (setting.indexOf('$_SERVER') !== -1) {
      return setting;
    } else {
      return '\'' + setting + '\'';
    }
  },

  /**
   * Create WP config file based on config sample from cache
   * (actual files won't be written to disk until conflicter finishes,
   * so we cannot just grab one from theme dir).
   */
  _createConfig: function (remote) {
    var prefix = this._.slugify(config.projectName).replace(/-/g, '_');

    var contents = this.fs.read(remote.cachePath + '/wp-config-sample.php')
      .replace('\'localhost\'', this._getDbSetting(this.databaseHost))
      .replace('\'database_name_here\'', this._getDbSetting(this.databaseName))
      .replace('\'username_here\'', this._getDbSetting(this.databaseUser))
      .replace('\'password_here\'', this._getDbSetting(this.databasePassword))
      .replace('wp_', prefix + '_');

    this.fs.write(config.wpFolder + '/wp-config.php', contents);
  },

  /**
   * Replace theme name in styles file before copy.
   */
  _updateThemeStyles: function (body, source, destination) {
    if (path.basename(destination) === 'style.css') {
      body = body.replace('WPized Light', config.projectName);
    }

    return body;
  }

});

module.exports = WPGenerator;

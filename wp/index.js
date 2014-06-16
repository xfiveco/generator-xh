'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var config = require(process.cwd() + '/.yo-rc.json')['generator-xh'].config;

var WPGenerator = yeoman.generators.Base.extend({
  init: function () {

    this.wpFolder = 'wp';
    this.themeFolder = this._.slugify(config.projectName);

    console.log(config.isWP);
    console.log(config.projectName);
    console.log(this.themeFolder);
  },


  _installWordPress: function () {
    var done = this.async();

    this.remote('wordpress', 'wordpress', '3.9.1', function (err, remote) {

      if (err) {
        return done(err);
      }

      remote.bulkDirectory('.', this.wpFolder);

      console.log('WordPress installed');

      done();
    });
  },

  _installWPizedLight: function () {
    var done = this.async();

    this.remote('xhtmlized', 'wpized-light', 'master', function (err, remote) {

      if (err) {
        return done(err);
      }

      remote.bulkDirectory('.', this.wpFolder + '/wp-content/themes/' + this.themeFolder);

      console.log('WPized Light installed');

      done();
    });
  },

  addConfig: function () {
    var wpConfigFile = this.readFileAsString(this.wpFolder + '/wp-config-sample.php');
    this.write(this.wpFolder + '/wp-config.php', wpConfigFile);
  }
});

module.exports = WPGenerator;

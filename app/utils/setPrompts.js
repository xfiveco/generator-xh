'use strict';

var _ = require('lodash');

module.exports = function (prompts) {
  this.projectName = prompts.projectName;
  this.projectNameSlug = _.kebabCase(prompts.projectName);
  this.projectNameCamel = _.capitalize(_.camelCase(prompts.projectName));

  this.authorName = prompts.useBranding ? 'XHTMLized' : prompts.authorName;
  this.useBranding = prompts.useBranding;
  this.reloader = prompts.reloader;
  this.server = prompts.server;
  this.cssPreprocessor = prompts.cssPreprocessor;
  this.ignoreDist = prompts.ignoreDist;
  this.isWP = prompts.isWP;
  this.features = {};
  this.extension = prompts.extension;
  this.proxy = prompts.proxy;

  for (var i in prompts.features) {
    this.features[prompts.features[i]] = true;
  }

  // WP
  if (this.isWP) {
    this.wpFolder = 'wp';
    this.wpThemeFolderName = _.kebabCase(this.projectName);
    this.wpThemeFolder = this.wpFolder + '/wp-content/themes/' + this.wpThemeFolderName;
  }

  this.prompts = prompts;
  this.prompts.wpFolder = this.wpFolder;
  this.prompts.wpThemeFolder = this.wpThemeFolder;
};

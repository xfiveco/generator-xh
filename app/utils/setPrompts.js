'use strict';

var _ = require('lodash');

module.exports = function (answers) {
  this.prompts = {};

  this.prompts.projectName = answers.projectName;
  this.prompts.projectNameSlug = _.kebabCase(answers.projectName);
  this.prompts.projectNameCamel = _.capitalize(_.camelCase(answers.projectName));

  this.prompts.authorName = answers.useBranding ? 'XHTMLized' : answers.authorName;
  this.prompts.useBranding = answers.useBranding;
  this.prompts.reloader = answers.reloader;
  this.prompts.server = answers.server;
  this.prompts.cssPreprocessor = answers.cssPreprocessor;
  this.prompts.ignoreDist = answers.ignoreDist;
  this.prompts.isWP = answers.isWP;
  this.prompts.extension = answers.extension;
  this.prompts.proxy = answers.proxy;
  this.prompts.features = {};

  for (var i in answers.features) {
    this.prompts.features[answers.features[i]] = true;
  }

  if (this.prompts.isWP) {
    this.prompts.wpFolder = 'wp';
    this.prompts.wpThemeFolderName = _.kebabCase(this.prompts.projectName);
    this.prompts.wpThemeFolder = this.prompts.wpFolder + '/wp-content/themes/' + this.prompts.wpThemeFolderName;
  }
};

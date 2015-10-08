'use strict';

var _ = require('lodash');

module.exports = function (props) {
  props.extension = props.extension !== undefined ? props.extension.toLowerCase() : 'html';

  this.projectName = props.projectName;
  this.projectNameSlug = _.kebabCase(props.projectName);
  this.projectNameCamel = _.capitalize(_.camelCase(props.projectName));

  this.useBranding = props.useBranding;
  this.reloader = props.reloader;
  this.server = props.server;
  this.cssPreprocessor = props.cssPreprocessor;
  this.ignoreDist = props.ignoreDist;
  this.isWP = props.isWP;
  this.features = {};
  this.extension = props.extension;
  this.proxy = props.proxy;

  for (var i in props.features) {
    this.features[props.features[i]] = true;
  }

  if (this.useBranding) {
    this.projectAuthor = 'XHTMLized';
  } else {
    this.projectAuthor = '';
  }

  // WP
  if (this.isWP) {
    this.wpFolder = 'wp';
    this.wpThemeFolderName = _.kebabCase(this.projectName);
    this.wpThemeFolder = this.wpFolder + '/wp-content/themes/' + this.wpThemeFolderName;
  }

  this.props = props;
  this.props.wpFolder = this.wpFolder;
  this.props.wpThemeFolder = this.wpThemeFolder;
};

'use strict';

module.exports = function (props) {
  this.projectName = props.projectName;
  this.useBranding = props.useBranding;
  this.ignoreDist = props.ignoreDist;
  this.cssPreprocessor = props.cssPreprocessor;
  this.isWP = props.isWP;
  this.features = props.features;
  this.reloader = props.reloader;
  this.server = props.server;

  var features = this.features;

  function hasFeature(feat) {
    return features.indexOf(feat) !== -1;
  }

  this.useBootstrap = hasFeature('useBootstrap');
  this.useModernizr = hasFeature('useModernizr');
  this.useCSS3Pie = hasFeature('useCSS3Pie');

  if (this.useBranding) {
    this.projectAuthor = 'XHTMLized';
  } else {
    this.projectAuthor = '';
  }

  // WP
  if (this.isWP) {
    this.wpFolder = 'wp';
    this.wpThemeFolderName = this._.slugify(this.projectName);
    this.wpThemeFolder = this.wpFolder + '/wp-content/themes/' + this.wpThemeFolderName;
  }

  this.props = props;
  this.props.wpFolder = this.wpFolder;
  this.props.wpThemeFolder = this.wpThemeFolder;
};
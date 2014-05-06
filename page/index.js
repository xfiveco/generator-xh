'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var config = require(process.cwd() + '/.yo-rc.json')['generator-xh'].config;

var PageGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    if (!this.name) {
        console.log('Name cannot be empty.');
        return;
    }

    this.cssPreprocessor = config.cssPreprocessor;
    this.slug = this._.slugify(this.name);

    console.log('Creating page ' + this.name + '.');
  },

  // Create HTML page and list it on the project index file
  addHTML: function () {
    var filename = this.slug + '.html';
    var filepath = 'src/' + filename;
    var projectIndex = this.readFileAsString('index.html');
    var pageLink = '<li><i class="fa fa-file-o"></i><a href="dist/' + filename + '"><strong>' + 
      this.name + '</strong> ' + filename + '</a><i class="fa fa-check"></i></li>\n' +
      '<!-- @@pageList -->';

    this.template('_page.html', filepath);
    projectIndex = projectIndex.replace('<!-- @@pageList -->', pageLink);
    this.write('index.html', projectIndex);
  },

  // Add CSS source file for the page and import it in main CSS file
  addCSS: function () {
    var filename;
    var mainCssFile;
    var mainCssString;

    if (this.cssPreprocessor === "SCSS") {
      filename = 'src/scss/_' + this.slug + '.scss';
      mainCssFile = 'src/scss/main.scss';
    } else if (this.cssPreprocessor === "LESS") {
      filename = 'src/less/' + this.slug + '.less';  
      mainCssFile = 'src/less/main.less';
    } else {
      return;
    }
    
    this.template('_page.css', filename);

    mainCssString = this.readFileAsString(mainCssFile);    
    mainCssString += '\n@import "' + this.slug + '";';
    this.write(mainCssFile, mainCssString);

  },

  // Create directory for images
  createImgDir: function () {
    this.mkdir('dist/img/' + this.slug);
  }

});

module.exports = PageGenerator;
'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var PageGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('Creating page ' + this.name + '.');
  },

  addHTML: function () {
    var filename = this._.slugify(this.name) + '.html';
    var filepath = 'src/' + filename;
  	var projectIndex = this.readFileAsString('index.html');
  	var pageLink = '<li><i class="fa fa-file-o"></i><a href="dist/' + filename + '"><strong>' + 
  		this.name + '</strong> ' + filename + '</a><i class="fa fa-check"></i></li>\n' +
  		'<!-- @@pageList -->';

  	this.template('_page.html', filepath);
    projectIndex = projectIndex.replace('<!-- @@pageList -->', pageLink);
    this.write('index.html', projectIndex);
  },

  addCSS: function () {
    /*
    var filename = 'src/less/' + this._.slugify(this.name) + '.less';
    this.template('_page.css', filename);*/
  }
});

module.exports = PageGenerator;
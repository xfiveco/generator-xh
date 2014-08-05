'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var config = require(process.cwd() + '/.yo-rc.json')['generator-xh'].config;

var PageGenerator = yeoman.generators.NamedBase.extend({
  init: function () {

    this.on('end', function () {
      this.spawnCommand('grunt', ['build']);
    });

    this.slug = this._.slugify(this.name);
    var reserved = ['main', 'variables', 'mixins', 'common', 'wordpress', 'wp'];

    if (!this.name) {
      this.log('Name cannot be empty.');
      process.exit();
    } else if (reserved.indexOf(this.slug) >= 0) {
      this.log('You cannot use reserved words - main, variables, mixins, common, wordpress, wp - as a page name.');
      process.exit();
    }

    this.log('Creating page ' + this.name + '.');
  },

  // Create HTML page and list it on the project index file
  addHTML: function () {
    var filename = this.slug + '.html';
    var filepath = 'src/' + filename;

    var pageTemplate = this.readFileAsString('src/template.html');

    var projectIndex = this.readFileAsString('index.html');
    var pageLink = '<li><i class="fa fa-file-o"></i><a href="dist/' + filename + '"><strong>' +
      this.name + '</strong> ' + filename + '</a><i class="fa fa-check"></i></li>\n' +
      '<!-- @@pageList -->';

    // Create page from template
    pageTemplate = pageTemplate.replace('<%= name %>', this.name);
    this.write(filepath, pageTemplate);

    // Project index
    projectIndex = projectIndex.replace('<!-- @@pageList -->', pageLink);
    this.write('index.html', projectIndex);
  }

});

module.exports = PageGenerator;

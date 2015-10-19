'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');

var PageGenerator = yeoman.generators.Base.extend({
  /**
   * Extends base Yeoman constructor
   * @public
   */
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.sourceRoot(this.destinationRoot());

    try {
      this.configuration = this.config.get('config');
    } catch (ex) {
      this.log('You need to run this generator in a project directory.');
      process.exit();
    }

    this.argument('newPages', {
      desc: 'List of names',
      type: Array,
      required: false
    });

    this.pages = this.config.get('pages');
    this.pages = _.union(this.newPages, this.pages);

    if (_.isEmpty(this.pages)) {
      this.log('Page names list cannot be empty.');
      process.exit();
    }

    this.config.set('pages', this.pages);

    this.option('skip-build', {
      desc: 'Do not run `grunt build` after pages are created',
      type: Boolean,
      defaults: false
    });
  },

  /**
   * Checks provided pages against registered names
   * @public
   */
  initializing: function () {
    this.reserved = ['template', 'wp'];

    this.isNotReserved = function (page) {
      if (this.reserved.indexOf(_.kebabCase(page)) === -1) {
        return page;
      }
    };

    if (!this.pages.every(this.isNotReserved, this)) {
      this.log('You cannot use those reserved words as a page name: ' + this.reserved.join(', ') + '.');
      process.exit();
    }
  },

  /**
   * Generates template files based on provided list or stored in config file
   * @public
   */
  generatePages: function () {
    this.pages.forEach(function (page) {
      var fileName = _.kebabCase(page) + '.' + this.configuration.extension;

      // Write file if not exists
      if (!this.fs.exists(this.destinationPath('src/' + fileName))) {
        this.fs.copyTpl(this.templatePath('src/template.' + this.configuration.extension), this.destinationPath('src/' + fileName), {
          name: page
        });
      }
    }, this);
  },

  /**
   * Updates main project page listing with generated page list
   * @public
   */
  updateIndex: function () {
    var pagesRegex = /(<!-- @@pages -->)((.|\n)*)(<!-- \/@@pages -->)/img;
    var pagesList = '';

    this.pages.forEach(function (page) {
      var fileName = _.kebabCase(page) + '.' + this.configuration.extension;

      pagesList += '<li><i class="fa fa-file-o"></i><a href="dist/' + fileName + '"><strong>' +
        page + '</strong> ' + fileName + '</a><i class="fa fa-check"></i></li>\n';
    }, this);

    // Write file
    this.fs.write('index.html', this.fs.read('index.html').replace(pagesRegex, '$1' + pagesList + '$4'));
  },

  /**
   * Runs build helpers if they're not skipped by generator
   * @public
   */
  end: function () {
    if (!this.options['skip-build']) {
      this.spawnCommand('grunt', ['build']);
      this.log('All done!');
    }
  }

});

module.exports = PageGenerator;

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

    this.option('skip-build', {
      desc: 'Do not run `grunt build` after pages are created',
      type: Boolean,
      defaults: false
    });
  },

  /**
   * Reads current generator config and list of pages
   * @public
   */
  initializing: function () {
    this.configuration = this.config.get('config');

    if (!this.configuration) {
      this.log('You need to run this generator in a project directory.');
      process.exit();
    }

    this.pages = this.config.get('pages');
  },

  /**
   * Gets generator arguments
   * @public
   */
  prompting: {
    /**
     * Gets new pages listed in arguments and checks if there're any pages to render
     * @public
     */
    checkNames: function () {
      this.argument('newPages', {
        desc: 'List of names',
        type: Array,
        required: false
      });

      this.pages = _.union(this.newPages, this.pages);

      if (_.isEmpty(this.pages)) {
        this.log('Page names list cannot be empty.');
        process.exit();
      }
    },

    /**
     * Checks if there are any reserved names in pages array
     * @public
     */
    checkReservedNames: function () {
      this.reservedNames = ['template', 'wp'];
      this.isReserved = function (page) {
        return _.includes(this.reservedNames, _.kebabCase(page));
      };

      if (_.some(this.pages, this.isReserved, this)) {
        this.log('You cannot use those reserved words: ' + this.reservedNames.join(', ') + '.');
        process.exit();
      }
    }
  },

  /**
   * Updated the generator config file with new pages
   * @public
   */
  configuring: function () {
    this.config.set('pages', this.pages);
  },

  /**
   * Generates template files based on provided list or stored in config file
   * @public
   */
  generatePages: function () {
    this.pages.forEach(function (pageName) {
      var fileName = _.kebabCase(pageName) + '.' + this.configuration.extension;

      // Write file if not exists
      if (!this.fs.exists(this.destinationPath('src/' + fileName))) {
        this.fs.copyTpl(this.templatePath('src/template.' + this.configuration.extension), this.destinationPath('src/' + fileName), {
          pageName: pageName
        });
      }
    }, this);
  },

  /**
   * Updates main project page listing with generated page list
   * @public
   */
  updateIndex: function () {
    var pagesRegex = /(<!-- @@pages -->)/img;
    var pagesList = '';

    this.newPages.forEach(function (pageName) {
      var fileName = _.kebabCase(pageName) + '.' + this.configuration.extension;

      pagesList += '<li><i class="fa fa-file-o"></i><a href="dist/' + fileName + '"><strong>' + pageName + '</strong> ' + fileName + '</a><i class="fa fa-check"></i></li>\n';
    }, this);

    // Write file
    this.fs.write('index.html', this.fs.read('index.html').replace(pagesRegex, '$1' + pagesList));
  },

  /**
   * Runs build helpers if they're not skipped by generator
   * @public
   */
  install: function () {
    if (!this.options['skip-build']) {
      this.spawnCommand('grunt', ['build']);
    }

    this.log('All done!');
  }

});

module.exports = PageGenerator;

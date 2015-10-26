'use strict';

var _ = require('lodash');

var helpers = {
  copy: function (template, destination, context) {
    if (context && Object.keys(context).length) {
      context._ = {
        kebabCase: _.kebabCase,
        camelCase: _.camelCase,
        capitalize: _.capitalize
      };
      
      this.fs.copyTpl(this.templatePath(template), this.destinationPath(destination), context);
    } else {
      this.fs.copy(this.templatePath(template), this.destinationPath(destination));
    }
  },

  getStructure: function () {
    if (!helpers._stylesStructure) {
      helpers._stylesStructure = this.fs.readJSON(this.templatePath('stylesStructure.json'));
    }

    return helpers._stylesStructure;
  },

  createStructure: function (structure, base) {
    var item, i, n, tn, dn;

    for (i = 0; i < structure.length; i++) {
      item = structure[i];

      if (item.dirname) {
        n = base + '/' + item.dirname;
        if (!item.children || !item.children.length) {
          this.fs.copy(this.templatePath('src/img/.keep'), this.destinationPath(n + '/.keep'));
        } else {
          helpers.createStructure.bind(this)(item.children, n);
        }
      } else {
        n = (base + '/' + item.name).replace('{{type}}', this.prompts.cssPreprocessor);
        tn = this.templatePath(n);
        dn = this.destinationPath(n);

        if (item.raw) {
          this.fs.copy(tn, dn);
        } else {
          this.fs.copyTpl(tn, dn, this.prompts);
        }
      }
    }
  }
};

var generate = {
  config: function () {
    this.config.set('config', this.prompts);
  },

  dotfiles: function () {
    helpers.copy.call(this, 'bowerrc', '.bowerrc');
    helpers.copy.call(this, 'editorconfig', '.editorconfig');
    helpers.copy.call(this, 'gitattributes', '.gitattributes');
    helpers.copy.call(this, 'jshintrc', '.jshintrc');
    helpers.copy.call(this, 'gitignore', '.gitignore', this.prompts);
  },

  appfiles: function () {
    helpers.copy.call(this, '_package.json', 'package.json', this.prompts);
    helpers.copy.call(this, '_bower.json', 'bower.json', this.prompts);
  },

  gruntModules: function () {
    helpers.copy.call(this, 'Gruntfile.js', 'Gruntfile.js', this.prompts);
    helpers.copy.call(this, 'grunt/build-helpers.js', 'grunt/build-helpers.js', this.prompts);

    // read packages from packages.json
    // and include neccessary task config files
    var pkg = this.fs.readJSON(this.destinationPath('package.json')).devDependencies;
    var p, m, f;

    for (p in pkg) {
      m = p.match(/^grunt-(.+)$/i);
      if (m) {
        f = 'grunt/' + m[1] + '.js';

        if (this.fs.exists(this.templatePath(f))) {
          helpers.copy.call(this, f, f, this.prompts);
        }
      }
    }
  },

  projectInfo: function () {
    helpers.copy.call(this, '_index.html', 'index.html', this.prompts);
    helpers.copy.call(this, 'README.md', 'README.md', this.prompts);
  },

  assets: function () {
    helpers.copy.call(this, 'src/img/.keep', 'src/fonts/.keep');
    helpers.copy.call(this, 'src/img/.keep', 'src/img/.keep');
    helpers.copy.call(this, 'src/img/.keep', 'src/media/.keep');
    helpers.copy.call(this, 'src/img/.keep', 'src/designs/.keep');
  },

  templateFiles: function () {
    helpers.copy.call(this, 'src/_template.html', 'src/template.' + this.prompts.extension, this.prompts);

    helpers.copy.call(this, 'src/includes/_head.html', 'src/includes/head.' + this.prompts.extension, this.prompts);
    helpers.copy.call(this, 'src/includes/_header.html', 'src/includes/header.' + this.prompts.extension, this.prompts);
    helpers.copy.call(this, 'src/includes/_sidebar.html', 'src/includes/sidebar.' + this.prompts.extension, this.prompts);
    helpers.copy.call(this, 'src/includes/_footer.html', 'src/includes/footer.' + this.prompts.extension, this.prompts);
    helpers.copy.call(this, 'src/includes/_scripts.html', 'src/includes/scripts.' + this.prompts.extension, this.prompts);
  },

  preprocessor: function (type, underscore) {
    helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().default, 'src/' + this.prompts.cssPreprocessor);
  },

  js: function () {
    helpers.copy.call(this, 'src/js/_main.js', 'src/js/main.js', this.prompts);
  },

  wp: function () {
    this.fs.write(this.destinationPath(this.prompts.wpThemeFolder + '/.keep'), '');
    helpers.copy.call(this, 'src/_wp.html', 'src/wp.' + this.prompts.extension);

    helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().wp, 'src/' + this.prompts.cssPreprocessor);
  },

  sprites: function () {
    helpers.copy.call(this, 'src/img/.keep', 'src/img/sprites/1x/.keep');
    helpers.copy.call(this, 'src/img/.keep', 'src/img/sprites/2x/.keep');

    helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().sprites, 'src/' + this.prompts.cssPreprocessor);
  },

  bootstrap: function () {
    helpers.copy.call(this, 'src/_bootstrap.html', 'src/bootstrap.' + this.prompts.extension, this.prompts);

    helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().bootstrap, 'src/' + this.prompts.cssPreprocessor);
  }
};

module.exports = generate;

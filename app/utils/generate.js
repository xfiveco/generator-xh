'use strict';

var helpers = {
  getStructure: function () {
    if (!helpers._stylesStructure) {
      helpers._stylesStructure = this.src.readJSON('stylesStructure.json');
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
        n = (base + '/' + item.name).replace('{{type}}', this.cssPreprocessor);
        tn = this.templatePath(n);
        dn = this.destinationPath(n);

        if (item.raw) {
          this.fs.copy(tn, dn);
        } else {
          this.fs.copyTpl(tn, dn, this);
        }
      }
    }
  }
};

var generate = {
  config: function () {
    this.config.set('config', this.props);
  },

  dotfiles: function () {
    this.copy('bowerrc', '.bowerrc');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitattributes', '.gitattributes');
    this.copy('jshintrc', '.jshintrc');
    this.template('gitignore', '.gitignore');
  },

  appfiles: function () {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
  },

  gruntModules: function () {
    this.template('Gruntfile.js');

    // read packages from packages.json
    // and include neccessary task config files
    var pkg = JSON.parse(this.engine(this.src.read('_package.json'), this)).devDependencies;
    var p, m, f;

    for (p in pkg) {
      m = p.match(/^grunt-(.+)$/i);
      if (m) {
        f = 'grunt/' + m[1] + '.js';
        if (this.src.exists(f)) {
          this.template(f);
        }
      }
    }

    // additional task files
    this.copy('grunt/build-helpers.js');
  },

  projectInfo: function () {
    this.template('_index.html', 'index.html');
    this.template('README.md');
  },

  assets: function () {
    this.copy('src/img/.keep', 'src/fonts/.keep');
    this.copy('src/img/.keep', 'src/img/.keep');
    this.copy('src/img/.keep', 'src/media/.keep');
    this.copy('src/img/.keep', 'src/designs/.keep');
  },

  templateFiles: function () {
    this.copy('src/_template.html', 'src/template.' + this.extension);

    this.template('src/includes/_head.html', 'src/includes/head.' + this.extension);
    this.template('src/includes/_header.html', 'src/includes/header.' + this.extension);
    this.template('src/includes/_sidebar.html', 'src/includes/sidebar.' + this.extension);
    this.template('src/includes/_footer.html', 'src/includes/footer.' + this.extension);
    this.template('src/includes/_scripts.html', 'src/includes/scripts.' + this.extension);
  },

  preprocessor: function (type, underscore) {
    helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().default, 'src/' + this.cssPreprocessor);
  },

  js: function () {
    this.template('src/js/_main.js', 'src/js/main.js');
  },

  wp: function () {
    this.dest.mkdir(this.wpThemeFolder);
    this.copy('src/_wp.html', 'src/wp.' + this.extension);

    helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().wp, 'src/' + this.cssPreprocessor);
  },

  sprites: function () {
    this.copy('src/img/.keep', 'src/img/sprites/1x/.keep');
    this.copy('src/img/.keep', 'src/img/sprites/2x/.keep');

    helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().sprites, 'src/' + this.cssPreprocessor);
  },

  bootstrap: function () {
    this.template('src/_bootstrap.html', 'src/bootstrap.' + this.extension);

    helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().bootstrap, 'src/' + this.cssPreprocessor);
  }
};

module.exports = generate;

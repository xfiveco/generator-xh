'use strict';

module.exports = {
  config: function () {
    this.config.set('config', this.props);
    this.config.save();
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
    this.template('Gruntfile.js', 'Gruntfile.js');
  },

  gruntModules: function () {
    // read packages from packages.json
    // and include neccessary task config files
    var pkg = JSON.parse(this.engine(this.src.read('_package.json'), this.props)).devDependencies;
    var p, m, f;

    for (p in pkg) {
      m = p.match(/^grunt-(.+)$/i);
      if (m) {
        f = 'grunt/' + m[1] + '.js';
        if (this.src.exists(f)) {
          this.copy(f);
        }
      }
    }

    // additional task files
    this.copy('grunt/build-helpers.js');
  },

  projectIndex: function () {
    this.template('_index.html', 'index.html');
  },

  structure: function () {
    this.mkdir('src');
    this.mkdir('src/includes');
    this.mkdir('src/js');
    this.mkdir('src/fonts');
    this.mkdir('src/img');
    this.mkdir('src/img/common');
    this.mkdir('src/media');
    this.mkdir('src/designs');

    this.copy('src/img/.keep', 'src/fonts/.keep');
    this.copy('src/img/.keep', 'src/img/.keep');
    this.copy('src/img/.keep', 'src/media/.keep');
    this.copy('src/img/.keep', 'src/designs/.keep');
  },

  templateFiles: function (ext) {
    this.copy('src/_template.html', 'src/template.' + ext);

    this.template('src/includes/_head.html', 'src/includes/head.' + ext);
    this.copy('src/includes/_header.html', 'src/includes/header.' + ext);
    this.copy('src/includes/_sidebar.html', 'src/includes/sidebar.' + ext);
    this.copy('src/includes/_scripts.html', 'src/includes/scripts.' + ext);
    this.copy('src/includes/_footer.html', 'src/includes/footer.' + ext);

    if (this.isWP) {
      this.mkdir(this.wpThemeFolder);
      this.copy('src/_wp.html', 'src/wp.' + ext);
    }
  },

  preprocessor: function (type, underscore) {
    var srctype = 'src/' + type;

    if (underscore === undefined) {
      underscore = '';
    }

    this.mkdir(srctype);
    this.template(srctype + '/_main.' + type, srctype + '/main.' + type);
    this.copy(srctype + '/_variables.' + type, srctype + '/' + underscore + 'variables.' + type);
    this.copy(srctype + '/_mixins.' + type, srctype + '/' + underscore + 'mixins.' + type);
    this.copy(srctype + '/_common.' + type, srctype + '/' + underscore + 'common.' + type);
    this.copy(srctype + '/_sprites.' + type, srctype + '/' + underscore + 'sprites.' + type);
    if (this.isWP) {
      this.copy(srctype + '/_wordpress.' + type, srctype + '/' + underscore + 'wordpress.' + type);
    }
  },

  js: function () {
    this.template('src/js/_main.js', 'src/js/main.js');
  }
};

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
    this.mkdir('src/xprecise');

    this.copy('src/img/do_not_delete_me.png', 'src/fonts/do_not_delete_me.png');
    this.copy('src/img/do_not_delete_me.png', 'src/img/do_not_delete_me.png');
    this.copy('src/img/do_not_delete_me.png', 'src/media/do_not_delete_me.png');
    this.copy('src/img/do_not_delete_me.png', 'src/xprecise/do_not_delete_me.png');
  },

  templateFiles: function (ext) {
    this.copy('src/_template.' + ext, 'src/template.' + ext);

    this.template('src/includes/_head.' + ext, 'src/includes/head.' + ext);
    this.copy('src/includes/_header.' + ext, 'src/includes/header.' + ext);
    this.copy('src/includes/_sidebar.' + ext, 'src/includes/sidebar.' + ext);
    this.copy('src/includes/_scripts.' + ext, 'src/includes/scripts.' + ext);
    this.copy('src/includes/_footer.' + ext, 'src/includes/footer.' + ext);

    if (this.isWP) {
      this.mkdir(this.wpThemeFolder);
      this.copy('src/_wp.' + ext, 'src/wp.' + ext);
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
    if (this.isWP) {
      this.copy(srctype + '/_wordpress.' + type, srctype + '/' + underscore + 'wordpress.' + type);
    }
  },

  js: function () {
    this.template('src/js/_main.js', 'src/js/main.js');
  }
};

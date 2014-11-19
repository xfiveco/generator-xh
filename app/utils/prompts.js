'use strict';

module.exports = {
  generator: [{
    name: 'projectName',
    message: 'Please enter the project name',
    validate: function (input) {
      return !!input;
    }
  }, {
    type: 'confirm',
    name: 'useBranding',
    message: 'Should XHTMLized branding be used?',
    default: true
  }, {
    type: 'list',
    name: 'reloader',
    message: 'Which type of live reloader would you like to use?',
    choices: ['LiveReload', 'BrowserSync', 'None'],
    default: 'BrowserSync'
  }, {
    when: function (response) {
      return response.reloader !== 'None';
    },
    type: 'confirm',
    name: 'server',
    message: 'Do you want to run development server?',
    default: true
  }, {
    type: 'list',
    name: 'cssPreprocessor',
    message: 'Which CSS preprocessor would you like to use?',
    choices: [{
      name: 'SCSS (LibSass; not fully compatible with Ruby version but much faster)',
      value: 'LIBSASS'
    }, {
      value: 'LESS'
    }, {
      name: 'SCSS (Ruby)',
      value: 'SCSS'
    }],
    default: 'LIBSASS'
  }, {
    type: 'confirm',
    name: 'ignoreDist',
    message: 'Add dist folder to the Git ignore list?',
    default: function (response) {
      return response.cssPreprocessor !== 'SCSS';
    }
  }, {
    type: 'confirm',
    name: 'isWP',
    message: 'Is this WordPress project?',
    default: false
  }, {
    type: 'checkbox',
    name: 'features',
    message: 'Select additional features:',
    choices: [{
      name: 'Automatic sprites',
      value: 'useSprites',
      checked: false
    }, {
      name: 'Bootstrap',
      value: 'useBootstrap',
      checked: false
    }, {
      name: 'Modernizr',
      value: 'useModernizr',
      checked: false
    }, {
      name: 'CSS3 Pie',
      value: 'useCSS3Pie',
      checked: false
    }]
  }],

  update: [{
    type: 'list',
    name: 'updateNotify',
    message: 'Do you want to update your current version?',
    choices: [{
      name: 'Yes (stops the generator and copies the update command to clipboard)',
      value: 'yesandcopy'
    }, {
      name: 'Yes (stops the generator)',
      value: 'yes'
    }, {
      name: 'No (continues running the generator)',
      value: 'No'
    }],
    default: 'yesandcopy'
  }],

  newProjectName: [{
    name: 'projectName',
    message: 'Please enter new project name',
    validate: function (input) {
      return !!input;
    }
  }]
};

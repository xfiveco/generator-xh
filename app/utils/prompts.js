'use strict';

module.exports = {
  generator: [{
    type: 'confirm',
    name: 'useBranding',
    message: 'Do you want to use XHTMLized branding?',
    default: true
  }, {
    when: function (response) {
      return !response.useBranding;
    },
    type: 'input',
    name: 'authorName',
    message: 'Enter your name'
  }, {
    type: 'list',
    name: 'cssPreprocessor',
    message: 'Choose your CSS preprocessor',
    choices: [{
      name: 'Sass',
      value: 'scss'
    }, {
      name: 'Less',
      value: 'less'
    }],
    default: 'scss'
  }, {
    type: 'list',
    name: 'extension',
    message: 'Choose your page extension (choose \'html\' if you want to run dev server):',
    choices: ['html', 'php'],
    default: 'html'
  }, {
    type: 'list',
    name: 'reloader',
    message: 'Choose your live reloader type',
    choices: ['BrowserSync', 'LiveReload', 'None'],
    default: 'BrowserSync'
  }, {
    when: function (response) {
      return response.reloader !== 'None' && response.extension === 'html';
    },
    type: 'confirm',
    name: 'devServer',
    message: 'Do you want to run development server?',
    default: true
  }, {
    when: function (response) {
      return response.reloader === 'BrowserSync' && !response.devServer;
    },
    type: 'input',
    name: 'proxy',
    message: 'Enter your server URL',
    default: 'localhost',
    validate: function (input) {
      return !!input;
    }
  }, {
    type: 'confirm',
    name: 'ignoreDist',
    message: 'Do you want to add dist folder to the .gitignore?',
    default: true
  }, {
    type: 'confirm',
    name: 'isWP',
    message: 'Do you want to install WordPress?',
    default: false
  }, {
    type: 'checkbox',
    name: 'features',
    message: 'Choose additional features',
    choices: [{
      name: 'jQuery',
      value: 'useJquery',
      checked: true
    }, {
      name: 'Image optimisation',
      value: 'useOptim',
      checked: false
    }, {
      name: 'Automatic sprites',
      value: 'useSprites',
      checked: false
    }, {
      name: 'Icomoon',
      value: 'useIcomoon',
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
      name: 'Browserify',
      value: 'useBrowserify',
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
  }]
};

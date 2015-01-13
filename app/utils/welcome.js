'use strict';

module.exports = function () {
  var chalk = require('chalk');
  this.log('');
  this.log(chalk.cyan(' ***********************************************************') + '\n');
  this.log(chalk.cyan('  Welcome to'), chalk.white.bgRed.bold(' XH ') + '\n');
  this.log(chalk.white('  A Yeoman generator for scaffolding web projects') + '\n');
  this.log(chalk.cyan(' ***********************************************************') + '\n');
};

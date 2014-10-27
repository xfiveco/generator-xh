'use strict';

module.exports = function () {
  var chalk = require('chalk');
  console.log('');
  console.log(chalk.cyan(' ***********************************************************') + '\n');
  console.log(chalk.cyan('  Welcome to'), chalk.white.bgRed.bold(' XH ') + '\n');
  console.log(chalk.white('  A Yeoman generator for scaffolding web projects') + '\n');
  console.log(chalk.cyan(' ***********************************************************') + '\n');
};
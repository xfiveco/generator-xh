'use strict';
var updateNotifier = require('update-notifier');
var stringLength = require('string-length');
var chalk = require('chalk');
var utils = require('./utils/index');

// notify user about updates
module.exports = function () {
  var done = this.async();

  // update message rendering
  var updateMessage = function (update) {
    var fill = function (str, count) {
      return new Array(count + 1).join(str);
    };

    var line1 = ' Update available: ' + chalk.green.bold(update.latest) +
      chalk.dim(' (current: ' + update.current + ')') + ' ';
    var line2 = ' Run ' + chalk.red('npm update -g ' + notifier.packageName) +
      ' to update. ';
    var contentWidth = Math.max(stringLength(line1), stringLength(line2));
    var line1rest = contentWidth - stringLength(line1);
    var line2rest = contentWidth - stringLength(line2);
    var top = chalk.yellow('┌' + fill('─', contentWidth) + '┐');
    var bottom = chalk.yellow('└' + fill('─', contentWidth) + '┘');
    var side = chalk.yellow('│');

    var message =
      '\n' +
      top + '\n' +
      side + line1 + fill(' ', line1rest) + side + '\n' +
      side + line2 + fill(' ', line2rest) + side + '\n' +
      bottom + '\n';

    console.error(message);
  };

  // copying 'npm update -g generator-xh' to clipboard
  var copyToClipboard = function (data) {
    var proc;
    var exec;

    switch (process.platform) {
    case 'darwin':
      proc = require('child_process').spawn('pbcopy');
      break;
    case 'win32':
      proc = require('child_process').spawn('clip');
      exec = require('child_process').exec;
      exec('clip', function () {});
      break;
    case 'linux':
      proc = require('child_process').spawn('xclip', ['-selection', 'clipboard']);
      break;
    case 'openbsd':
      proc = require('child_process').spawn('xclip', ['-selection', 'clipboard']);
      break;
    default:
      throw 'Tried to copy update command to your clipboard, but you are using unknown platform: ' + process.platform;
    }

    proc.stdin.write(data);
    proc.stdin.end();
  };

  var notifyCallback = function (error, update) {
    if (update && update.latest !== update.current) {
      updateMessage(update);

      this.prompt(utils.prompts.update, function (props) {
        this.updateNotify = props.updateNotify;

        if (this.updateNotify === 'yesandcopy') {
          copyToClipboard('npm update -g ' + this.pkg.name);
          this.log(chalk.yellow('Update command was copied to your clipboard \n'));
          process.exit();
        } else if (this.updateNotify === 'yes') {
          process.exit();
        }

        done();
      }.bind(this));
    } else {
      done();
    }
  }.bind(this);

  try {
    if (this.options.interactive === false || this.configFound) {
      done();
      return;
    }

    var notifier = updateNotifier({
      packageName: this.pkg.name,
      packageVersion: this.pkg.version,
      callback: notifyCallback
    });
  } catch (err) {
    console.error('Aborting update.');
    done();
  }
};
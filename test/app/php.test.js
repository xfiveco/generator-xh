'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('XH Generator with PHP extension', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../../app'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompts({
        projectName: 'Test Project',
        extension: 'php'
      })
      .on('end', done);

  });

  it('should generate HTML files with PHP extension', function (done) {
    assert.file([
      'index.html',
      'src/template.php',
      'src/includes/head.php',
      'src/includes/header.php',
      'src/includes/sidebar.php',
      'src/includes/scripts.php',
      'src/includes/footer.php'
    ]);

    done();
  });

  it('should create valid Yeoman configuration file', function (done) {
    assert.file('.yo-rc.json');
    assert.fileContent('.yo-rc.json', '"extension": "php"');

    done();
  });
});

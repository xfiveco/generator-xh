'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('XH Generator with WP', function () {
  before(function (done) {

    helpers
      .run(path.join(__dirname, '../../app'))
      .withOptions({
        'skip-install': true,
        'skip-update': true
      })
      .withPrompts({
        projectName: 'Test Project',
        isWP: true
      })
      .on('end', done);

  });

  it('should generate WordPress files', function (done) {
    assert.file([
      'src/wp.html',
      'src/scss/common/_wordpress.scss',
      'wp/wp-content/themes/'
    ]);

    done();
  });

  it('should add WordPress theme assets directories to .gitignore', function (done) {
    assert.fileContent('.gitignore', /(\nwp\/wp-content\/themes\/\*\*\/)img\1fonts\1js\1css\1media\n/gim);

    done();
  });

  it('should add WordPress uploads directory to .gitignore', function (done) {
    assert.fileContent('.gitignore', /\nwp\/wp-content\/uploads\n/gim);

    done();
  });

  it('should add WordPress section in project template file', function (done) {
    assert.fileContent('index.html', 'Username');
    assert.fileContent('index.html', 'Password');

    done();
  });

  it('should add WordPress copy declaration for grunt config', function (done) {
    assert.file('grunt/contrib-copy.js');
    assert.fileContent('grunt/contrib-copy.js', 'wp/wp-content/themes');

    done();
  });

  it('should create valid Yeoman configuration file', function (done) {
    assert.file('.yo-rc.json');
    assert.fileContent('.yo-rc.json', '"isWP": true');

    done();
  });
});

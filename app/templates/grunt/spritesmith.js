/**
 * Spritesmith - automatically creates sprites from the specifed files.
 */
module.exports = function(grunt) {
  'use strict';

  // Ensure spritesmith will find PhantomJS
  var path = require('path');
  process.env.PATH += path.delimiter + path.join(process.cwd(), 'node_modules', 'phantomjs', 'lib', 'phantom', 'bin');

  grunt.config('sprite', {
    dist1x: {
      src: '<%%= xh.src %>/img/common/sprites/1x/*.{png,jpg,gif}',
      destImg: '<%%= xh.dist %>/img/common/sprites.png',
      destCSS: <% if (cssPreprocessor === 'SCSS' || cssPreprocessor === 'LIBSASS') { %>'<%%= xh.src %>/scss/_sprites@1x.scss'<% } %><% if (cssPreprocessor === 'LESS') { %>'<%%= xh.src %>/less/sprites@1x.less'<% } %>,
      algorithm: 'binary-tree',
      engine: 'phantomjs',
      padding: 2
    },
    dist2x: {
      src: '<%%= xh.src %>/img/common/sprites/2x/*.{png,jpg,gif}',
      destImg: '<%%= xh.dist %>/img/common/sprites@2x.png',
      destCSS: <% if (cssPreprocessor === 'SCSS' || cssPreprocessor === 'LIBSASS') { %>'<%%= xh.src %>/scss/_sprites@2x.scss'<% } %><% if (cssPreprocessor === 'LESS') { %>'<%%= xh.src %>/less/sprites@2x.less'<% } %>,
      algorithm: 'binary-tree',
      engine: 'phantomjs',
      padding: 4
    }
  });

  grunt.loadNpmTasks('grunt-spritesmith');
};

/**
 * Spritesmith - automatically creates sprites from the specifed files.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('sprite', {
    dist1x: {
      src: '<%%= xh.src %>/img/sprites/1x/*.{png,jpg,gif}',
      destImg: '<%%= xh.dist %>/img/common/sprites@1x.png',
      destCSS: <% if (cssPreprocessor === 'SCSS' || cssPreprocessor === 'LIBSASS') { %>'<%%= xh.src %>/scss/setup/_sprites@1x.scss'<% } %><% if (cssPreprocessor === 'LESS') { %>'<%%= xh.src %>/less/setup/sprites@1x.less'<% } %>,
      cssTemplate: <% if (cssPreprocessor === 'SCSS' || cssPreprocessor === 'LIBSASS') { %>'<%%= xh.src %>/scss/setup/_sprites.scss.mustache'<% } %><% if (cssPreprocessor === 'LESS') { %>'<%%= xh.src %>/less/setup/sprites.less.mustache'<% } %>,
      algorithm: 'binary-tree',
      engine: 'pngsmith',
      padding: 2,
      cssOpts: {
        map: 'sprite-1x'
      }
    },
    dist2x: {
      src: '<%%= xh.src %>/img/sprites/2x/*.{png,jpg,gif}',
      destImg: '<%%= xh.dist %>/img/common/sprites@2x.png',
      destCSS: <% if (cssPreprocessor === 'SCSS' || cssPreprocessor === 'LIBSASS') { %>'<%%= xh.src %>/scss/setup/_sprites@2x.scss'<% } %><% if (cssPreprocessor === 'LESS') { %>'<%%= xh.src %>/less/setup/sprites@2x.less'<% } %>,
      cssTemplate: <% if (cssPreprocessor === 'SCSS' || cssPreprocessor === 'LIBSASS') { %>'<%%= xh.src %>/scss/setup/_sprites.scss.mustache'<% } %><% if (cssPreprocessor === 'LESS') { %>'<%%= xh.src %>/less/setup/sprites.less.mustache'<% } %>,
      algorithm: 'binary-tree',
      engine: 'pngsmith',
      padding: 4,
      cssOpts: {
        map: 'sprite-2x',
        functions: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-spritesmith');
};

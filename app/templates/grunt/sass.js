/**
 * Sass - CSS preprocessor (libsass version)
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('sass', {
    dist: {
      options: {
        outputStyle: 'expanded',
        imagePath: '../img',
        includePaths: [
          '<%%= xh.src %>/bower_components'<% if (features.useBootstrap) { %>,
          '<%%= xh.src %>/bower_components/bootstrap-sass/assets/stylesheets'<% } %>
        ],
        sourceMap: true
      },
      files: {
        '<%%= xh.dist %>/css/main.css': '<%%= xh.src %>/scss/main.scss'
      }
    }
  });
};

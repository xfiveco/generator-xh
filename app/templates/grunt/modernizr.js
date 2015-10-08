/**
 * Modernizr - Build out a lean, mean Modernizr machine.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('modernizr', {
    dist: {
      options: [
        'setClasses',
        'addTest',
        'testProp',
        'fnBind'
      ],

      files: {
        src: [
          '<%%= xh.src %>/js/**/*.js',
          '<%%= xh.src %>/<%= cssPreprocessor %>/**/*.<%= cssPreprocessor %>'
        ]
      },

      dest: '<%%= xh.dist %>/js/modernizr.min.js'
    }
  });
};

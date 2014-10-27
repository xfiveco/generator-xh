/**
 * CSSBeautifier - prettifies outputted CSS files.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('cssbeautifier', {
    files: ['<%%= xh.dist %>/css/*.css', '!<%%= xh.dist %>/css/libraries.min.css'],
    options : {
      indent: '  '
    }
  });

  grunt.loadNpmTasks('grunt-cssbeautifier');
};

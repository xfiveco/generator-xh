/**
 * JSHint - validates JS files.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('jshint', {
    options: {
      jshintrc: true,
      force: true
    },
    dist: {
      src: ['<%%= xh.src %>/js/main.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
};

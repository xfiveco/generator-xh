/**
 * Modular JS for the people!
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('browserify', {
    'build': {
      files: {
        '<%%= xh.dist %>/js/main.js': ['<%%= xh.src %>/js/main.js']
      }
    },

    'watchify': {
      files: {
        '<%%= xh.dist %>/js/main.js': ['<%%= xh.src %>/js/main.js']
      },
      options: {
        browserifyOptions: {
          debug: true
        },
        watch: true,
        keepAlive: true
      }
    }
  });
};

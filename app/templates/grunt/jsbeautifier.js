module.exports = function(grunt) {
  'use strict';

  grunt.config('jsbeautifier', {
    options : {
      html: {
        indentSize: 2
      },
      js: {
        indentSize: 2
      }
    },

    html: {
      src: '<%%= xh.dist %>/*.html'
    },

    js: {
      src: '<%%= xh.dist %>/js/main.js'
    }
  });

  grunt.loadNpmTasks('grunt-jsbeautifier');
};

module.exports = function(grunt) {
  'use strict';

  grunt.config('remfallback', {
    options: {
      mediaQuery: true
    },
    main: {
      files: {
        '<%%= xh.dist %>/css/main.css': ['<%%= xh.dist %>/css/main.css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-remfallback');
};

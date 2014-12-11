/**
 * REMFallback - adds fallback form rem to px units in CSS files.
 */
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
};

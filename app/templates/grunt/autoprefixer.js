/**
 * Autoprefixer - adds vendor prefixes to CSS.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('autoprefixer', {
    options: {
      map: true
    },
    main: {
      src: '<%%= xh.dist %>/css/main.css',
      dest: '<%%= xh.dist %>/css/main.css'
    }
  });
};

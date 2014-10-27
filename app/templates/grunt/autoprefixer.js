module.exports = function(grunt) {
  'use strict';

  grunt.config('autoprefixer', {
    main: {
      src: '<%%= xh.dist %>/css/main.css',
      dest: '<%%= xh.dist %>/css/main.css'
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
};

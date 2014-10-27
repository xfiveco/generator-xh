module.exports = function(grunt) {
  'use strict';

  grunt.config('sass', {
    dist: {
      options: {
        style: 'expanded',
        loadPath: '<%%= xh.src %>/bower_components/'
      },
      files: {
        '<%%= xh.dist %>/css/main.css': '<%%= xh.src %>/scss/main.scss'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};

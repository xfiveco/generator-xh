module.exports = function(grunt) {
  'use strict';

  grunt.config('less', {
    dist: {
      options: {
        path: '<%%= xh.src %>/bower_components/'
      },
      files: {
        '<%%= xh.dist %>/css/main.css': '<%%= xh.src %>/less/main.less'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
};

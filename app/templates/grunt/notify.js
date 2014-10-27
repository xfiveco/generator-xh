module.exports = function(grunt) {
  'use strict';

  grunt.config('notify', {
    options: {
      title: '<%= projectName %>'
    },
    build: {
      options: {
        message: 'Build Completed'
      }
    },
    validation: {
      options: {
        message: 'HTML Validation Completed'
      }
    }
  });

  grunt.loadNpmTasks('grunt-notify');
};

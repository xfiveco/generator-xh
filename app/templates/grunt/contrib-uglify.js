module.exports = function(grunt) {
  'use strict';

  grunt.config('uglify', {
    options: {
      preserveComments: 'some'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};

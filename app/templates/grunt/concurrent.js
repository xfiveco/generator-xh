/**
 * Run grunt tasks concurrently
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('concurrent', {
    watch: {
      tasks: ['browserify:watchify', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  });
};

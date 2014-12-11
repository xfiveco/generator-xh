/**
 * Connect - starts development server with LiveReload on localhost:3000.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('connect', {
    server: {
      options: {
        base: './',
        open: true,
        livereload: 35729,
        hostname: 'localhost',
        port: 3000
      }
    }
  });
};

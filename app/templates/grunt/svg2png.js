/**
 * SVG2PNG - automatically create PNG fallbacks for SVGs.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('svg2png', {
    dist: {
      // work on optimized files
      files: [{
        src: ['<%%= xh.dist %>/<%%= xh.images %>/**/*.svg']
      }]
    }
  });

  grunt.loadNpmTasks('grunt-svg2png');
};

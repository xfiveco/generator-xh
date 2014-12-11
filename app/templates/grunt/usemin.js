/**
 * Usemin - prepares CSS & JS files for concatenation & minification
 * and replaces them when needed.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('useminPrepare', {
    html: {
      src: '<%%= xh.build %>',
      cwd: '<%%= xh.includes %>',
      expand: true
    },

    htmlmin: {
      src: '<%%= xh.build %>',
      cwd: '<%%= xh.includes %>',
      expand: true
    },

    options: {
      dest: '<%%= xh.dist %>',
      root: '<%%= xh.src %>',
      flow: {
        steps: {'js': ['concat'], 'css': ['concat'] },
        post: {},
        htmlmin: {
          steps: {'js': ['concat', 'uglifyjs'], 'css': ['concat'] },
          post: {}
        }
      }
    }
  });

  grunt.config('usemin', {
    html: {
      src: '<%%= xh.build %>',
      cwd: '<%%= xh.includes %>',
      expand: true
    },

    options: {
      assetsDirs: ['<%%= xh.includes %>/']
    }
  });
};

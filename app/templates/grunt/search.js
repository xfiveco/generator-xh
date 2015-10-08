/**
 * Search - prepares a list of imports in main stylesheet in order to
 * create table of contents.
 */
module.exports = function(grunt) {
  'use strict';

  // Create list of @imports
  grunt.config('search', {
    imports: {
      files: {
        src: ['<%%= xh.src %>/<%= this.cssPreprocessor %>/**/*.<%= this.cssPreprocessor %>']
      },
      options: {
        searchString: /@import[ \("']*([^;]+)[;\)"']*/g,
        logFormat: 'json',
        logFile: '<%%= xh.tmp %>/csstoc.json'
      }
    }
  });
};

/**
 * Search - prepares a list of imports in main stylesheet in order to
 * create table of contents.
 */
module.exports = function(grunt) {
  'use strict';

  // Create list of @imports
  grunt.config('search', {
    imports: {
      files: {<% if (cssPreprocessor === 'SCSS' || cssPreprocessor === 'LIBSASS') { %>
        src: ['<%%= xh.src %>/scss/main.scss']<% } %><% if (cssPreprocessor === 'LESS') { %>
        src: ['<%%= xh.src %>/less/main.less']<% } %>
      },
      options: {
        searchString: /@import[ \("']*([^;]+)[;\)"']*/g,
        logFormat: 'json',
        logFile: '<%%= xh.tmp %>/csstoc.json'
      }
    }
  });

  grunt.loadNpmTasks('grunt-search');
};

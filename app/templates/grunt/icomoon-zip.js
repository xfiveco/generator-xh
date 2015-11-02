/**
 * Icomoon Zip - Automating icomoon generation.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('icomoon-zip', {
    icons: {
      options: {
        clear: false,
        fontsPath: '<%%= xh.src %>/fonts',
        fontsRelativePath: '../fonts',
        styleFile: '<%%= xh.src %>/<%= cssPreprocessor %>/vendor/_icomoon.<%= cssPreprocessor %>'
      },
      files: {
        '<%%= xh.src %>/icomoon': ['<%%= xh.src %>/icomoon.zip']
      }
    }
  });
};

/**
 * PostCSS - A tool for transforming styles with JS plugins.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('postcss', {
    options: {
      map: {
        inline: false
      },

      processors: [
        require('pixrem')(),
        require('postcss-import')(),
        require('autoprefixer')()
      ]
    },
    main: {
      src: '<%%= xh.dist %>/css/main.css',
      dest: '<%%= xh.dist %>/css/main.css'
    }
  });
};

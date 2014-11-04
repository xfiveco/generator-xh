/**
 * ImageMin - optimizes images.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('imagemin', {
    dist: {
      options: {
        optimizationLevel: 3,
        // https://github.com/sindresorhus/grunt-svgmin#available-optionsplugins
        svgoPlugins:[
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false }
        ]
      },
      files: [{
        expand: true,
        cwd: '<%%= xh.src %>',
        src: ['<%%= xh.images %>', '!**/do_not_delete_me.png'],
        dest: '<%%= xh.dist %>'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
};

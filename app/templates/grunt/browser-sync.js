/**
 * BrowserSync - live reload on steroids.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('browserSync', {
    src: {
      bsFiles: {
        src: [
          '<%%= xh.dist %>/css/*.css',
          '<%%= xh.dist %>/js/*.js',
          '<%%= xh.dist %>/<%%= xh.assets %>/**/*.*',
          '<%%= xh.dist %>/**/*.<%= extension %>'
        ]
      },

      options: {
        watchTask: true,<% if (devServer) { %>
        server: {
          baseDir: './',
          port: 3000
        },<% } else { %>
        proxy: '<%= proxy %>',<% } %>
        notify: false
      }
    }
  });
};

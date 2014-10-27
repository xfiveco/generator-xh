module.exports = function(grunt) {
  'use strict';

  grunt.config('copy', {
    normalize: {
      src: '<%%= xh.src %>/bower_components/normalize.css/normalize.css',<% if (cssPreprocessor === 'SCSS' || cssPreprocessor === 'LIBSASS') { %>
      dest: '<%%= xh.src %>/bower_components/normalize.css/normalize.scss'<% } %><% if (cssPreprocessor === 'LESS') { %>
      dest: '<%%= xh.src %>/bower_components/normalize.css/normalize.less'<% } %>
    },

    jquery: {
      expand: true,
      cwd: '<%%= xh.src %>/bower_components/jquery/dist/',
      src: ['jquery.min.js', 'jquery.min.map'],
      dest: '<%%= xh.dist %>/js/'
    },

    assets: {
      files: [
        {
          expand: true,
          cwd: '<%%= xh.src %>',
          src: ['<%%= xh.assets %>/**/*.*', '!**/do_not_delete_me.png'],
          dest: '<%%= xh.dist %>'
        }
      ]
    },

    js: {
      expand: true,
      cwd: '<%%= xh.src %>/js/',
      src: ['main.js'<% if (useCSS3Pie) { %>, 'PIE.htc'<% } %>],
      dest: '<%%= xh.dist %>/js/'
    },<% if (isWP) { %>

    wp: {
      expand: true,
      cwd: '<%%= xh.dist %>/',
      src: ['**', '!**/<%%= xh.designs %>/**', '!*.html'],
      dest: '<%= wpThemeFolder  %>'
    },<% } %>

    // Backup include files
    backup: {
      expand: true,
      cwd: '<%%= xh.includes %>',
      src: '<%%= xh.build %>',
      dest: '<%%= xh.tmp %>'
    },

    // Restore include files
    restore: {
      expand: true,
      cwd: '<%%= xh.tmp %>',
      src: '<%%= xh.build %>',
      dest: '<%%= xh.includes %>/'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};

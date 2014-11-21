/**
 * Watch - observes changes in files and rebuild them as needed.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('watch', {
    options: {
      dot: true,
      spawn: false<% if (reloader === 'BrowserSync') { %>,
      interrupt: true<% } %>
    },

    compileCSS: {
      files: [<% if (cssPreprocessor === 'SCSS' || cssPreprocessor === 'LIBSASS') { %>'<%%= xh.src %>/scss/**/*.scss'<% } %><% if (cssPreprocessor === 'LESS') { %>'<%%= xh.src %>/less/**/*.less'<% } %>],
      tasks: ['build-css'<% if (isWP) { %>, 'copy:wp'<% } %>]
    }<% if (reloader === 'LiveReload') { %>,

    css: {
      files: ['<%%= xh.dist %>/css/*.css'],
      options: {
        livereload: true
      }
    }<% } %>,

    html: {
      files: ['<%%= xh.src %>/*.html', '<%%= xh.includes %>/*.html'],
      tasks: ['build-html']<% if (reloader === 'LiveReload') { %>,
      options: {
        livereload: true
      }<% } %>
    },

    js: {
      files: ['<%%= xh.src %>/js/*.js'],
      tasks: ['build-js'<% if (isWP) { %>, 'copy:wp'<% } %>]<% if (reloader === 'LiveReload') { %>,
      options: {
        livereload: true
      }<% } %>
    },

    assets: {
      files: ['<%%= xh.src %>/<%%= xh.assets %>/**/*'],
      tasks: ['build-assets'<% if (isWP) { %>, 'copy:wp'<% } %>]<% if (reloader === 'LiveReload') { %>,
      options: {
        livereload: true
      }<% } %>
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};

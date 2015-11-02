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
      files: ['<%%= xh.src %>/<%= cssPreprocessor %>/**/*.<%= cssPreprocessor %>'],
      tasks: ['build-css'<% if (isWP) { %>, 'copy:wp'<% } %>]<% if (reloader === 'LiveReload') { %>,
      options: {
        livereload: true
      }<% } %>
    },

    html: {
      files: ['<%%= xh.src %>/*.<%= extension %>'],
      tasks: ['build-html']<% if (reloader === 'LiveReload') { %>,
      options: {
        livereload: true
      }<% } %>
    },

    usemin: {
      files: ['<%%= xh.includes %>/<%%= xh.usemin %>'],
      tasks: ['build-usemin', 'build-html']<% if (reloader === 'LiveReload') { %>,
      options: {
        livereload: true
      }<% } %>
    },

    includes: {
      files: ['<%%= xh.includes %>/*.<%= extension %>', '!<%%= xh.includes %>/<%%= xh.usemin %>'],
      tasks: ['newer:copy:includes', 'build-html']<% if (reloader === 'LiveReload') { %>,
      options: {
        livereload: true
      }<% } %>
    },

    js: {
      files: ['<%%= xh.src %>/js/*.js'],
      tasks: [<% if (features.useBrowserify) { %>'jshint'<% } else { %>'build-js'<% } %><% if (isWP) { %>, 'copy:wp'<% } %>]<% if (reloader === 'LiveReload') { %>,
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
    }<% if (features.useIcomoon) { %>,

    icons: {
      files: ['<%%= xh.src %>/icomoon.zip'],
      tasks: ['icomoon-zip']<% if (reloader === 'LiveReload') { %>,
      options: {
        livereload: true
      }<% } %>
    }<% } %>
  });
};

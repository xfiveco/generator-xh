module.exports = function (grunt) {
  'use strict';

  require('time-grunt')(grunt);

  // require('jit-grunt')(grunt,  {
  //   includereplace: 'grunt-include-replace',
  //   useminPrepare: 'grunt-usemin',
  //   validation: 'grunt-html-validation',
  //   replace: 'grunt-text-replace'
  // });

  // Project configuration.
  grunt.option('force', true);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Configs
    xh: {
      src: 'src',
      dist: 'dist',
      tmp: '.tmp',
      build: ['head.html', 'scripts.html'],
      root: __dirname,
      includes: '<%%= xh.src %>/includes',
      designs: 'designs',
      assets: '{img,media,fonts,<%%= xh.designs %>}'
    }
  });

  // Load per-task config from separate files.
  grunt.loadTasks('grunt');

  grunt.registerTask('_before-build-html', [
    'copy:backup'
  ]);

  grunt.registerTask('_after-build-html', [
    'includereplace',
    'copy:restore',
    'jsbeautifier:html',
    'clean:tmp'
  ]);

  grunt.registerTask('build-html', [
    '_before-build-html',
    'useminPrepare:html',
    'concat:generated',
    'usemin',
    '_after-build-html'
  ]);

  grunt.registerTask('build-htmlmin', [
    '_before-build-html',
    'useminPrepare:htmlmin',
    'concat:generated',
    'uglify:generated',
    'usemin',
    '_after-build-html'
  ]);

  grunt.registerTask('build-assets', [
    'copy:assets'
  ]);

  grunt.registerTask('build-css', [<% if (cssPreprocessor === 'SCSS' || cssPreprocessor === 'LIBSASS') { %>
    'sass',<% } %><% if (cssPreprocessor === 'LESS') { %>
    'less',<% } %>
    'autoprefixer',
    'remfallback',
    'cssbeautifier',
    'search',
    'replace:css',
    'clean:tmp'
  ]);

  grunt.registerTask('build-js', [
    'copy:js',
    'jsbeautifier:js',
    'replace:js',
    'jshint'
  ]);

  grunt.registerTask('validate', [
    'validation'
  ]);

  grunt.registerTask('postinstall', [<% if (!useBootstrap) { %>
    'copy:normalize',<% } %>
    'copy:jquery'
  ]);

  grunt.registerTask('qa', 'Assure quality', [<% if (reloader !== 'None' && !server) { %>
    'replace:reloader',<% } %>
    'build',
    'validate',
    'jshint'
  ]);

  grunt.registerTask('build', 'Build site files', [
    'clean:dist',
    'postinstall',

    'build-htmlmin',
    'build-assets',
    'build-css',
    'build-js',<% if (isWP) { %>

    'copy:wp',<% } %>
  ]);

  grunt.registerTask('default', 'Start a live-reloading dev webserver on localhost', [
    'postinstall'<% if (reloader === 'BrowserSync') { %>,
    'browserSync'<% } else if (reloader === 'LiveReload' && server) { %>,
    'connect:server'<% } %>,
    'watch'
  ]);
};

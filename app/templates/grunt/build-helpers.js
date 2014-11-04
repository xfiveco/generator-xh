/**
 * Build Helpers - smaller task that make up the build logic.
 *
 * Some of them can be used standalone if you need them (though you shouldn't).
 */
module.exports = function(grunt) {
  'use strict';

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
    // optimze SVG & generate & optimize their fallbacks
    'newer:imagemin:svg',
    'newer:svg2png:dist',
    'newer:imagemin:svgfallbacks',
    // optimize non-SVG images (GIF, PNG, JPG)
    'newer:imagemin:nosvg',
    // copy other assets
    'newer:copy:assets'
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
};

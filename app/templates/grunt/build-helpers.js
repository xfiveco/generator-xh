/**
 * Build Helpers - smaller task that make up the build logic.
 *
 * Some of them can be used standalone if you need them (though you shouldn't).
 */
module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('build-html', [
    'includereplace',
    'jsbeautifier:html'
  ]);

  grunt.registerTask('_before-build-usemin', [
    'clean:tmp',
    'copy:includes',
    'useminReset',
  ]);

  grunt.registerTask('build-usemin', [
    '_before-build-usemin',
    'useminPrepare:html',
    'concat:generated',
    'usemin',
  ]);

  grunt.registerTask('build-usemin-min', [
    '_before-build-usemin',
    'useminPrepare:htmlmin',
    'concat:generated',
    'uglify:generated',
    'usemin',
  ]);<% if (features.useOptim || features.useSprites) { %>

  grunt.registerTask('build-images', [
    // optimze SVG & generate & optimize their fallbacks
    'newer:imagemin:svg',
    'newer:svg2png:dist',
    'newer:imagemin:svgfallbacks',
    // optimize non-SVG images (GIF, PNG, JPG)
    'newer:imagemin:nosvg'<% if (features.useSprites) { %>,
    // generate & optimize sprites
    'sprite:dist1x',
    'sprite:dist2x',
    'newer:imagemin:sprites'<% } %>
  ]);<% } %>

  grunt.registerTask('build-assets', [
    'newer:copy:assets'
  ]);

  grunt.registerTask('build-css', [<% if (features.useIcomoon) { %>
    'icomoon-zip',<% } %><% if (cssPreprocessor === 'scss') { %>
    'sass',<% } %><% if (cssPreprocessor === 'less') { %>
    'less',<% } %>
    'postcss'
  ]);<% if (features.useModernizr) { %>

  grunt.registerTask('build-modernizr', [
    'modernizr'
  ]);<% } %>

  grunt.registerTask('build-js', [<% if (features.useBrowserify) { %>
    'jshint',
    'browserify:build',
    'uglify:mainjs'<% } else {%>
    'copy:js',
    'jshint'<% } %>
  ]);

  grunt.registerTask('build-beautify', [
    'cssbeautifier',
    'search',
    'replace:css',<% if (!features.useBrowserify) { %>
    'jsbeautifier:js',<% } %>
    'replace:js',
  ]);
};

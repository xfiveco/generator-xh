/**
 * IncludeReplace - enables simple partials & variables in HTML files.
 */
module.exports = function(grunt) {
  'use strict';

  // HTML Includes
  grunt.config('includereplace', {
    dist: {
      options: {
        globals: {<% if (reloader !== 'None' && !server) { %>
          reloader: '<script>//<![CDATA[\ndocument.write(\"<script async src=\'//HOST:<% if (reloader === 'BrowserSync') { %>3000/browser-sync-client.js<% } else if (reloader === 'LiveReload') { %>35729/livereload.js?snipver=1<% } %>\'><\\\/script>\".replace(/HOST/g, location.hostname));\n//]]></script>'<% } %>
        },
        includesDir: '<%%= xh.includes %>'
      },
      files: [{
        expand: true,
        cwd: '<%%= xh.src %>',
        src: ['*.html', '!template.html'],
        dest: '<%%= xh.dist %>',
        ext: '.html'
      }]
    }
  });
};

/**
 * Usemin - prepares CSS & JS files for concatenation & minification
 * and replaces them when needed.
 */
module.exports = function(grunt) {
  'use strict';

  /**
   * Ensure there are no duplicates in generated concat config.
   *
   * This is needed because concat configuration is always extended,
   * not replaced, in useminPrepare task, which results in multiplication
   * when running watch.
   */
  function simplifyGeneratedConfig(context) {
    var files = context.options.generated.files;
    var uniqueFiles = [];

    uniqueFiles = files.reduceRight(function (result, fileObj) {
      if (!result.some(function (fo) { return fo.dest === fileObj.dest; })) {
        result.push(fileObj);
      }

      return result;
    }, []).reverse();

    context.options.generated.files = uniqueFiles;
    return context.options.generated;
  }

  grunt.config('useminPrepare', {
    html: {
      src: '<%%= xh.build %>',
      cwd: '<%%= xh.tmp %>',
      expand: true
    },

    htmlmin: {
      src: '<%%= xh.build %>',
      cwd: '<%%= xh.tmp %>',
      expand: true
    },

    options: {
      dest: '<%%= xh.dist %>',
      root: '<%%= xh.src %>',
      flow: {
        steps: {
          js: ['concat'],
          css: ['concat']
        },
        post: {
          js: [{
            name: 'concat',
            createConfig: simplifyGeneratedConfig
          }],
          css: [{
            name: 'concat',
            createConfig: simplifyGeneratedConfig
          }]
        },
        htmlmin: {
          steps: {
            js: ['concat', 'uglifyjs'],
            css: ['concat']
          },
          post: {}
        }
      }
    }
  });

  grunt.config('usemin', {
    html: {
      src: '<%%= xh.build %>',
      cwd: '<%%= xh.tmp %>',
      expand: true
    },

    options: {
      assetsDirs: ['<%%= xh.tmp %>']
    }
  });
};

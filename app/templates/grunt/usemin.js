/**
 * Usemin - prepares CSS & JS files for concatenation & minification
 * and replaces them when needed.
 */
var _ = require('lodash');

module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('useminReset', 'Resets :generated configuration', function () {

    var useminPrepareConfig = grunt.config('useminPrepare') || {};
    var targets = arguments.length ? grunt.utils.toArray(arguments) : _.filter(_.keys(useminPrepareConfig), function (val) {
        return val !== 'options';
      });
    var steps = [];
    var modified = [];

    if (useminPrepareConfig.options && useminPrepareConfig.options.flow) {
      steps = _.flatten(_.values(useminPrepareConfig.options.flow.steps));
      _.forEach(targets, function (val) {
        var c = useminPrepareConfig.options.flow[val];
        if ( c && c.steps ) {
          steps = steps.concat(_.flatten(_.values(c.steps)));
        }
      });
    }
    steps = _.uniq(steps);

    _.forEach(steps, function (name) {
      var config = grunt.config(name) || {};

      if (config.generated) {
        delete config.generated.files;
        grunt.config(name, config);
        modified.push(name);
      }
    });

    if (modified.length) {
      grunt.log.writeln('Configuration reset for', grunt.log.wordlist(modified));
    }
  });

  grunt.config('useminPrepare', {
    html: {
      src: '<%%= xh.usemin %>',
      cwd: '<%%= xh.tmp %>',
      expand: true
    },

    htmlmin: {
      src: '<%%= xh.usemin %>',
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
        post: {},
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
      src: '<%%= xh.usemin %>',
      cwd: '<%%= xh.tmp %>',
      expand: true
    },

    options: {
      assetsDirs: ['<%%= xh.tmp %>']
    }
  });
};

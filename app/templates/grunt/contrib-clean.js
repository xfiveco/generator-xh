/**
 * Clean - removes old build or temporary files.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('clean', {
    tmp: { src: ['<%%= xh.tmp %>'] },
    dist: { src: ['<%%= xh.dist %>/*.<%= extension %>', '<%%= xh.dist %>/css', '<%%= xh.dist %>/js', '<%%= xh.dist %>/fonts'] }
  });
};

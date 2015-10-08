/**
 * Spritesmith - automatically creates sprites from the specifed files.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('sprite', {
    dist1x: {
      src: '<%%= xh.src %>/img/sprites/1x/*.{png,jpg,gif}',
      dest: '<%%= xh.dist %>/img/common/sprites@1x.png',
      destCss: '<%%= xh.src %>/<%= cssPreprocessor %>/setup/_sprites@1x.<%= cssPreprocessor %>',
      cssTemplate: '<%%= xh.src %>/<%= cssPreprocessor %>/setup/_sprites.<%= cssPreprocessor %>.mustache',
      algorithm: 'binary-tree',
      engine: 'pngsmith',
      padding: 2,
      cssOpts: {
        map: 'sprite-1x'
      }
    },
    dist2x: {
      src: '<%%= xh.src %>/img/sprites/2x/*.{png,jpg,gif}',
      dest: '<%%= xh.dist %>/img/common/sprites@2x.png',
      destCss: '<%%= xh.src %>/<%= cssPreprocessor %>/setup/_sprites@2x.<%= cssPreprocessor %>',
      cssTemplate: '<%%= xh.src %>/<%= cssPreprocessor %>/setup/_sprites.<%= cssPreprocessor %>.mustache',
      algorithm: 'binary-tree',
      engine: 'pngsmith',
      padding: 4,
      cssOpts: {
        map: 'sprite-2x',
        functions: false
      }
    }
  });
};

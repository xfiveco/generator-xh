/**
 *  Example Function module
 */
'use strict';

var exampleFn = {
  init: function () {
    this.sayMyName();
  },

  sayMyName: function () {
    console.log('Ready!');
  }
};

module.exports = exampleFn;

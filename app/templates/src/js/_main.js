/* ==========================================================================

    Project: <%= projectName %>
    Author: <%= projectAuthor %>
    Last updated: @@timestamp

   ========================================================================== */

'use strict';

var <%= projectNameCamel %> = {

  /**
   * Init function
   */
  init: function() {
    <%= projectNameCamel %>.exampleFn();
  },

  /**
   * Example function
   */
  exampleFn: function() {
    console.log('Ready!');
  }

};

document.addEventListener('DOMContentLoaded', function() {
  <%= projectNameCamel %>.init();
});

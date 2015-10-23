/* ==========================================================================

    Project: <%= projectName %>
    Author: <%= authorName %>
    Last updated: @@timestamp

   ========================================================================== */

'use strict';

var <%= _.capitalize(_.camelCase(projectName)) %> = {

  /**
   * Init function
   */
  init: function() {
    <%= _.capitalize(_.camelCase(projectName)) %>.exampleFn();
  },

  /**
   * Example function
   */
  exampleFn: function() {
    console.log('Ready!');
  }

};

document.addEventListener('DOMContentLoaded', function() {
  <%= _.capitalize(_.camelCase(projectName)) %>.init();
});

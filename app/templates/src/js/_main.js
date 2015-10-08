/* ==========================================================================

    Project: <%= projectName %>
    Author: <%= projectAuthor %>
    Last updated: @@timestamp

   ========================================================================== */

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

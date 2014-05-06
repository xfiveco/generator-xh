XH Generator
============

[Yeoman](http://yeoman.io) generator for scaffolding front-end projects.

## Scaffolding options

* Project name
* Branding
  * XHTMLized
  * No Branding
* CSS Preprocessors
  * SCSS
  * LESS
* WP default styles
* Additional features
  * Bootstrap
  * Modernizr
  * CSS3 Pie 

## Project structure

* **src** - source files, development is done here
 * *bower_components* - 3rd party libraries managed via Bower
 * *includes* - HTML partials like head.html
 * *scss* or *less* - SCSS or LESS files
 * *js* - application JS files
 * *home.html, etc.* - HTML files composed from HTML partials
* **dist** - production / preview files are automatically generated here
* *index.html* - project index

## Grunt tasks

Various Grunt libraries are used to automate the following tasks:

* Including HTML partials
* Beautifying HTML / CSS / JS code in dist folder
* Validating HTML code in dist folder
* Merging and minifying JS libraries
* Checking JS code with JSHint

## Installation

1. Install [node.js](http://nodejs.org) (skip if you have it installed already)

2. Install [Ruby](http://www.ruby-lang.org) (skip if you have it installed already)

3. Install [Sass](http://sass-lang.com/install) from the command line (skip if you have it installed already)

        gem install sass

4. Install Grunt from the command line (skip if you have it installed already)

        npm install -g grunt-cli
        
5. Install Bower from the command line (skip if you have it installed already)

        npm install -g bower

6. Install Yeoman (skip if you have it installed already):

        npm install -g yo

7. Install XH Generator (skip if you have it installed already):

        npm install -g generator-xh 

8. Run the generator

        yo xh

9. Run the *page* sub generator task to add a page to the project
        yo xh:page "Page name"

## Development

To re-compile HTML / SCSS file in real time you can use watch task

    grunt watch

this will start a task that will watch for changes in files and recompile them as needed.

You can connect with a LiveReload browser extension then to enable live reloads.

To rebuild the whole project and prettify / validate files use grunt task

    grunt


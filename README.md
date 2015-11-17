XH Generator [![Build Status](https://travis-ci.org/xhtmlized/generator-xh.svg?branch=master)](https://travis-ci.org/xhtmlized/generator-xh) [![NPM version](https://badge.fury.io/js/generator-xh.svg)](http://badge.fury.io/js/generator-xh) [![NPM dependiencies](https://david-dm.org/xhtmlized/generator-xh.svg)](https://david-dm.org/xhtmlized/generator-xh)
============

> XH Generator is a [Yeoman](http://yeoman.io) generator for scaffolding web projects.

[![NPM](https://nodei.co/npm/generator-xh.png?downloads=true)](https://nodei.co/npm/generator-xh/)

XH is suitable for client work when you deliver a completed project to your client for further review and development.

XH Generator creates a project structure, files and Grunt tasks which support modern workflows like CSS preprocessors. Built HTML, CSS and JS files are prettified and fully editable so clients can work directly with them if they wish.

![Project index](docs/img/project-index.png)

## Table of contents

- [Features](#features)
- [Prerequisites](#prerequisites)
   - [Node.js](#1-nodejs)
   - [Grunt](#2-grunt)
   - [Bower](#3-bower)
   - [Yeoman](#4-yeoman)
   - [XH Generator](#5-xh-generator)
- [Usage](#usage)
   - [Project scaffolding](#1-project-scaffolding)
   - [Project structure](#2-project-structure)
   - [Adding pages to the project](#3-adding-pages-to-the-project)
   - [Development](#4-development)
   - [WordPress Development](#5-wordpress-development)
   - [Collaborating](#6-collaborating)
- [Tips & Tricks](#tips--tricks)
   - [Working with files in the dist folder](#working-with-files-in-the-dist-folder)
   - [Writing styles](#writing-styles)
   - [LibSass notices](#libsass-notices)
   - [Adding 3rd party dependency via Bower](#adding-3rd-party-dependency-via-bower)
   - [Using Sprites](#using-sprites)
   - [Automatic SVG Fallbacks](#automatic-svg-fallbacks)
   - [Working with Files Other than \*.html](#working-with-files-other-than-*.html)
   - [Live Reloading Tips](#live-reloading-tips)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Features
- Custom project name
- Responsive project index with a list of pages / templates
- [HTML includes](https://github.com/alanshaw/grunt-include-replace) to avoid code duplication
- A sub generator for adding pages to the project
- Industry standard [normalize.css](http://necolas.github.io/normalize.css/) as a base stylesheet
- CSS Preprocessing with [Sass](http://http://sass-lang.com/) or [Less](http://lesscss.org/)
- Optional libraries like [Bootstrap](http://getbootstrap.com/), [Modernizr](http://modernizr.com/) & [jQuery](http://jquery.com/)
- Building customized Modernizr version using only the tests you've used in your JavaScript or (S)CSS files.
- Add vendor-prefixed CSS properties with [autoprefixer](https://github.com/postcss/autoprefixer) - PostCSS plugin
- Add fallback for rem units automatically with [pixrem](https://github.com/robwierzbowski/node-pixrem) - PostCSS plugin (set base font size for `<html>` tag - 100% is default 16px)
- Support for importing vanilla CSS files (eg. from Bower) directly into SCSS with [postcss-import](https://github.com/postcss/postcss-import) - PostCSS plugin
- Live reload and browsers syncing with [BrowserSync](http://www.browsersync.io/) or LiveReload
- Optional development server
- Grunt tasks for prettifying built HTML / CSS / JS
- Auto generated table of contents in main.css
- Functionality for merging JS libraries to reduce number of HTTP requests
- Consistent coding style supported by [.editorconfig](http://editorconfig.org/)
- JavaScript code linting with [JSHint](http://www.jshint.com/)
- [Icomoon](http://icomoon.io) generation support
- Optional [WordPress styles](http://codex.wordpress.org/CSS) for images and captions
- WordPress development support

## Getting Started

The following software needs to be installed if you want to use XH Generator. These installations need to be done just once so you can skip this section if you have the software already installed.

(Note: As a command line replacement at Windows we recommend [ConEmu](https://code.google.com/p/conemu-maximus5/).)

### 1) Node.js

Install [Node.js](http://nodejs.org/) so you can work with `npm`, Node package manager.

### 2) Grunt
Then install [Grunt](http://gruntjs.com/)'s command line interface (CLI) globally:

```
npm install -g grunt-cli
```

### 3) Bower
For managing certain dependencies like Bootstrap, you will need [Bower](http://bower.io/), another package manager. Install it from the command line too:

```
npm install -g bower
```

Also make sure that [git](http://git-scm.com/) is installed as some bower packages require it to be fetched and installed. On Windows ensure that Git is installed in your PATH by selecting *Run Git from the Windows Command Prompt* option during installation (check this [screenshot](http://wiki.team-mediaportal.com/@api/deki/files/3808/=Git_Setup_-_Run_from_Windows_Command_Prompt.PNG)).

### 4) Yeoman
XH Generator is a [Yeoman](http://yeoman.io/) generator, so obviously it depends on it. You can easily install Yeoman with the following command:

```
npm install -g yo
```

### 5) XH Generator
Finally install the XH Generator:

```
npm install -g generator-xh
```

Congratulations, you are now ready to use XH Generator!

## Usage

### 1) Project scaffolding

To create a project with XH Generator, create a new folder, open a command line in it and type:

```
yo xh
```

You will be presented with a welcome screen and project scaffolding options. Answer the generator questions according your project needs.

![Project scaffolding](docs/img/scaffolding.png)

Once done, the generator will create the required files and folders and install all npm and Bower dependencies for you:

![NPM & Bower installation](docs/img/installation.png)

XH Generator allows you to generate projects based on provided configuration. If the `yo-rc.json` file is present in project root folder, you will be prompted to type new name for the project and the rest will be scaffolded automatically.

Use `--config` option to provide a path to your custom configuration file (if you're storing the file in your home directory, use non-default name for it, ie. .yo-config.json - otherwise Yeoman will change the project directory to your home dir):

```
yo xh --config ~/.yo-config.json
```

Example of valid configuration file:

```
{
  "generator-xh": {
    "config": {
      "projectName": "Default Project Name",
      "useBranding": true,
      "reloader": "BrowserSync",
      "devServer": true,
      "cssPreprocessor": "scss",
      "ignoreDist": true,
      "isWP": false,
      "features": [
        "useJquery",
        "useOptim",
        "useBootstrap",
        "useModernizr",
        "useSprites"
      ]
    }
  }
}
```

### 2) Project structure

The generated project structure will look like this:

![Project structure](docs/img/project-structure.png)

The meaning of files and folders are as follows:

- **dist** - production / preview files are automatically generated here, this is where you check your work in a browser.
- **node_modules** - Node.js modules for various Grunt tasks, usually you don’t have to do anything about this folder
- **src** - source files, development is done here
   - **bower_components** - 3rd party libraries managed via [Bower](http://bower.io/)
   - **designs** - place to store design previews, sprite source files & so on
   - **grunt** - atomic grunt tasks configuration
   - **includes** - HTML partials like `head.html`, `scripts.html`, etc.
   - **scss / less** - Sass or Less files
     - `main.scss` / `main.less` - main file where other stylesheets are imported
     - **common** - common styles for most of pages
       - `_layout.scss` / `layout.less` - main page structure
       - `_utilites.scss` / `utilities.less` - utility classes (image replacement, hide, etc.)
       - `_wordpress.scss` / `wordpress.less` -  [WordPress styles](http://codex.wordpress.org/CSS) for images and captions (in WP projects)
     - **components** - styles for page modules/components; this is where most of your styles will go
     - **setup** - various configurations and preprocesor helpers
       - `_variables.scss` / `variables.less` - variables file
       - `_mixins.scss` / `mixins.less` - mixins file
       - `_sprites.scss` / `sprites.less` - sprite mixin when 'Automatic sprites' feature is used
       - `_sprites.scss.mustache` / `sprites.less.mustache` - template file for generating actual sprites code
     - **vendor** - styles overwriting/replacing library ones
   - **js**
     - `main.js` is a main JS file in project
   - `home.html`, etc. - HTML files composed from HTML partials
- `index.html` - project index with project pages listed
- `Gruntfile.js` - [Grunt](http://gruntjs.com/) file with various automation tasks defined in it
- `bower.json` - Bower dependencies in the project
- `package.json` - npm packages dependencies
- `.yo-rc.json` - Yeoman generator configuration file
- `.bowerrc` - configuration file for Bower
- `.editorconfig` - [EditorConfig](http://editorconfig.org/) configuration file to achieve consistent coding style
- `.gitattributes` - [Git](http://git-scm.com/) configuration file to force Unix line ending in all text files
- `.gitignore` - default Git ignore files and folders
- `.jshitrc` - [JSHint](http://www.jshint.com/) configuration


On a typical project, you will work in `src` folder and check your work in `dist` folder so you don’t have to touch other files. For more info about working with styles structure go to [Writing styles section](#writing-styles).

### 3) Adding pages to the project

Once you have basic project structure generated, you should add pages you will be working on. XH Generator comes with a subgenerator for adding new pages to the project.

From the command line type:

```
yo xh:page "Page Name"
```

for example

```
yo xh:page "Home"
```

You can also create multiple pages at once by separating page names with space:

```
yo xh:page "Home" "About Us" "Contact Us" "News"
```

The command will do the following:

1. creates a HTML file for your page in `src` folder from the template file `src/template.html`. If you want you can update the template file as needed, so the generated files look accordingly.
2. adds a page name and link to it to the project index
3. runs `grunt build` command to generate the page

![Page added](docs/img/page-added.png)

When running the command, you will asked if `index.html` should be overridden:

![Project index overwrite](docs/img/index-overwrite.png)

If you wonder what Yanxdh means in the above screenshot, it is:
- **Y:** Yes (Default)
- **n:** No
- **a:** Yes to this question and all others.
- **x:** Abort
- **d:** Show the differences between the old and the new file
- **h:** Help, list all options

Confirm overwriting the file with `Y` or with `a` at once.

#### Generating multiple pages at once

You can also list the pages that you want to create directly in the `.yo-rc.json` file:

```
{
  "generator-xh": {
    "config": {...},
    "pages": [
      "Home",
      "About Us",
      "Contact Us",
      "News"
    ]
  }
}
```

Then, from the command line you can type:

```
yo xh:page
```

After you run the command, please proceed with the flow described above.

### 4) Development

When you have the basic setup done and your first page added, you can start development. Run the grunt build command to generate preview files in the dist folder:

```
grunt build
```

![grunt command](docs/img/grunt.png)

If everything went ok, the preview files will be generated and you will be able to check your work in the `dist` folder.

To re-compile HTML / SCSS file in real time you can use default task. Type:

```
grunt
```

and this will start a task that will watch for changes in files and recompile them as needed. If relevant options were selected during project setup, development server may be started and/or BrowserSync (or LiveReload) scripts injected.

![grunt watch command](docs/img/grunt-watch.png)

To rebuild the whole project, use the grunt build task again:

```
grunt build
```

To validate HTML files, use the following task:

```
grunt validate
```

To detach X-Precise from pages, rebuild the project, validate HTML files and check JavaScript files with JS Hint, use the following task

```
grunt qa
```

### 5) WordPress Development

XH Generator supports WordPress development. When setting up the project using `yo xh`, answer _Yes_ to the question _Is this a WordPress project_?. The generator prepares directory structure for WP installation and connects the front-end files to the project theme.

Use the WordPress subgenerator to set up a WordPress project any time in the project life cycle:

```
yo xh:wp
```

Several options are available:

- database settings which are later inserted into `wp-config.php`
- installation of [WPized Light base theme](https://github.com/xhtmlized/wpized-light).
- installation of [Stream](https://wp-stream.com/) plugin
- installation of [WP Sync DB](https://github.com/wp-sync-db/wp-sync-db) plugin

Once you run the subgenerator, it does the following:

- downloads the latest WP distribution and places it to `wp` folder
- downloads the optional theme and plugins and place them to their respective folders
- sets up `wp-config.php`
- creates a sample `dev-vhost.conf` file which you can use to set up a virtual host

When running Grunt tasks the front-end `dist` files are automatically copied to your theme folder, so you can continue working on the front-end like usually and all updates will be applied to the WordPress site as well.

### 6) Collaborating

If you are joining an existing project which was set up using XH Generator, remember that the project was already generated with `yo xh` command so you don't have to generate it again. Assuming that you have all [prerequisites](#prerequisites) installed, all you need to do is to clone the existing repository and install Bower and npm dependencies.

Let's imagine we have a project called Robot Magic here at the XHTMLized GitHub account. First, we will clone it locally:

```
git clone git@github.com:xhtmlized/robot-magic.git
```

Now change the directory to your newly cloned project:

```
cd robot-magic
```

First, install Bower depedencies:

```
bower install
```

Then install npm dependencies:

```
npm install
```

Now the project is set up and you can continue like described in the [Development](#4-development) section. If there are no pages in the project yet, first you need to [add some pages to it](#3-adding-pages-to-the-project).

## Tips & Tricks

### Working with files in the dist folder

In general, it’s not recommended that you work directly with files in the `dist`. The files in `dist` folder are automatically generated from the source files in `src` folder and by default `dist` folder is ignored in version control system. However, once you hand over the project to your client, they can work directly with plain HTML and CSS files if they wish.

HTML and CSS files are prettified for consistent formatting and a table of contents from imported SCSS or Less stylesheets is generated at the beginning of `main.css` for better overview.

### Writing styles

XH Generator supports Sass or Less. Sass syntax is not recommended. The following source files are generated in `src/scss` or `src/less` folders:

- `main.scss` / `main.less` - main file where other stylesheets are imported
- **common** - common styles for most of pages
  - `_layout.scss` / `layout.less` - main page structure
  - `_utilites.scss` / `utilities.less` - utility classes (image replacement, hide, etc.)
  - `_wordpress.scss` / `wordpress.less` -  [WordPress styles](http://codex.wordpress.org/CSS) for images and captions (in WP projects)
- **components** - styles for page modules/components; this is where most of your styles will go
- **setup** - various configurations and preprocesor helpers
  - `_variables.scss` / `variables.less` - variables file
  - `_mixins.scss` / `mixins.less` - mixins file
  - `_sprites.scss` / `sprites.less` - sprite mixin when 'Automatic sprites' feature is used
  - `_sprites.scss.mustache` / `sprites.less.mustache` - template file for generating actual sprites code
- **vendor** - styles overwriting/replacing library ones

The following approach is recommended when creating styles:

1. Use `main.scss` or `main.less` only for importing other stylesheets. Do not write styles directly to these files!
2. Use variables and mixins files to store your variables and mixins.
3. Depending on your preferences for styles organization, you can organize them according modules & components (recommended, use **components** folder), or pages. A good practice is to name file the same as main class used for that component, for example if you create a component representing an article with `.article` as a main CSS class followed by `.article-title`, `.article-meta`, etc. and with `.article--featured` variant that will have slightly different color scheme, you will do everyone a favour by placing it in `scss/components/_article.scss` file instead of ~~`scss/components/_text.scss`~~.
4. If you find yourself overwriting/replacing default library styles, put them into **vendor** folder. A good examples of that are replacing library custom select or lightbox styles with your own or overwriting some Bootstrap styles that were not configurable.
5. Comment [main sections and subsections](https://github.com/xhtmlized/css-coding-standards#comments) appropriately.
6. If you want to avoid using preprocessors for certain reason (eg. your project is very simple), you can still use SCSS or Less files to write only regular CSS.
7. By default [autoprefixer](https://github.com/postcss/autoprefixer) is enabled in project, which mean that you don't need to write prefixes for the standard CSS3 properties. It uses [Can I Use](http://caniuse.com/) database. However, please note that some popular properties (like `-webkit-appearance` or `-webkit-font-smoothing` are not a part of standard and need to be written with prefixes by you).

### Adding 3rd party dependency via Bower

Let’s say you want to add [Colorbox](http://www.jacklmoore.com/colorbox/) to your project. The following example shows how you can add it as a Bower package and merge its JS file into common `plugins.min.js` file.

1. First, install it via Bower

    ```
    bower install jquery-colorbox --save
    ```

2. Then link it in `src/includes/scripts.html`. This will ensure that the library will be added to `plugins.min.js` file

    ```html
    <!-- build:js js/plugins.min.js -->
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/jquery-colorbox/jquery.colorbox-min.js"></script>
    <!-- endbuild -->
    <script src="js/main.js"></script>
    ```

3. Go to `src/bower_components/jquery-colorbox` and copy images from `example1/images` folder to `src/img/colorbox` folder.

4. Get `example1/colorbox.css` from the same dir, rename it to `_colorbox.scss`, store it in `src/scss/vendor` folder and adjust to your needs if needed.

5. Import `colorbox.scss` in `main.scss`

    ```css
    @import "vendor/colorbox";
    ```

6. Replace all instances of `images/` in `colorbox.scss` with `../img/colorbox/`

7. Run the `grunt build` task or `grunt` task

8. Now you can use Colorbox in your HTML files and initiate it from `src/js/main.js`

### Using Sprites

When relevant option is selected during setup, tasks for automatic sprite generation are added. Out-of-the-box only PNG files are supported, however if for some reason other source files are needed (like JPGs and GIFs) it is possible to add them (it will require installing some additional dependencies tough).

Sprites generation is accomplished using [grunt-spritesmith](https://github.com/Ensighten/grunt-spritesmith). Detailed documentation regarding available options and generation engines is described there.

In the XH Generator default configuration you are expected to put yor files in `src/img/sprites/1x/` directory for normal-density screens and `src/img/sprites/2x/` for retina & similar ones. Filename of the image should be the same - let's say `home.png`. When task finishes running (it may take some time, which is why sprite generation is optional feature), you will be able to use sprite helper mixins in your code. The one you're most interested in can be found in `src/scss/setup/_sprites.{scss|less}` - `sprite-retina` mixin. It takes two arguments (for now, we're planning to further simplify that) - variable that holds normal sprite data & variable that holds retina sprite data. Those variables were generated for you when task ran. To make it clearer, using SCSS for our example home icon you would do:

```css
.my-home-icon {
    @include sprite-retina($sprite-1x-home, $sprite-2x-home);
}
```

The exact variable names can be found in `src/scss/setup/_sprites@N.{scss|less}` files if you need to check them.

**Important!** Currently you need to provide **both** files (nomal & retina). If you do not, the output sprite images will differ and as a result generated `background-position` values will be incorrect.

### Automatic SVG Fallbacks

Vector graphics is increasingly more popular in web development due to its prefect look no matter the scale. As such you will probably find yourself using SVG files or icon fonts more and more often. However, not all browsers support SVGs out of the box, so fallbacks are needed. Currently XH Generator supports automatic optimization of SVG files (along with various other raster image formats) and PNG fallbacks creation. The caveat for correct automatic fallbacks is that SVG viewport needs to have proper size (PNG file will have the same dimensions). Also, if something seems off you can [play with optimization settings](https://github.com/sindresorhus/grunt-svgmin#available-optionsplugins) in `grunt/contrib-imagemin.js` task.

### Working with Files Other than \*.html

During project setup there is an option to specify default pages extension. It will automatically configure some tasks like `watch` or `usemin` to work with files other than \*.html (like \*.php or \*.jade). However, it will disable development server - it is assumed that when you need other file types it also means you need to configure something that will be responsible for processing them, be it local server (like [Apache](http://httpd.apache.org/) or [Nginx](http://wiki.nginx.org/Main)) or some template processing engine.

This setting will be remembered in the project configuration, so when you run `yo xh:page` it will create files with correct extension.

### Live Reloading Tips

#### Disable Index Page Auto-opening

##### For BrowserSync

In `grunt/browser-sync.js` file find `options` section and add `open: false`.

##### For LiveReload

In `grunt/contrib-connect.js` file find `options` section and either remove `open: true` or change it to `false`.

#### BrowserSync Proxy

During setup, when you choose not to run development server (or are unable to run it), you will be asked about URL of the page you will work with. By default this is `localhost`, but you can change it to something like `project.dev` or anything you like. When running development (default) grunt task, BrowserSync will then set up proxy server (by default on port 3000), that will allow you to use live reloading while for example simultaneously serving pages via Apache (and using PHP).

### Browserify

With version 0.7 comes support for [Browserify](http://browserify.org/) module bundler (available as an option from additional features), so feel free to `require('module')` in your JS code. Example usage is provided in `main.js`. 
Also be sure to check out [browserify-shim](https://github.com/thlorenz/browserify-shim) in case you need compatibility with some non-AMD, non-CommonJS packages (e.g. from `bower`) or with some jQuery plugins. Always use `npm` packages where possible.

## Changelog

Check [Releases](https://github.com/xhtmlized/generator-xh/releases)

## Contributing

If you want to contribute to the XH Generator development, watch the project repository so you are notified about the new issues and related discussion.

Each fix or new idea needs be added as an issue so they can be referred later and reviewed and discussed if necessary.

The following labels are used to mark the issues and ensure predictable generator API and usage:

- **Minor Improvement** - improvement which doesn't significantly affect the way how you work with the generator now.
- **Workflow Change** - will change the way how you work with the generator and projects and you'll probably need to learn or get used to the new stuff. There will be at least 2 weeks interval between creating such issue and starting actual work. During this period you can discuss the issue or submit your objections to the proposed idea.
- **Future Enhancement** - ideas for the future enhancements, they usually won't be implemented sooner than in a couple of weeks or months. If particular future enhancement changes the workflow, such label will be added to it at least 2 weeks before development starts.

Please also follow the GitHub guides for contributing and reporting issues to the project:

- [Contributing to Open Source on GitHub](https://guides.github.com/activities/contributing-to-open-source/)
- [Mastering Issues](https://guides.github.com/features/issues/)

## Credits

XH Generator is inspired by [Yeogurt Generator](https://github.com/larsonjj/generator-yeogurt).

## License

XH Generator is licensed under [MIT License](LICENSE).

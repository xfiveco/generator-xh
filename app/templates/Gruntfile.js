module.exports = function(grunt) {

  require('time-grunt')(grunt);

  require('jit-grunt')(grunt,  {
    includereplace: 'grunt-include-replace',
    useminPrepare: 'grunt-usemin',
    validation: 'grunt-html-validation',
    replace: 'grunt-text-replace'
  });

  // Project configuration.
  grunt.option('force', true);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Configs
    xh: {
      src: 'src',
      dist: 'dist',
      build: ['head.html', 'scripts.html']
    },

    useminPrepare: {
      html: {
        src: '<%%= xh.build %>',
        cwd: '<%%= xh.src %>/includes/',
        expand: true
      },

      options: {
        dest: '<%%= xh.dist %>',
        root: '<%%= xh.src %>',
        flow: {
          steps: {'js': ['concat'], 'css': ['concat'] },
          post: {}
        }
      }
    },

    usemin: {
      html: {
        src: '<%%= xh.build %>',
        cwd: '<%%= xh.src %>/includes/',
        expand: true
      },

      options: {
        assetsDirs: ['<%%= xh.src %>/includes/']
      }
    },

    clean: {
      tmp: { src: ['.tmp'] },
      dist: { src: ['<%%= xh.dist %>/*.html', '<%%= xh.dist %>/css', '<%%= xh.dist %>/js', '<%%= xh.dist %>/fonts'] }
    },

    // HTML Includes
    includereplace: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= xh.src %>',
          src: ['*.html'],
          dest: '<%%= xh.dist %>',
          ext: '.html'
        }]
      }
    },

    jsbeautifier: {
      options : {
        html: {
          indentSize: 2
        },
        js: {
          indentSize: 2
        }
      },

      html: {
        src: '<%%= xh.dist %>/*.html'
      },

      js: {
        src: '<%%= xh.dist %>/js/main.js'
      }
    },

    validation: {
      src: ['<%%= xh.dist %>/*.html'],
      options: {
        reset: true
      }
    },

    // CSS
    <% if (cssPreprocessor === 'SCSS') { %>
    sass: {
      dist: {
        options: {
          style: 'expanded',
          sourcemap: true,
          loadPath: 'src/bower_components/'
        },
        files: {
          '<%%= xh.dist %>/css/main.css': '<%%= xh.src %>/scss/main.scss'
        }
      }
    },<% } %> <% if (cssPreprocessor === 'LESS') { %>

    less: {
      dist: {
        options: {
          path: 'src/bower_components/'
        },
        files: {
          '<%%= xh.dist %>/css/main.css': '<%%= xh.src %>/less/main.less'
        }
      }
    },<% } %>

    autoprefixer: {
      main: {
        src: '<%%= xh.dist %>/css/main.css',
        dest: '<%%= xh.dist %>/css/main.css'
      }
    },

    cssbeautifier: {
      files: ['<%%= xh.dist %>/css/*.css', '!<%%= xh.dist %>/css/libraries.min.css'],
      options : {
        indent: '  '
      }
    },

    // JS
    copy: {
      normalize: {
        src: 'src/bower_components/normalize.css/normalize.css',<% if (cssPreprocessor === 'SCSS') { %>
        dest: 'src/bower_components/normalize.css/normalize.scss'<% } %><% if (cssPreprocessor === 'LESS') { %>
        dest: 'src/bower_components/normalize.css/normalize.less'<% } %>
      },

      jquery: {
        cwd: 'src/bower_components/jquery/dist/',
        src: 'jquery.min.js',
        dest: '<%%= xh.dist %>/js/',
        expand: true
      },

      fonts: {
        cwd: '<%%= xh.src %>/fonts/',
        src: ['*.*', '!do_not_delete_me.png'],
        dest: '<%%= xh.dist %>/fonts/',
        expand: true
      },

      img: {
        cwd: '<%%= xh.src %>/img/',
        src: ['*.*', '!do_not_delete_me.png'],
        dest: '<%%= xh.dist %>/img/',
        expand: true
      },

      media: {
        cwd: '<%%= xh.src %>/media/',
        src: ['*.*', '!do_not_delete_me.png'],
        dest: '<%%= xh.dist %>/media/',
        expand: true
      },

      xprecise: {
        cwd: '<%%= xh.src %>/xprecise/',
        src: ['*.*', '!do_not_delete_me.png'],
        dest: '<%%= xh.dist %>/_xprecise/',
        expand: true
      },

      js: {
        cwd: '<%%= xh.src %>/js/',
        src: ['main.js', <% if (useModernizr) { %>'modernizr.min.js'<% } else { %>'html5shiv.min.js'<% } %>],
        dest: '<%%= xh.dist %>/js/',
        expand: true
      },<% if (isWP) { %>

      wp: {
        cwd: '<%%= xh.dist %>/',
        src: ['**', '!**/_xprecise/**', '!*.html'],
        dest: '<%= wpThemeFolder  %>',
        expand: true
      },<% } %>

      // Backup include files
      backup: {
        cwd: '<%%= xh.src %>/includes/',
        src: '<%%= xh.build %>',
        dest: '.tmp',
        expand: true
      },

      // Restore include files
      restore: {
        cwd: '.tmp',
        src: '<%%= xh.build %>',
        dest: '<%%= xh.src %>/includes/',
        expand: true
      }<% if (!useModernizr) { %>,

      shiv: {
        cwd: 'src/bower_components/html5shiv/dist/',
        src: 'html5shiv.min.js',
        dest: '<%%= xh.dist %>/js/',
        expand: true
      }<% } %>
    },

    jshint: {
      options: {
        jshintrc: true,
        force: true
      },
      dist: {
        src: ['<%%= xh.src %>/js/main.js', '<%%= xh.dist %>/js/main.js'],
      }
    },<% if (useModernizr) { %>

    uglify: {
      modernizr: {
        files: {
          '<%%= xh.src %>/js/modernizr.min.js': ['src/bower_components/modernizr/modernizr.js']
        }
      }
    },<% } %>

    // Remplacements in main.css and main.js
    replace: {
      css: {
        src: ['<%%= xh.dist %>/css/main.css'],
        overwrite: true,
        replacements: [{
          from: '@@timestamp',
          to: '<%%= grunt.template.today() %>'
        },
        // Table of contents in main.css
        {
          from: '@@toc',
          to: function () {

            if (!grunt.file.exists('csstoc.json')) {
              return '';
            }

            var toc_file = grunt.file.readJSON('csstoc.json')
            var files = toc_file.results;
            var toc = '';
            var i = 1;
            var match;

            function capitalize(s) {
              return s[0].toUpperCase() + s.slice(1);
            }

            for (var key in files) {
              if (files.hasOwnProperty(key)) {

                var results = files[key];

                for (var key in results) {
                  if (results.hasOwnProperty(key)) {

                    match = results[key]['match'];
                    match = match.replace(/"|'|@import|;|.scss|.less/gi, "").trim();
                    match = match.split('/').pop();
                    match = capitalize(match);

                    if (match !== 'Variables' && match !== 'Mixins') {
                      toc += '\n    ' + i + '. ' + match;
                      i++;
                    }
                  }
                }
              }
            }
            return toc;
          }
        },
        // Add empty line after section & subsection comment
        {
          from: /=== \*\//g,
          to: '=== */\n'
        },
        // Add empty line after rule if it doesn't have one already
        {
          from: /}(?!\n\n)/gi,
          to: '}\n'
        }]
      },

      js: {
        src: ['<%%= xh.dist %>/js/main.js'],
        overwrite: true,
        replacements: [{
          from: '@@timestamp',
          to: '<%%= grunt.template.today() %>'
        }]
      },

      xprecise: {
        src: ['<%%= xh.src %>/includes/scripts.html'],
        overwrite: true,
        replacements: [{
          from: '<script src="http://cssonsails.org/xprecise/xprecise.min.js"></script>',
          to: ''
        }]
      }
    },

    // Create list of @imports
    search: {
      imports: {
        files: {<% if (cssPreprocessor === 'SCSS') { %>
          src: ['<%%= xh.src %>/scss/main.scss']<% } %><% if (cssPreprocessor === 'LESS') { %>
          src: ['<%%= xh.src %>/less/main.less']<% } %>
        },
        options: {
          searchString: /@import[ \("']*([^;]+)[;\)"']*/g,
          logFormat: "json",
          logFile: "csstoc.json"
        }
      }
    },

    // Watch
    watch: {
      options: {
        spawn: false
      },

      compileCSS: {
        files: [<% if (cssPreprocessor === 'SCSS') { %>
          '<%%= xh.src %>/scss/**/*.scss'<% } %><% if (cssPreprocessor === 'LESS') { %>
          '<%%= xh.src %>/less/**/*.less'<% } %>
        ],
        tasks: [
          'build-css'<% if (isWP) { %>,
          'copy:wp'<% } %>
        ]
      },

      css: {
        files: ['<%%= xh.dist %>/css/*.css'],
        options: {
          livereload: true
        }
      },

      html: {
        files: ['<%%= xh.src %>/*.html', '<%%= xh.src %>/includes/*.html'],
        tasks: [
          'build-html'
        ],
        options: {
          livereload: true
        }
      },

      js: {
        files: '<%%= xh.src %>/js/*.js',
        tasks: [
          'build-js'<% if (isWP) { %>,
          'copy:wp'<% } %>
        ],
        options: {
          livereload: true
        }
      },

      assets: {
        files: ['<%%= xh.src %>/img/*.*', '<%%= xh.src %>/media/*.*', '<%%= xh.src %>/fonts/*.*', '<%%= xh.src %>/xprecise/*.*'],
        tasks: [
          'build-assets'<% if (isWP) { %>,
          'copy:wp'<% } %>
        ],
        options: {
          livereload: true
        }
      }
    }

  });

  grunt.registerTask('build-html', [
    'useminPrepare',
    'concat',
    'copy:backup',
    'usemin',
    'includereplace',
    'copy:restore',
    'jsbeautifier:html',
    'clean:tmp'
  ]);

  grunt.registerTask('build-assets', [
    'copy:img',
    'copy:media',
    'copy:fonts',
    'copy:xprecise'
  ]);

  grunt.registerTask('build-css', [
    <% if (cssPreprocessor === 'SCSS') { %>
    'sass',<% } %><% if (cssPreprocessor === 'LESS') { %>
    'less',<% } %>
    'autoprefixer',
    'cssbeautifier',
    'search',
    'replace:css'
  ]);

  grunt.registerTask('build-js', [
    'copy:js',
    'jsbeautifier:js',
    'replace:js',
    'jshint'
  ]);

  grunt.registerTask('build', [
    'clean:dist',

    'build-html',
    'build-assets',
    'build-css',
    'build-js',<% if (isWP) { %>

    'copy:wp',<% } %>
  ]);

  grunt.registerTask('validate', [
    'validation'
  ]);

  grunt.registerTask('qa', [
    'replace:xprecise',
    'build',
    'validate',
    'jshint'
  ]);

  grunt.registerTask('postinstall', [<% if (!useBootstrap) { %>
    'copy:normalize',<% } %><% if (useModernizr) { %>
    'uglify:modernizr',<% } else { %>'copy:shiv',<% } %>
    'copy:jquery'
  ]);

  grunt.registerTask('default', [
    'watch'
  ]);
};

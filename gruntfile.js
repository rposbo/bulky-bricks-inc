var timer = require("grunt-timer");

module.exports = function(grunt) {
timer.init(grunt);

var imageminMozjpeg = require('imagemin-mozjpeg');

	grunt.initConfig({
		// Minify the CSS
		cssmin: {
			target: {
				files: [
					{ src: ['after/css/material-design.css', 'after/css/site.css'], dest: 'after/css/result.min.css' }
				]
			}
		},
		// Image minification
	   imagemin: {                          
	     dynamic: {                                        
	         options: {
	           use: [imageminMozjpeg( {quality:80, quantTable: 3} )]
	         },         
	       files: [{
	         expand: true,                 
	         cwd: 'after/images/',                  
	         src: ['*.{png,jpg,gif}'],   
	         dest: 'after/images/dist/'                  
	       }]
	     }
	   },
		// Minify SVG
		svgmin: {
			options: {
				plugins: [
					{
						removeViewBox: true
					}, {
						removeUselessStrokeAndFill: true
					}
				]
			},
			dist: {
				files: {
					'after/images/dist/logo.svg': 'after/images/logo.svg'
				}
			}
		},
		pagespeed: {
			options: {
				nokey: true,
				url: "http://rposbo.github.io"
			},
			prod: {
				options: {
					url: "http://rposbo.github.io/bulky-bricks-inc/after/index.html",
					locale: "en_GB",
					strategy: "desktop",
					threshold: 60
				}
			}
		},
		// Minify the JavaScript
		uglify: {
		  dist: {
		    files: [{
		      expand: true,
		      cwd: 'after/scripts',
		      src: ['*.js', '!*.min.js'],
		      dest: 'after/scripts',
		      ext: '.min.js'
		    }]
		  }
		},
		// Removed any unused CSS
		uncss: {
		  dist: {
		    files: {
		      'after/css/index.css': ['after/index.html']
		    }
		  }
		},
		// Rewrite any CSS links to the new clean CSS
		 processhtml: {
		    options: {
		      data: {
		        //message: 'Hello world!'
		      }
		    },
		    dist: {
		      files: {
		        'after/processed-index.html': ['after/index.html']
		      }
		    }
		  },
		// Minify the HTML
		htmlmin: {                                   
		    dist: {                                      
		        options: {                                 
		            removeComments: true,
		            collapseWhitespace: true,
		            conservativeCollapse: true,
		            collapseBooleanAttributes: true,
		            removeAttributeQuotes: true,
		            removeRedundantAttributes: true,
		            keepClosingSlash: true,
		            minifyJS: true,
		            minifyCSS: true
		        },
		        files: [
		            {
		                expand: true,
		                cwd: 'after/',
		                src: ['*.html'],
		                dest: 'after/html/',
		                ext: '.html'
		            }
		        ]
		    }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-pagespeed');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-processhtml');

	grunt.registerTask('default', ['pagespeed', 'imagemin', 'uglify', 'cssmin', 'svgmin', 'uncss', 'processhtml', 'htmlmin']);
};


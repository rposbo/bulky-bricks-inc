module.exports = function(grunt) {

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
		    files: [{
		      expand: true,
		      cwd: 'after/images/',
		      src: ['**/*.{png,jpg,gif}'],
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
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'scripts',
		      src: ['*.js', '!*.min.js'],
		      dest: 'scripts',
		      ext: '.min.js'
		    }]
		  }
		},
		// Minify the HTML
		htmlmin: {                                   
		    build: {                                      
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
		                cwd: '',
		                src: ['*.html'],
		                dest: '',
		                ext: '.min.html'
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
	grunt.loadNpmTasks('grunt-htmlmin');

	grunt.registerTask('default', ['pagespeed', 'uglify','htmlmin', 'cssmin', 'svgmin', 'imagemin']);

};

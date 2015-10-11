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
					use: [imageminMozjpeg( {quality:80, quantTable: 3} )],
					svgoPlugins: [{ removeViewBox: true, removeUselessStrokeAndFill: true }],
				},         
				files: [{
					expand: true,                 
					cwd: 'before/images/',                  
					src: ['*.{png,jpg,gif,svg}'],   
					dest: 'after/images/'                  
				}]
			}
		},
		// // Minify SVG
		// svgmin: {
		// 	options: {
		// 		plugins: [
		// 		{
		// 			removeViewBox: true
		// 		}, {
		// 			removeUselessStrokeAndFill: true
		// 		}
		// 		]
		// 	},
		// 	dist: {
		// 		files: {
		// 			'after/images/logo.svg': 'before/images/logo.svg'
		// 		}
		// 	}
		// },
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
					cwd: 'before/scripts',
					src: ['*.js', '!*.min.js'],
					dest: 'after/scripts',
					ext: '.min.js'
				}]
			}
		},
		// Rewrite the minifed CSS into the process HTML file
		processhtml: {
			dist: {
				files: [{
					expand: true,
					cwd: 'before',
					src: ['*.html'],
					dest: 'after',
					ext: '.html'
				}]
			}
		},
		// Extract the critical CSS
		critical: {
			dist: {
				options: {
					base: './after',
					minify: true,
					dimensions: [{
						width: 1300,
						height: 900
					},
					{
						width: 500,
						height: 900
					}]
				},
				files: {
					 ['after/index.html']: ['after/index.html'],
					 ['after/about.html']: ['after/about.html'],
					 ['after/contact.html']: ['after/contact.html'],
					 ['after/product.html']: ['after/product.html'],
					 ['after/products.html']: ['after/products.html']
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
					dest: 'after/',
					ext: '.html'
				}
				]
			}
		}
	});

grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-imagemin');
// grunt.loadNpmTasks('grunt-svgmin');
grunt.loadNpmTasks('grunt-webp');
grunt.loadNpmTasks('grunt-pagespeed');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-critical');
grunt.loadNpmTasks('grunt-processhtml');

grunt.registerTask('test', ['pagespeed']);
grunt.registerTask('default', ['uglify', 'cssmin', 'imagemin','webp:jpeg', 'webp:png', 'processhtml', 'critical', 'htmlmin']);

};
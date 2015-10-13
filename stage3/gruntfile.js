var timer = require("grunt-timer");

module.exports = function(grunt) {
	timer.init(grunt);

	var imageminMozjpeg = require('imagemin-mozjpeg');

	grunt.initConfig({
		// Stage 1 - Image minification
		imagemin: {                          
			dynamic: {                                        
				options: {
					use: [imageminMozjpeg( {quality:80, quantTable: 3} )],
					svgoPlugins: [{ removeViewBox: true, removeUselessStrokeAndFill: true }],
				},         
				files: [{
					expand: true,                 
					cwd: '../before/images/',                  
					src: ['*.{png,jpg,gif,svg}'],   
					dest: 'images/'                  
				}]
			}
		},
		// convert png to webp
		webp:{
			png: {
				files:[{
					expand: true,
					cwd: "../before/images/",
					src: "*.png",
					dest: "images/webp/"
				}],
		      options: {
        		binpath: "../after/cwebp.exe",
		        preset: 'picture',
		        verbose: false,
		        quality: 80,
		        alphaQuality: 80,
		        compressionMethod: 6,
		        segments: 4,
		        psnr: 42,
		        sns: 50,
		        filterStrength: 40,
		        filterSharpness: 3,
		        simpleFilter: true,
		        partitionLimit: 50,
		        analysisPass: 6,
		        multiThreading: true,
		        lowMemory: false,
		        alphaMethod: 0,
		        alphaFilter: 'best',
		        alphaCleanup: true,
		        noAlpha: false,
		        lossless: false
		      }
			},
			jpeg: {
				files:[{
					expand: true,
					cwd: "../before/images/",
					src: "*.jpg",
					dest: "images/webp/"
				}],
		      options: {
        		binpath: "../after/cwebp.exe",
		        preset: 'photo',
		        verbose: false,
		        quality: 80,
		        alphaQuality: 80,
		        compressionMethod: 6,
		        segments: 4,
		        psnr: 42,
		        sns: 50,
		        filterStrength: 40,
		        filterSharpness: 3,
		        simpleFilter: true,
		        partitionLimit: 50,
		        analysisPass: 6,
		        multiThreading: true,
		        lowMemory: false,
		        alphaMethod: 0,
		        alphaFilter: 'best',
		        alphaCleanup: false,
		        noAlpha: true,
		        lossless: false
		      }
			}
		},
		// Stage 2 - Minify the CSS
		cssmin: {
			target: {
				files: [{ 
					src: ['../before/css/material-design.css', '../before/css/site.css'], dest: 'css/result.min.css' }
				]}
		},
		// Extract the critical CSS
		critical: {
			dist: {
				options: {
					base: './',
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
					 'index.html': ['index.html'],
					 'about.html': ['about.html'],
					 'contact.html': ['contact.html'],
					 'product.html': ['product.html'],
					 'products.html': ['products.html']
				}
			}
		},
		// Stage 3 -  Minify the JavaScript
		uglify: {
			dist: {
				files: [{
					expand: true,
					cwd: '../before/scripts',
					src: ['*.js', '!*.min.js'],
					dest: 'scripts',
					ext: '.min.js'
				}]
			}
		},
		// Rewrite the minifed stuff into the processed HTML file
		processhtml: {
			dist: {
				files: [{
					expand: true,
					cwd: 'html/',
					src: ['*.html'],
					dest: './',
					ext: '.html'
				}]
			}
		},
		pagespeed: {
			options: {
				nokey: true,
				url: "http://rposbo.github.io"
			},
			prod: {
				options: {
					url: "http://rposbo.github.io/bulky-bricks-inc/stage3/index.html",
					locale: "en_GB",
					strategy: "desktop",
					threshold: 60
				}
			}
		}
	});

grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-webp');
grunt.loadNpmTasks('grunt-pagespeed');
grunt.loadNpmTasks('grunt-critical');
grunt.loadNpmTasks('grunt-processhtml');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('test', ['pagespeed']);
grunt.registerTask('default', ['cssmin', 'uglify', 'processhtml', 'critical']);
//grunt.registerTask('default', ['cssmin', 'imagemin','webp:jpeg', 'webp:png', 'uglify', 'processhtml', 'critical']);

};
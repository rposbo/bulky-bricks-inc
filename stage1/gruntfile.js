module.exports = function(grunt) {

	var imageminMozjpeg = require('imagemin-mozjpeg');

	grunt.initConfig({
		//Stage 1 - Image minification
		imagemin: {
			dist: {
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
		        verbose: true,
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
		        verbose: true,
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
		responsive_images: {
		  images: {
		    options: {
					engine: 'im',
		      sizes: [
						{
		        name: 'medium',
		        width: 300,
						quality: 90,
						upscale: false
		      },{
		        name: 'large',
		        width: 500,
						quality: 90,
						upscale: false
		      }]
		    },
				files: {
		    'images/tie-fighter.jpg': '../before/images/tie-fighter-large.jpg'
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
					url: "http://rposbo.github.io/bulky-bricks-inc/stage1/index.html",
					locale: "en_GB",
					strategy: "desktop",
					threshold: 60
				}
			}
		}
	});

grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-webp');
grunt.loadNpmTasks('grunt-responsive-images');
grunt.loadNpmTasks('grunt-pagespeed');

grunt.registerTask('test', ['pagespeed']);
grunt.registerTask('default', ['responsive_images', 'imagemin', 'webp']);
};

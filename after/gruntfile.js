module.exports = function(grunt) {

	grunt.initConfig({
		// Minify the CSS
		cssmin: {
			target: {
				files: [
					{ src: ['css/material-design.css', 'css/site.css'], dest: 'css/result.min.css' }
				]
			}
		},
		// Image minification
		// imagemin: {
		//   dynamic: {
		//     files: [{
		//       expand: true,
		//       cwd: 'images/',
		//       src: ['**/*.{png,jpg,gif}'],
		//       dest: 'images/dist/'
		//     }]
		//   }
		// },
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
					'images/dist/logo.svg': 'images/logo.svg'
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
					threshold: 80
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-pagespeed');

	grunt.registerTask('default', ['pagespeed', 'cssmin', 'svgmin']);

};

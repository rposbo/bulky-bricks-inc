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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-pagespeed');

	grunt.registerTask('default', ['pagespeed', 'cssmin', 'svgmin']);

};

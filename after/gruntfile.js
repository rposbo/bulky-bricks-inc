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
htmlmin: {                                     // Task 
    build: {                                      // Target 
        options: {                                 // Target options 
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
  perfbudget: {
  	default: {
  		options: {
  			url: 'http://google.com',
  			key: 'AIzaSyDA3hMmqJaXRcnnZ83vRBV7K5eLTUWwuoA'
  		}
  	}
  }
});

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-perfbudget');

	grunt.registerTask('default', ['cssmin','uglify','htmlmin', 'svgmin', 'perfbudget']);

};

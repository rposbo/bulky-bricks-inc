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
  imagemin: {                          
    dynamic: {                        
      files: [{
        expand: true,                 
        cwd: 'images/',                  
        src: ['**/*.{png,jpg,gif}'],   
        dest: 'images/dist/'                  
      }]
    }
  }

});

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['cssmin', 'imagemin']);

};
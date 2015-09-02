module.exports = function(grunt) {

  grunt.initConfig({
   // Minify the CSS
   cssmin: {
    target: {
      files: [
      { src: ['css/material-design.css', 'css/site.css'], dest: 'css/result.min.css' }
      ]
    }
  }
});

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['cssmin']);

};
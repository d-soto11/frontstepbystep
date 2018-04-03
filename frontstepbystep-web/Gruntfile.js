module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      ngdocs: {
        all: ['src/main/webapp/src/**/*.js']
      }
    });
  
    grunt.loadNpmTasks('grunt-ngdocs');
  
    // Default task(s).
    grunt.registerTask('default', ['ngdocs']);
  
  };
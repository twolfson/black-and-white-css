/*global module: true*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Lint options
    lint: {
      files: ['grunt.js']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        // Our library
        computedStyle: true,

        // Mocha
        describe: true,
        it: true,
        before: true,
        after: true
      }
    }
  });

  // Load in grunt-templater, grunt-text-replace, and grunt-jsmin-sourcemap
  grunt.loadNpmTasks('grunt-templater');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-jsmin-sourcemap');

  // Build task
  grunt.registerTask('build', 'jsmin-sourcemap replace template');

  // Default task.
  grunt.registerTask('default', 'lint build');

};

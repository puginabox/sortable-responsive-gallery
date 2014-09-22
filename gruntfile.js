module.exports = function (grunt) {
     grunt.loadNpmTasks('grunt-contrib-uglify'); // load uglify plugin
     grunt.loadNpmTasks('grunt-contrib-watch'); // load watch plugin
     grunt.loadNpmTasks('grunt-contrib-compass'); // load compass plugin
     grunt.initConfig({

          //======================================= Compress all js files in components dir ============|    
          uglify: {
               my_target: {
                    files: {
                         'js/behavior.js': ['dev/js/*.js']
                    } //files
               } //my_target
          },
          //===================================================== Compass loads =========================|    
          compass: {
               dev: {
                    options: {
                         config: 'config.rb' // the compass config file
                    } //options
               } //dev
          }, //compass
          //====================================================== watch it all ==========================|
          watch: {
               options: {
                    livereload: true
               },
               scripts: {
                    files: ['dev/js/*.js'], // files to be watched
                    tasks: ['uglify'] //  tasks to run on change
               }, //scriptS
               //====================================================== Sass pre-processing ===================|      
               sass: {
                    files: ['dev/sass/*.scss'],
                    tasks: ['compass:dev']
               }, //sass
               //============================================== watch for html page changes ===================|        
               html: {
                    files: ['*.html'] // this gruntfile is in the same dir as html pages
               }



          } //watch
     }) //initConfig
     //=================================== initial task (watch) when grunt starts ===================|    
     grunt.registerTask('default', 'watch');
} //exports
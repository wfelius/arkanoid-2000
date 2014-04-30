module.exports = function(grunt){


	// include all npm tasks
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);


	// init grunt
	grunt.initConfig({

		// see package file for development dependencies
		pkg: grunt.file.readJSON('package.json'),

		uglify:{
			
			app:
			{
				options:
				{
					mangle: false, // rename functions?
					compress: {
        				drop_console: true
      				}
				},
				
				files:
				{
					'public/js/main.min.js': ['assets/js/**/*.js', 'assets/js/*.js'],
				}
			},
			/*
			plugins:
			{
				options:
				{
					mangle: false,
				},
				
				files:
				{
					'build/js/plugins.min.js': 'js/plugins/*.js',
				}
			}*/
		},


		// setup css minimal css repetition task
		cssc: {
			build: {
				options: {
					consolidateViaDeclarations: true,
					consolidateViaSelectors:    true,
					consolidateMediaQueries:    true
				},
				files: {
					'public/css/style.min.css': 'public/css/style.min.css'
				}
			}
		},


		// setup css minifyer task
		cssmin: {
			build: {
				src: 'public/css/style.min.css',
				dest: 'public/css/style.min.css'
		    }
		},


		// setup sass compiler task
		sass: {
			compressed: 
			{
				options: {
					style: 'compressed',
					sourcemap: false,
					trace: true
				},
				files: {
					'public/css/style.min.css': 'assets/scss/style.scss'
				}
			},
			normal: 
			{
				options: {
					style: 'nested',
					sourcemap: true,
					trace: true
				},
				files: {
					'public/css/style.max.css': 'assets/scss/style.scss'
				}
			}
		},

		/*
		less: {
			compressed: 
			{
				options:
				{
					compress: true,
					cleancss: true,
					sourcemap: true
				},
				files: {
					"build/style/style.min.css": "style/less/style.less"
				}
			},
            
			normal: {
				options:
				{
					compress: false,
					cleancss: false,
					sourcemap: true
				},
				files: {
					"style/css/style.css": "style/less/style.less"
				}
			}
		},
		*/


        // minify images
        imagemin:
		{
			style_images: 
			{
		   		files: [{
					optimizationLevel: 3,
					expand: true,
					cwd: 'style/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/style/img/'
			 	}]
			},

			all: 
			{
				files: [{
					optimizationLevel: 3,
					expand: true,
					cwd: 'assets/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'public/img/'
				}]
			}
		},


		// setup watch tasks
		watch:
		{
			jsApp: 
			{
				files: ['assets/js/**/*.js'],
				tasks: ['uglify:app']
			},
			/*
			jsPlugins:
			{
				files: ['js/plugins/*.js'],
				task: ['uglify:plugins']
			},
			*/

			sass: {
				files: ['assets/scss/*.scss'],
				tasks: ['buildsass']
			},

			livereload: {
				options: { livereload: true },
				files: ['build/**/*'],
		    }
		}


	});

	// register all npm tasks
	grunt.registerTask('default', []);
	grunt.registerTask('buildsass',  ['sass', 'cssc', 'cssmin']);
	// grunt.registerTask('buildless',  ['less', 'cssc', 'cssmin']);
 

};
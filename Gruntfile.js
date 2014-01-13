module.exports = function(grunt) {
	var message = grunt.option('message') || 'no commit message :(';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ["./**/*.js"],
			options: {
				ignores: ["./node_modules/**/*.js", "./coverage/**/*.js", "./src/**/*.min.js"]
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		coverage: {
			options: {
				thresholds: {
					'statements': 100,
					'branches': 100,
					'lines': 100,
					'functions': 100
				},
				dir: 'coverage',
				root: ''
			}
		},
		uglify: {
			minify: {
				files: {
					'src/pageboy.min.js': ['src/pageboy.js']
				}
			}
		},
		gitcommit: {
			your_target: {
				options:{
					message: message
				},
				src: ['.']
			}
		}, 
		shell: {
			git_push: {
				command: 'git push'
			},
			delete_coverage_reports : {
				command: 'rm -r coverage'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-istanbul-coverage');

	grunt.registerTask('test', ['jshint', 'karma', 'coverage', 'shell:delete_coverage_reports']);
	grunt.registerTask('default',['test', 'uglify:minify', 'gitcommit', 'shell:git_push']);
};
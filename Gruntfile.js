module.exports = function(grunt) {
	var message = grunt.option('message') || 'no commit message :(';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ["./**/*.js"],
			options: {
				ignores: ["./node_modules/**/*.js", "./coverage/**/*.js"]
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
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
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('test', ['jshint', 'karma']);
	grunt.registerTask('default',['test','gitcommit', 'shell:git_push']);
};
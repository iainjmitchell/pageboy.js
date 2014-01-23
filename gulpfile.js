var gulp = require('gulp'),
	karma = require('gulp-karma'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	git = require('gulp-git');

gulp.task('clean', function(){
	return gulp
		.src('coverage')
		.pipe(clean());
});

gulp.task('jshint', function(){
	return gulp
		.src(['src/pageboy.js', 'tests/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', ['clean'], function () {
	var karmaRun = karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}),
		files = [
			'bower_components/jquery/jquery.min.js',
        	'src/**/*.js',
        	'tests/**/*.html',
        	'tests/**/*.js'
		];

	return gulp
		.src(files)
		.pipe(karmaRun);
});

gulp.task('test', ['jshint', 'mocha']);

gulp.task('minify', function(){
	return gulp
		.src('src/pageboy.js')
    	.pipe(uglify())
    	.pipe(rename('pageboy.min.js'))
    	.pipe(gulp.dest('src'));
});

gulp.task('push', ['test', 'minify'], function(){
	var commitMessage = gulp.env.message || 'no commit message';
	console.log('Tests passed! Pushing code...');
	return gulp
		.src('./.')
		.pipe(git.add())
		.pipe(git.commit(commitMessage))
		.pipe(git.push());
});

gulp.task('default', ['push']);
'use strict';

const gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	pug = require('gulp-pug');

const CONFIG = {
	src: {
		pug: 'src/pug/**.pug'
	},
	out: {
		html: './public'
	}
}

gulp.task('pug2html', () => {
	gulp.src(CONFIG.src.pug)
		.pipe($.pug())
		.pipe(gulp.dest(CONFIG.out.html))
});

gulp.task('myapp', (cb) => {
	var started = false;
	return $.nodemon({
		script: 'app.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('default', ['pug2html', 'myapp']);

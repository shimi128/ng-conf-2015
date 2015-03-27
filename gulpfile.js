/* Gulpfile for NG-CON Israel Website */
/* Provides SASS + Livereload functions */
/* Copyright (C) 2014, Uri Shaked. License: ISC */

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	livereload = require('gulp-livereload'),
	connectLivereload = require('connect-livereload'),
	open = require('open'),
	express = require('express');

var serverPort = process.env.GDG_DEVSERVER_PORT || 7000;
var livereloadPort = process.env.GDG_LIVERELOAD_PORT || 35730;

var paths = {
	styles: 'src/*.scss',
	dist: 'web'
};

gulp.task('sass', function () {
	gulp.src(paths.styles)
		.pipe(plumber())
		.pipe(sass())
		.pipe(prefix())
		.pipe(gulp.dest(paths.dist))
});

gulp.task('imagemin', function () {
	gulp.src(paths.images)
		.pipe(imagemin())
		.pipe(gulp.dest('images'));
});

gulp.task('serve', ['sass'], function () {
	var server = express();
	server.use(connectLivereload({
		port: livereloadPort
	}));
	server.use(express.static(paths.dist));
	server.listen(serverPort, function () {
		console.log('Listening on ' + serverPort);
		open('http://localhost:' + serverPort);
	});
});

gulp.task('watch', function () {
	var lrserver = livereload.listen(livereloadPort);

	gulp.watch(paths.styles, ['sass']);

	gulp.watch(paths.dist + '/**')
		.on('change', function (path) {
			livereload.changed(path, lrserver);
		}
	);
});

gulp.task('default', ['serve', 'watch']);

var gulp = require('gulp');

// Gulp libs
var rimraf    = require('gulp-rimraf');
var prefix    = require('gulp-autoprefixer');
var svgSprite = require("gulp-svg-sprites");


// CONFIG ----------------------------------

var dest = 'dist/';

var paths = {
  html:    ['index.html'],
  fonts:   ['fonts/*'],
  images:  ['img/*'],
  scripts: ['js/*'],
  extras:  ['humans.txt', 'favicon.ico']
};


// TASKS -----------------------------------
// TODO: gulp-svgmin, gulp-svg-sprites, gulp-svg2png

// Delete /dist folder
gulp.task('clean', function() {
  return gulp.src(dest, { read: false }) // much faster
    .pipe(rimraf());
});

// Prefix
gulp.task('autoprefixer', ['clean'], function() {
  return gulp.src('./css/*.css')
    .pipe(prefix('last 2 version', 'ie 9'))
    .pipe(gulp.dest(dest + 'css/'));
});

// Copy static files
var pathsAll = paths.html
                .concat(paths.fonts)
                .concat(paths.images)
                .concat(paths.scripts)
                .concat(paths.extras);

gulp.task('copy', ['clean'], function() {
  return gulp.src(pathsAll, {cwd: './**'})
    .pipe(gulp.dest(dest));
});

// SVG sprites
gulp.task('sprites', ['clean'], function () {
    return gulp.src('assets/svg/*.svg')
        .pipe(svgSprite())
        .pipe(gulp.dest(dest + "assets/"));
});


// Default task
gulp.task('default', ['autoprefixer','sprites','copy']);

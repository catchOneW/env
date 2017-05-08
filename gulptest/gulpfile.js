'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    SSI         = require('browsersync-ssi'),
    concat      = require('gulp-concat'),
    minify      = require('gulp-minify'),
    plumber     = require('gulp-plumber'),
    sass        = require('gulp-sass'),
    zip         = require('gulp-zip');

var mocha = require('gulp-mocha');

    gulp.task('serve', function() {

    browserSync.init({
        server: {
            baseDir:["./dist"],
            middleware:SSI({
                baseDir:'./dist',
                ext:'.shtml',
                version:'2.10.0'
            })
        }
    });

    gulp.watch("app/scss/**/*.scss", ['sass']);
    gulp.watch("app/scripts/**/*.js", ['js']);
    gulp.watch("app/**/*.html", ['html']);
    gulp.watch("dist/**/*.html").on("change",browserSync.reload);
});

gulp.task('sass', function() {
    
    return gulp.src("app/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sass({outputStyle:"compact"}))
        .pipe(gulp.dest("dist/styles"))
        .pipe(browserSync.stream());
});

gulp.task('js', function(){
    return gulp.src('app/scripts/**/*.js')
        .pipe(plumber())
        .pipe(minify())
        .pipe(gulp.dest("dist/scripts"))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    
    return gulp.src("app/*.html")
        .pipe(plumber())        
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
});

gulp.task('publish', function(){
    return gulp.src('dist/**/*')
        .pipe(plumber())
        .pipe(zip('publish.zip'))
        .pipe(gulp.dest('release'))
});


// gulp.task('default', ['html','js','serve']);

gulp.task('default', function() {
  return gulp.src('test.js')
    .pipe(mocha())
    .once('error', function () {
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
});
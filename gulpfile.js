var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
const template = require('gulp-template');
var browserify = require('gulp-browserify');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "../vov/dist"
    });

    gulp.watch("../vov/scss/**/*.scss", ['sass']);
    gulp.watch("../vov/js/*.js", ['scripts']);
    gulp.watch("../vov/index.html", ['html']);
    gulp.watch("../vov/**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("../vov/scss/**/*.scss")
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(gulp.dest("../vov/dist/css"))
        .pipe(browserSync.stream());
});

// Basic usage 
gulp.task('scripts', function() {
    // Single entry point to browserify 
    gulp.src('../vov/js/*.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gutil.env.production
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('html', () =>
    gulp.src('../vov/index.html')
        .pipe(template({name: 'vov'}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
);

gulp.task('default', ['serve']);
/**
 * Created by yaoyao on 15/2/5.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

gulp.task('bower', function () {
    gulp.src("./bower_components/handlebars/handlebars.min.js")
        .pipe(gulp.dest("./public/javascripts/"));

    gulp.src("./bower_components/bootstrap/dist/js/bootstrap.min.js")
        .pipe(gulp.dest("./public/javascripts/"));

    gulp.src("./bower_components/jquery/dist/jquery.min.js")
        .pipe(gulp.dest("./public/javascripts/"));

    gulp.src("./bower_components/jquery/dist/jquery.min.map")
        .pipe(gulp.dest("./public/javascripts/"));

    gulp.src("./bower_components/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest("./public/stylesheets/"));

    gulp.src("./bower_components/bootstrap/dist/fonts/*")
        .pipe(gulp.dest("./public/fonts/"));
});

gulp.task('min', function () {
    gulp.src("./public/javascripts/layout.js")
        .pipe(uglify())
        .pipe(rename('layout.min.js'))
        .pipe(gulp.dest("./public/javascripts/"));

    gulp.src("./public/javascripts/users.js")
        .pipe(uglify())
        .pipe(rename('users.min.js'))
        .pipe(gulp.dest("./public/javascripts/"));

    gulp.src("./public/stylesheets/layout.css")
        .pipe(minifyCSS())
        .pipe(rename('layout.min.css'))
        .pipe(gulp.dest("./public/stylesheets/"));

    gulp.src("./public/stylesheets/users.css")
        .pipe(minifyCSS())
        .pipe(rename('users.min.css'))
        .pipe(gulp.dest("./public/stylesheets/"));
});

gulp.task('default', ['bower', 'min']);
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify-es').default;
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var wait = require('gulp-wait');
var babel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');

gulp.task('sass', function () {
    return gulp
        .src('assets/sass/**/*.scss')
        .pipe(wait(700))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('assets/css'))
        .pipe(cssnano({ zindex: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/css'))
});

gulp.task("compilejs", function() {
  return gulp
    .src("assets/js/main/*.js")
    .pipe(wait(400))
    .pipe(babel({ presets: ["es2015", "stage-3"] }))
    .pipe(gulp.dest("assets/js/es5"))
    .pipe(gulpIf("*.js", uglify()))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("assets/js/es5"))
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: 'index.html'
    });
});
function browserSyncInit(done) {
  browserSync.init({
    server: {
      // baseDir: '/'
    },
    startPath: "index.html"
  });
  done();
}
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

gulp.task('minifycss', function () {
    return gulp.src('assets/css/**/*')
        .pipe(gulpIf('*.css', cssnano({ zindex: false })))
        .pipe(gulp.dest('assets/css'))
});

function watchFiles() {
  gulp.watch("assets/sass/**/*.scss", gulp.series("sass", browserSyncReload));
  gulp.watch("assets/js/main/*.js", gulp.series("compilejs", browserSyncReload));
  gulp.watch("*.html", gulp.parallel(browserSyncReload));
}

gulp.task("default", gulp.series("sass", "compilejs", browserSyncInit, watchFiles));

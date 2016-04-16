var gulp = require('gulp'),
  pug = require('gulp-pug'),
  plumber = require('gulp-plumber'),
  stylus = require('gulp-stylus'),
  ghPages = require('gulp-gh-pages'),
  browserSync = require('browser-sync').create();


gulp.task('html', function() {
  return gulp.src('*.jade')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build/'))
});

gulp.task('css', function () {
  return gulp.src('stylesheets/main.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('build/css/'));
});

gulp.task('copy', function() {
   return gulp.src('img/*.{png,jpg}')
   .pipe(gulp.dest('build/img/'));
});

gulp.task('html-watch', ['html']);
gulp.task('css-watch', ['css']);

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('serve', ['html', 'copy', 'css'], function() {
  // Static server
  browserSync.init({
    server: {
      baseDir: "build"
    }
  });

  gulp.watch('*.jade', ['html-watch']).on('change', browserSync.reload);
  gulp.watch('blocks/**/*.styl', ['css-watch']).on('change', browserSync.reload);
});

gulp.task('default', ['serve'], function() {
});

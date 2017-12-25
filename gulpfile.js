'use strict';

const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return (gulp
      .src('styles/stylesheet.sass')
      .pipe(
        sass().on('error', sass.logError)
      )
      .pipe(
        autoprefixer({
          browsers: ['last 15 versions'],
          cascade: false
        })
      )
      .pipe(gulp.dest('styles')) );
});

gulp.task('build', gulp.series('sass'));

gulp.task('watch', function() {
  gulp.watch('styles/**/*.sass', gulp.series('sass'));
});

gulp.task('default', gulp.series('build', gulp.parallel('watch')));

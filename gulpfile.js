var gulp = require('gulp'),
    less = require('gulp-less'),
    server = require('gulp-server-livereload'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({ browsers: ["last 6 versions"] });

gulp.task('styles', function () {
  return gulp.src('src/styles/style.less')
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest('assets/styles/'));
});


gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(['src/styles/**'], ['styles']);
});

gulp.task('default', ['styles', 'webserver', 'watch']);

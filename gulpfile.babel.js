import gulp from 'gulp'
import babel from 'gulp-babel'
import nodemon from 'gulp-nodemon'
import sequence from 'run-sequence'

gulp.task('compile', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('copy', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['compile'])
  gulp.watch('src/**/*.html', ['copy', 'compile'])
})

gulp.task('start', () => {
  nodemon({
    watch: 'dist',
    script: 'dist/index.js',
    ext: 'js',
    env: { NODE_ENV: 'development' }
  })
})

gulp.task('default', (callback) => {
  sequence(['compile', 'copy', 'watch'], 'start', callback)
})
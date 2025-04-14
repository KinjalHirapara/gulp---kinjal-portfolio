const gulp = require('gulp');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');

// Minify JavaScript
gulp.task('minify-js', () => {
  return gulp.src('src/js/*.js') // Input files
    .pipe(terser())             // Minify
    .pipe(gulp.dest('dist/js')); // Output folder
});

// Minify CSS
gulp.task('minify-css', () => {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});



gulp.task('copy-plugins', () => {
  return gulp.src('src/plugins/**/*', {encoding: false})
    .pipe(gulp.dest('dist/plugins'));
});

gulp.task('copy-themes', () => {
  return gulp.src('src/themes/**/*', {encoding: false})
    .pipe(gulp.dest('dist/themes'));
});

gulp.task('images', async () => {
  const imagemin = (await import('gulp-imagemin')).default;
  return gulp.src('src/images/**/*', {encoding: false})
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}); 

// Update HTML image paths
gulp.task('update-html-paths', () => {
  return gulp.src('src/*.html') // Match HTML files directly in src/
    .pipe(replace('images/', 'images/')) // Update paths if needed
    .pipe(gulp.dest('dist'));  // Save updated HTML files directly into dist/
});

// Minify HTML
gulp.task('minify-html', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('src/js/*.js', gulp.series('minify-js'));
    gulp.watch('src/css/*.css', gulp.series('minify-css'));
    gulp.watch('src/*.html', gulp.series('minify-html'));
    gulp.watch('src/images/**/*', gulp.series('images'));
  });




// Default Task
gulp.task('default', gulp.parallel('minify-js', 'minify-css', 'minify-html', 'copy-plugins', 'copy-themes', 'images', 'update-html-paths','watch'));

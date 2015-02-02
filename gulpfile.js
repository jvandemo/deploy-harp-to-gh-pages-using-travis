var gulp = require('gulp'),
  karma = require('karma').server,
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  less = require('gulp-less'),
  gutil = require('gulp-util'),
  minifyCSS = require('gulp-minify-css'),
  livereload = require('gulp-livereload'),
  shell = require('gulp-shell'),
  sourceJavaScriptFiles = [
    'public/**/_build/**/*.module.js',
    'public/**/_build/**/*.js',
    '!public/**/_build/**/*.spec.js'
  ],
  sourceLessFiles = [
    'public/**/_build/**/*.less',
    'public/**/_build/**/_*.less'
  ],
  bowerDirectory = './bower_components';

/**
 * Build JavaScript library
 *
 * Searches all _build directories in the public directory
 * and concatenates all JavaScript files and concatenates them to:
 *
 * public/build/js/app.js
 * public/build/js/app.min.js
 *
 */
gulp.task('build-js', function () {
  gulp.src(sourceJavaScriptFiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/build/js/'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('public/build/js/'))
});

/**
 * Build CSS files into:
 *
 * public/build/css/app.css
 * public/build/css/app.min.css
 */
gulp.task('build-css', function () {
  return gulp.src(sourceLessFiles)
    .pipe(less())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/build/css/'))
    .pipe(minifyCSS())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('public/build/css/'))
    .on('error', gutil.log);
});

/**
 * Validate JavaScript
 */

gulp.task('jshint-src-js', function () {
  gulp.src(sourceJavaScriptFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
});

/**
 * Copy vendor files to their correct location
 */
gulp.task('copy-vendor-files', function () {

  gulp
    .src(bowerDirectory + '/jquery/dist/**/*.*')
    .pipe(gulp.dest('./public/vendor/jquery/'))

  gulp
    .src(bowerDirectory + '/html5shiv/dist/**/*.*')
    .pipe(gulp.dest('./public/vendor/html5shiv/'))

  gulp
    .src([
        bowerDirectory + '/angular/angular.js',
        bowerDirectory + '/angular/angular.min.js',
        bowerDirectory + '/angular/angular.min.js.zip',
        bowerDirectory + '/angular/angular.min.js.map',
        bowerDirectory + '/angular/angular-csp.css'
    ])
    .pipe(gulp.dest('./public/vendor/angular/'))

  gulp
    .src([
        bowerDirectory + '/angular-resource/angular-resource.js',
        bowerDirectory + '/angular-resource/angular-resource.min.js',
        bowerDirectory + '/angular-resource/angular-resource.min.js.map'

    ])
    .pipe(gulp.dest('./public/vendor/angular-resource/'))

  gulp
    .src([
        bowerDirectory + '/angular-resource/angular-resource.js',
        bowerDirectory + '/angular-resource/angular-resource.min.js',
        bowerDirectory + '/angular-resource/angular-resource.min.js.map'

    ])
    .pipe(gulp.dest('./public/vendor/angular-resource/'))

  gulp
    .src([
        bowerDirectory + '/ui-router/release/angular-ui-router.js',
        bowerDirectory + '/ui-router/release/angular-ui-router.min.js'
    ])
    .pipe(gulp.dest('./public/vendor/ui-router/'))

});

/**
 * Run test once and exit
 */
gulp.task('test-src-js', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run tests on every change
 */
gulp.task('test', function(){
  gulp.watch(sourceJavaScriptFiles, ['test-src-js']);
});

/**
 * Build api documentation
 */
gulp.task('docs', shell.task([
    'node node_modules/angular-jsdoc/node_modules/jsdoc/jsdoc.js' +
    ' -c node_modules/angular-jsdoc/conf.json ' +
    ' -t node_modules/angular-jsdoc/template ' +
    ' -d api-docs ' +
    ' -r public'
]));

/**
 * Task for different parts of the build process
 */
gulp.task('process-all', ['process-js', 'process-css', 'process-vendor-files']);
gulp.task('process-js', ['jshint-src-js', 'test-src-js', 'build-js']);
gulp.task('process-css', ['build-css']);
gulp.task('process-vendor-files', ['copy-vendor-files']);

/**
 * Watch task for default task
 */
gulp.task('watch', function () {
  var server = livereload();
  gulp.watch(sourceJavaScriptFiles, ['process-js']);
  gulp.watch(sourceLessFiles, ['process-css']);
  gulp
    .watch(['public/**', '!public/**/_build/**'])
    .on('change', function (file) {
      server.changed(file.path);
    })
    .on('added', function (file) {
      server.changed(file.path);
    })
    .on('deleted', function (file) {
      server.changed(file.path);
    });
});

/**
 * Default task
 */
gulp.task('default', ['watch', 'process-all']);
var path = require('path');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var sequence = require('gulp-sequence');
var webserver = require('gulp-webserver');
var minifycss = require('gulp-minify-css');
var del = require('del');

var argv = require('yargs').argv;

// Check for --production flag
var isProduction = !!(argv.production);
var dst = './server';
var port = 8001;

var paths = {
  scripts: {
    client: ['./src/public/js/**/*.js']
    , server: ['./src/**/*.js', '!./src/public/**/*.js']
  }
  , css: ['./src/public/css/**/*.css']
  , jade: ['./src/**/*.jade']
  , static: [
    './src/**/*.html'
    , './src/**/*.png'
    , './src/**/*.json'
   ]
  , libs: {
    JS: [
      './bower_components/jquery/dist/jquery.js'
      , './bower_components/handlebars/handlebars.js'
      //, './bower_components/jqueryui/ui/core.js'
      , './bower_components/bootstrap/dist/js/bootstrap.js'
      , './bower_components/modernizr/modernizr.js'
      //, './bower_components/shufflejs/dist/jquery.shuffle.js'
      , './src/public/libs/**/*.js'
    ]
    , CSS: [
      './bower_components/bootstrap/dist/css/bootstrap.css'
      , './bower_components/font-awesome/css/font-awesome.css'
      , './src/public/libs/**/*.css'
    ]
    , FONTS: [
      './bower_components/font-awesome/fonts/*.*'
    ]
  }
};

/***************************************************************/

gulp.task('libs:JS', function() {
  return gulp.src(paths.libs.JS)
    .pipe(gulpif(isProduction, uglify()))
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(path.join(dst, 'public/libs/js/')))
  ;
});

gulp.task('libs:CSS', function() {
  return gulp.src(paths.libs.CSS)
    .pipe(gulpif(isProduction, minifycss()))
    .pipe(concat('libs.css'))
    .pipe(gulp.dest(path.join(dst, 'public/libs/css/')))
  ;
});

gulp.task('libs:FONTS', function() {
  return gulp.src(paths.libs.FONTS)
    .pipe(gulp.dest(path.join(dst, 'public/libs/fonts/')))
  ;
});

/***************************************************************/

gulp.task('libs', sequence(['libs:JS', 'libs:CSS', 'libs:FONTS']));

gulp.task('jade', function() {
  return gulp.src(paths.jade)
    .pipe(gulp.dest(dst))
  ;
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(gulpif(isProduction, minifycss()))
    .pipe(concat('custom.css'))
    .pipe(gulp.dest(path.join(dst, 'public/css/')))
  ;
});

gulp.task('js:client', function() {
  return gulp.src(paths.scripts.client)
    .pipe(gulpif(isProduction, uglify()))
    .pipe(concat('custom.js'))
    .pipe(gulp.dest(path.join(dst, 'public/js/')))
  ;
});

gulp.task('js:server', function() {
  return gulp.src(paths.scripts.server)
    .pipe(gulpif(isProduction, uglify()))
    //.pipe(concat('custom.js'))
    .pipe(gulp.dest(dst))
  ;
});

gulp.task('copy', function() {
  gulp.src(paths.static)
    .pipe(gulp.dest(path.join(dst, 'public/')));
});

/***************************************************************/

gulp.task('public', sequence(['libs', 'css', 'js:client'])); // to public folder (js, css, static stuff like pdf or images)
gulp.task('server', sequence(['jade', 'copy', 'js:server'])); // to server folder (jade, express.js)

/***************************************************************/

gulp.task('default', sequence(['public', 'server']));

/***************************************************************/

gulp.task('clean', function(cb) { 
  return del([dst]);
});

/***************************************************************/

gulp.task('rebuild', sequence('clean', 'default'));

/***************************************************************/

// Starts a test server, which you can view at http://localhost:port
// actually unused, because we're making our own express server
gulp.task('run', ['default'], function() {
  gulp.src(path.join(dst, 'public'))
    .pipe(webserver({
      port: port,
      host: 'localhost',
      fallback: 'index.html',
      livereload: true,
      open: true
    }))
  ;
});

/***************************************************************/

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('watch', ['default'], function () {
  gulp.watch(paths.scripts.client, ['js:client']);
  gulp.watch(paths.scripts.server, ['js:server']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.static, ['copy']);
});

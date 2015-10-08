var gulp = require('gulp');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var sequence = require('gulp-sequence');
var webserver = require('gulp-webserver');
var minifycss = require('gulp-minify-css');
// gulp-autoprefixer
//var rimraf = require('rimraf');
var del = require('del');

var argv = require('yargs').argv;

// Check for --production flag
var isProduction = !!(argv.production);
var dst = {
  public: './server/public'
  , views: './server/views'
};
var port = 8001;

var paths = {
  scripts: ['./src/**/*.js']
  , css: ['./src/**/*.css']
  , jade: ['./src/views/**/*.jade']
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
      //, './bower_components/jqueryui/ui/widget.js'
      //, './bower_components/jqueryui/ui/mouse.js'
      //, './bower_components/jqueryui/ui/selectable.js'
      , './bower_components/bootstrap/dist/js/bootstrap.js'
      , './bower_components/modernizr/modernizr.js'
      //, './bower_components/shufflejs/dist/jquery.shuffle.js'
    ]
    , CSS: [
      './bower_components/bootstrap/dist/css/bootstrap.css'
      , './bower_components/font-awesome/css/font-awesome.css'
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
    .pipe(gulp.dest(dst.public + '/libs/js/'))
  ;
});

gulp.task('libs:CSS', function() {
  return gulp.src(paths.libs.CSS)
    .pipe(gulpif(isProduction, minifycss()))
    .pipe(concat('libs.css'))
    .pipe(gulp.dest(dst.public + '/libs/css/'))
  ;
});

gulp.task('libs:FONTS', function() {
  return gulp.src(paths.libs.FONTS)
    .pipe(gulp.dest(dst.public + '/libs/fonts/'))
  ;
});

/***************************************************************/

gulp.task('libs', sequence(['libs:JS', 'libs:CSS', 'libs:FONTS']));

gulp.task('jadex', function() {
  return gulp.src(paths.jade)
    .pipe(gulpif(isProduction, jade(), jade({ pretty: true })))
    .pipe(gulp.dest(dst.public))
  ;
});

gulp.task('jade', function() {
  return gulp.src(paths.jade)
    .pipe(gulp.dest(dst.views))
  ;
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(gulpif(isProduction, minifycss()))
    .pipe(concat('custom.css'))
    .pipe(gulp.dest(dst.public + '/css/'))
  ;
});

gulp.task('js', function() {
  return gulp.src(paths.scripts)
    .pipe(gulpif(isProduction, uglify()))
    .pipe(concat('custom.js'))
    .pipe(gulp.dest(dst.public + '/js/'))
  ;
});

gulp.task('copy', function() {
  gulp.src(paths.static)
    .pipe(gulp.dest(dst.public));
});

/***************************************************************/

gulp.task('public', sequence(['libs','css','js'])); // to public folder (js, css, static stuff)
gulp.task('server', sequence(['jade','copy'])); // to server folder (jade, express.js)

/***************************************************************/

gulp.task('default', sequence(['public', 'server']));

/***************************************************************/

gulp.task('clean', function(cb) { 
  //rimraf([dst.public, dst.views], cb); 
  //rimraf(dst.views, cb); 
  return del([dst.public+'/**', dst.views+'/**']);
});

/***************************************************************/

gulp.task('rebuild', sequence('clean', 'default'));

/***************************************************************/

// Starts a test server, which you can view at http://localhost:post
gulp.task('run', ['default'], function() {
  gulp.src(dst.public)
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
gulp.task('watch', ['run'], function () {
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.static, ['copy']);
});

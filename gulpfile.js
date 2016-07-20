var gulp = require('gulp')
var webpackStream = require('webpack-stream')
//var reload = require('./../gulp-hot-reload/src/index')
var reload = require('gulp-hot-reload')
var webpack = require('webpack')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var gutil = require('gulp-util')
var path = require('path')

const buildDone = (err, stats) => {
  if(err) throw new gutil.PluginError("webpack", err);
  gutil.log('[webpack]', stats.toString({
    colors: true,
    chunkModules: false,
    assets: false,
    version: false,
    hash: false
  }))
}

var serverConfig = require('./webpack.server.config.js')
var frontendConfig = require('./webpack.config.js')

gulp.task('build-backend', () => {
  gulp
    .src('./src/server.js')
    .pipe(webpackStream(serverConfig, webpack, buildDone))
    .pipe(reload({
      port: 1337,
      react: true,
      config: path.join(__dirname, 'webpack.config.js')
    }))
})

gulp.task('build-styles', function () {
  gulp
    .src('./src/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/'))
})

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['build-backend'])
  gulp.watch('src/**/*.scss', ['build-styles'])
})

gulp.task('dist-backend', function () {
  process.env.NODE_ENV = 'production'
  gulp
    .src('./src/server.js')
    .pipe(webpackStream(serverConfig, webpack, buildDone))
    .pipe(gulp.dest('build'))
})

gulp.task('dist-frontend', ['build-styles'], function () {
  process.env.NODE_ENV = 'production'
  gulp
    .src('./src/application.js')
    .pipe(webpackStream(frontendConfig, webpack, buildDone))
    .pipe(gulp.dest('build/static'))
})

gulp.task('dist', ['dist-backend', 'dist-frontend'], function() {

})

gulp.task('default', ['build-backend', 'build-styles', 'watch'], function () {
  gutil.log('watch')
})

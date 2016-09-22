import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import clean from 'gulp-clean';
import apidoc from 'gulp-apidoc';
import nodemon from 'gulp-nodemon';
import runSequence from 'run-sequence';
import version from 'gulp-git-rev';
import env from 'gulp-env';
import { exec } from 'child_process';
import gutil from 'gulp-util';

gulp.task('env:prod', () => {
  env.set({ NODE_ENV: 'production' })
});

gulp.task('env:ci', () => {
  env.set({ NODE_ENV: 'ci' })
});

gulp.task('env:dev', () => {
  env.set({ NODE_ENV: 'development' })
});

const paths = {
  source: ['./server/**/*.js'],
  dest: './dist',
  docs: './docs',
  static: './static',
};

/**
 * compile es6/es7 code to es5
 */
gulp.task('babel', () => {
  let stream = gulp.src(paths.source);
  return stream.pipe(babel())
    .on('error', gutil.log)
    .pipe(gulp.dest(paths.dest));
});

/**
 * watch the source code and re-compile
 */
gulp.task('watch', ['babel', 'apidoc'], () => {
  return gulp.watch(paths.source, ['babel']);
});

/**
 * lint the source code
 */
gulp.task('lint', () => {
  return gulp.src(['server/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * clean the compiled code and api doc
 */
gulp.task('clean', function () {
  return gulp.src([paths.dest, paths.static], { read: false })
    .pipe(clean({ force: true }));
});

/**
 * generate api doc
 */
gulp.task('apidoc', function (done) {
  apidoc({
    src: paths.docs,
    dest: paths.static + '/docs',
    options: {
      debug: false,
      includeFilters: [".*\\.js$"]
    }
  }, done);
});

/**
 * create a version file
 */
gulp.task('version', function () {
  return version('version.json')
    .pipe(gulp.dest('.'));
});

gulp.task('execute', (cb) => {
  exec('node dist/migration/index.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
});

gulp.task('migrate-local', ['env:dev', 'execute']);
gulp.task('migrate-ci', ['env:ci', 'execute']);
gulp.task('migrate-prod', ['env:prod', 'execute']);

/**
 * build prod package
 */
gulp.task('prod', (cb)=> {
  runSequence('lint', 'clean', 'babel', 'version', cb);
});

/**
 * build package which including api doc
 */
gulp.task('build', (cb)=> {
  runSequence('lint', 'clean', 'babel', 'apidoc', 'version', cb);
});

const nodemonOptions = {
  script: 'dist',
  ext: 'js',
  env: { 'NODE_ENV': 'development' },
  verbose: false,
  ignore: [],
  watch: ['dist/*']
};

gulp.task('default', ['watch'], function () {
  nodemon(nodemonOptions)
    .on('restart', function () {
      console.log('server restarted!')
    });
});

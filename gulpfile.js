const { watch, src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('cssnano');
const uglify = require('gulp-uglify-es').default;
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps');

function styles() {
  return src('./src/sass/main.sass', { allowEmpty: false })
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
    .pipe(postcss([autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true,
    }), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./_site/css'))
}

function scripts() {
  return src([
    './src/js/*.js',
  ])
    // .pipe(uglify())
    .pipe(dest('./_site/js/'))
}

function watchFiles() {
  watch('**/*.sass', parallel(styles))
  watch('./src/js/**/*.js', parallel(scripts))
};

exports.build = series(styles, scripts);
exports.default = parallel(styles, scripts, watchFiles);
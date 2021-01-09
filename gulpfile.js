const {src, dest, parallel, series, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const webp = require('gulp-webp');

function browser_sync() {
  browserSync.init({
      server: {
        baseDir:"src/",
        notify: false,
        online: true,
      }
  })
}

function scripts_bandle() {
  return src([
    "js/jquery.js",
    "pluggins/**/*.js",
    "js/script.js",
  ])
  .pipe(concat("bundle.min.js"))
  .pipe(uglify())
  .pipe(dest("src/"))
  .pipe(browserSync.stream())
}

function styles_bandle() {
  return src([
    "css/general.css",
    "pluggins/**/*.css",
    "css/components/**/*.css",
  ])
  .pipe(concat("bundle.min.css"))
  .pipe(cleanCSS())
  .pipe(dest("src/"))
  .pipe(browserSync.stream())
}

function images_min() {
  return src([
    "src/media/img/source/**/*"
  ])
  .pipe(newer("src/media/img/minified/"))
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
      plugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
      ]
    })
  ]))
  .pipe(dest("src/media/img/minified/"))
}

function images_webp() {
  return src([
    "src/media/img/source/**/*.png",
    "src/media/img/source/**/*.jpg",
    "src/media/img/source/**/*.jpeg",
  ])
  .pipe(newer("src/media/img/minified/"))
  .pipe(webp())
  .pipe(dest("src/media/img/minified/"))
}

function start_watch() {
  watch(["**/*.js","!src/bundle.min.js"] , scripts_bandle);
  watch(["**/*.css","!src/bundle.min.css"] , styles_bandle);
  watch(["src/media/img/**/*"] , images_min);
  watch(["src/media/img/**/*"] , images_webp);
  watch(["**/*.html"]).on("change" , browserSync.reload)
}

exports.default = parallel(scripts_bandle, styles_bandle, browser_sync, start_watch, images_min , images_webp)
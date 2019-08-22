const { src, dest, parallel, watch } = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');

function html() {
    return src('client/templates/*.pug')
        .pipe(pug())
        .pipe(dest('build/html'))
}

function lessTask() {
    return src('client/templates/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(dest('build/css'))
}

function css() {
    return src('client/templates/*.less')
        .pipe(concat('app.min.css'))
        .pipe(minifyCSS())
        .pipe(dest('build/css'))
}

function js() {
    return src('client/javascript/*.js', { sourcemaps: false })
        .pipe(concat('app.min.js'))
        .pipe(dest('build/js', { sourcemaps: false }))
}

exports.js = js;
exports.less = lessTask;
exports.css = css;
exports.html = html;
exports.default = parallel(html, css, js);
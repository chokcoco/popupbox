var gulp = require('gulp');

// 开发插件
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');

// 文件替换
var replace = require('gulp-replace');

// 版本控制，增加 md5 戳值
var rev = require('gulp-rev-append');

// CSS 模块
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// JS 模块
var babel = require('gulp-babel');

// 输出
var output = './dist';
var resUrl = '../';

gulp.task('browser-sync', ['sass-watch', 'css-watch', 'babel-watch', 'images-watch', 'html-watch'], function() {
    browserSync.init({
        server: {
            baseDir: output
        }
    })
    gulp.watch("./src/sass/*.scss", ['sass-watch']);
    gulp.watch("./src/css/*.css", ['css-watch']);
    gulp.watch("./src/js/*.js", ['babel-watch']);
    gulp.watch("./src/images/*", ['images-watch']);
    gulp.watch("./src/html/*.html", ['html-watch']).on('change', reload);
})

gulp.task('sass-watch', function() {
    var processors = [
        autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'ios 7', 'ios 8']})
    ]
    return gulp.src("./src/sass/*.scss")
        .pipe(rev())
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(replace(/\.\.\/images\/(\S+)\.(png|jpg)/g, resUrl + 'images/$1.$2'))
        .pipe(gulp.dest("./dist/css/"))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('css-watch', function() {
    return gulp.src("./src/css/*.css")
        .pipe(rev())
        .pipe(plumber())
        .pipe(replace(/\.\.\/images\/(\S+)\.(png|jpg)/g, resUrl + 'images/$1.$2'))
        .pipe(gulp.dest("./dist/css/"))
        .pipe(reload({
            stream: true
        }));
})

gulp.task('babel-watch', function() {
    return gulp.src('./src/js/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-remove-strict-mode']
        }))
        .pipe(replace(/\.\.\/images\/(\S+)\.(png|jpg)/g, resUrl + 'images/$1.$2'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({
            stream: true
        }));
})

gulp.task('images-watch', function() {
    gulp.src('./src/images/*')
        .pipe(plumber())
        .pipe(gulp.dest('./dist/images/'))
        .pipe(reload({
            stream: true
        }));
})

gulp.task('html-watch', function() {
    gulp.src('./src/html/*.html')
        .pipe(rev())
        .pipe(replace(/\.\.\/sass\/(\S+)\.scss/g, resUrl + 'css/$1.css'))
        .pipe(replace(/\.\.\/css\/(\S+)\.css/g, resUrl + 'css/$1.css'))
        .pipe(replace(/\.\.\/js\/(\S+)\.js/g, resUrl + 'js/$1.js'))
        .pipe(replace(/\.\.\/images\/(\S+)\.(png|jpg)/g, resUrl + 'images/$1.$2'))
        .pipe(gulp.dest("./dist/html/"));
})

gulp.task('dev', ['browser-sync']);

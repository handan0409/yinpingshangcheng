const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const concat = require("gulp-concat");
const uglify = require('gulp-uglify');
const sass = require("gulp-sass-china");

//编译sass
gulp.task('sass', function () {         //把sass里的内容编译一下
    // ./   当前路径;
    // **/* 无论层级无论任何内容;
    return gulp.src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))   //没有错误时，
      .pipe(gulp.dest('./dist/css'));   //放到dist文件加下的css文件内
});

//css的预编译器; => SASS;
 
//服务器
gulp.task('connect', function() {
    connect.server({
      port: 8888,     //服务器的端口号
      root:"dist",    //服务器的根目录
      livereload:true //表示自动刷新页面，不加这个，即使执行了这个方法，只是数据变了，不刷新页面也不行
    });
});

//图片
gulp.task('Imagemin', function () {
    gulp.src(['images/*.{png,jpg,gif,ico,jpeg}',"pic/*.{png,jpg,gif,ico,jpeg}"])
        .pipe(imagemin())       //压缩图片
        .pipe(gulp.dest('dist/images'));
});

//index
gulp.task("index",function(){   //把index放到dist文件夹内
    return gulp.src("index.html")
           .pipe(gulp.dest("dist"))
           .pipe(connect.reload()) //浏览器自动刷新时，数据也更新到里面
});

//html
gulp.task("html",function(){   //把index放到dist文件夹内
    return gulp.src("./html/*.html")
           .pipe(gulp.dest("dist/html"))
           .pipe(connect.reload()) //浏览器自动刷新时，数据也更新到里面
});

//css
gulp.task("css",function(){   
    return gulp.src("css/*.css")
           .pipe(gulp.dest("dist/css"))
});

//js
gulp.task('scripts', function() {
    return gulp.src('js/*.js')   //把所有的src里面的文件都使用babel编译一下，放到all.js文件里，
        // .pipe(babel({
        //     presets: ['env']
        // }))
        // .pipe(uglify())         //然后再压缩一下这个文件，就是把文件办成一行，.min那种的文件
        .pipe(gulp.dest('dist/js'));   //放到dist文件夹下
});

//libs
gulp.task('libs', function() {
    return gulp.src('libs/*.js')   //把所有的src里面的文件都使用babel编译一下，放到all.js文件里， 
        .pipe(gulp.dest('dist/js'));   //放到dist文件夹下
});

gulp.task("watch",()=>{
    gulp.watch("index.html",["index"])
    gulp.watch("./css/*.css",["css","index"])
    gulp.watch("./js/*.js",["scripts","index"])
    gulp.watch("./libs/*.js",["libs","index"])
    gulp.watch("./sass/**/*.scss",["sass","html"])
    gulp.watch("./html/*.html",["html"])
})

gulp.task("build",["scripts","index","Imagemin","css","libs","html","sass"])

gulp.task('default', ['connect', 'watch']);


'use strict';

/**
 *1. LESS编译 压缩 --合并没必要，导包-- 
 *2. JS合并 压缩 混淆
 *3. img复制
 *4. html压缩
**/

var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

// 1. LESS编译 压缩 合并 
gulp.task('style',function(){
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({
		stream: true
	}));
	
});

// 2. JS合并 压缩混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({
		stream: true
	}));
})

// 3. img复制

gulp.task('img',function(){
	gulp.src('src/img/*.*')
	.pipe(gulp.dest('dist/img'))
	.pipe(browserSync.reload({
		stream: true
	}));
})

// 4. html压缩
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true,
		removeAttributeQuotes: true
	}))
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.reload({
		stream: true
	}));
});


// 5. 启动服务器
var browserSync = require('browser-sync');
gulp.task('serve', function(){
	browserSync({
		server: {
			baseDir: ['dist']
		},
	}, function(err, bs){
		console.log(bs.options.getIn(["urls","local"]));
	});
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['scripts']);
	gulp.watch('src/img/*.*',['img']);
	gulp.watch('src/*.html',['html']);
});

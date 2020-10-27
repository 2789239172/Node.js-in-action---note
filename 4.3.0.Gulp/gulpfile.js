// 像加载标准Node 模块那样加载 Gulp 模块
const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const watch = require('gulp-watch')

gulp.task('watch', function () {
  return watch('./app/*.jsx', function () {
      gulp.start('default');	//执行html任务
  });
});


gulp.task('default', () => {
  // 用 Gulp 自带的文件聚集工具 gulp.src 查找所有的 React.jsx 文件
  return gulp.src('app/*.jsx')
    // 开始监视源文件, 为调试构建源码映射
    .pipe(sourcemaps.init())
    // 使用ES2015 和 react(JSX) 配置 gulp-babel
    .pipe(babel({
      presets: [['es2015', 'react']],
      plugins: [['transform-react-jsx']]
    }))
    // 把所有源码拼到一个 all.js 中
    .pipe(concat('all.js'))
    // 单独写入源码映射文件
    .pipe(sourcemaps.write('.'))
    // 将所有文件放到dist/目录下
    .pipe(gulp.dest('dist'))
})


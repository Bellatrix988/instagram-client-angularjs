var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var browserSyncSpa = require('browser-sync-spa');
var concat = require('gulp-concat'); //cлияние файлов


// Compile LESS files from /less into /css
gulp.task('less', function() {
    var f = filter(['*', '!mixins.less', '!variables.less']);
    return gulp.src(['app/less/*.less','!mixins.less', '!variables.less'])
        // .pipe(f)
        .pipe(less())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('merge-css', function() {  
    // var f = filter(['*','!style.min.css', '!style.css']);
    return gulp.src('app/css/*.css')
        // .pipe(f)
        .pipe(concat('style.css'))
        .pipe(gulp.dest('app/css'))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('app/css/style.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('merge-js', function() {  
    return gulp.src(['app/scripts/app/*.js'])
        .pipe(concat('app-s.js'))
        .pipe(gulp.dest('app/scripts'))
});

// Minify JS
gulp.task('minify-js', ['merge-js'], function() {
    return gulp.src(['app/scripts/app-s.js'])
        // .pipe(uglify())
        // .pipe(rename({ suffix: '.min' }))
        // .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    // gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
    //     .pipe(gulp.dest('app/vendor/bootstrap'))

    // gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    //     .pipe(gulp.dest('app/vendor/jquery'))

    // gulp.src([
    //         'node_modules/font-awesome/**',
    //         '!node_modules/font-awesome/**/*.map',
    //         '!node_modules/font-awesome/.npmignore',
    //         '!node_modules/font-awesome/*.txt',
    //         '!node_modules/font-awesome/*.md',
    //         '!node_modules/font-awesome/*.json'
    //     ])
    //     .pipe(gulp.dest('app/vendor/font-awesome'))
})

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js','dev']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    //for AngularJS
    browserSync.use(browserSyncSpa({
        selector: '[ng-app]'
    }));
     browserSync({ 
        server: { 
            baseDir: 'app' 
        },
        notify: false 
    });
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function() {
    gulp.watch('app/less/*.less', ['less']);
    gulp.watch('app/css/style.css', ['minify-css']);
    gulp.watch('app/scripts/**/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/style.min.css', browserSync.reload);
    gulp.watch('app/**/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/html-part/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/scripts/**/*.js', browserSync.reload); // Наблюдение за JS
});

var gulp = require('gulp');
var sass = require('gulp-sass');
var exec = require('gulp-exec');

gulp.task('styles', function() {
    gulp.src('gtk-3.0/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./gtk-3.0/'))

    gulp.src('gtk-3.20/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./gtk-3.20/'))
        .pipe(exec('gsettings set org.gnome.desktop.interface gtk-theme "Default" && gsettings set org.gnome.desktop.interface gtk-theme "Ant-Dracula-Purple"'))
});
gulp.task('shell-style', function() {
    gulp.src('gnome-shell/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./gnome-shell/'))
        .pipe(exec('gsettings set org.gnome.desktop.interface gtk-theme "Ant-Dracula-Purple"'))
        .pipe(exec('gsettings set org.gnome.desktop.wm.preferences theme "Ant-Dracula-Purple"'))
});

//Watch task
gulp.task('default', function() {
    gulp.watch('gtk-3.0/**/*.scss', ['styles']);
    gulp.watch('gtk-3.20/**/*.scss', ['styles']);
});

gulp.task('shell', function() {
    gulp.watch('gnome-shell/*.scss', ['shell-style']);
});
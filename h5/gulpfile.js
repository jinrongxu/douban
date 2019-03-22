const gulp = require("gulp");
const sass = require("gulp-sass");
const webServer = require("gulp-webserver");

gulp.task("devCss", () => {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css/"))
});
gulp.task("watch", () => {
    gulp.watch("./src/scss/*.scss", gulp.series("devCss"))
});
gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(webServer({
            port: 5555
        }))

});
gulp.task("dev", gulp.series("server", "devCss", "watch"))
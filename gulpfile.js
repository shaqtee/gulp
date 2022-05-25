import gulp from "gulp";

import imagemin from "gulp-imagemin";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import clean from "gulp-clean";

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

/* 
	--- TOP LEVEL FUNCTIONS ---
	gulp.task - define tasks
	gulp.src - point to files to use
	gulp.dest - points to folder to output
	gulp.watch - watch files and folders for changes
*/

// Logs Message

gulp.task("message", async () => {
  return console.log("Gulp is running...");
});
// call: gulp message
// desc: Logs a message to the console

gulp.task("default", async () => {
  return console.log("Bismillah");
});
// call: gulp
// desc: Logs a message to the console

gulp.task("copyHTML", async () => {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
});
// call: gulp copyHTML
// desc: copies all html files from src to dist

/*--------------------------------------------------------------------*/

/* Optimize Images */
gulp.task("imagemin", async () => {
  gulp.src("src/images/*").pipe(imagemin()).pipe(gulp.dest("dist/images"));
});

/* Minify */
gulp.task("minify", async () => {
  gulp.src("src/js/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
});

/* Compiling SASS */
gulp.task("sass", async () => {
  gulp
    .src("src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

// Compiling Javascripts
gulp.task("scripts", async () => {
  gulp
    .src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

// Cleaning
gulp.task("clean-scripts", async () => {
  return gulp.src("dist/*.html", { read: false }).pipe(clean());
});

/* -------------------------------------------------------------- */

gulp.task(
  "all",
  gulp.series("message", "copyHTML", "imagemin", "minify", "sass", "scripts")
);

gulp.task("watch", async () => {
  gulp.watch("src/js/*.js", gulp.parallel("scripts"));
  gulp.watch("src/images/*", gulp.parallel("imagemin"));
  gulp.watch("src/sass/*.scss", gulp.parallel("sass"));
  gulp.watch("src/*.html", gulp.series("clean-scripts", "copyHTML"));
});

/*

note:
- series() : execute one after another.
- parallel() : execute simultaneously.

*/

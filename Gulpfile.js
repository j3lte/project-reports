var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require("gulp-rename");
var prompt = require("gulp-prompt");
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

var config = require('./config.json');
var filename = 'empty_rapport';
var toWatch = '*.md';
var template_path = 'template/template.md';
var today = new Date();

var dateString = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + ("0" + (today.getDay() + 1)).slice(-2);

var target = gulp.src(template_path);

gulp.task('create', [], function() {
  return gulp.src('template/template.md')
    .pipe(prompt.prompt({
        type: 'text',
        name: 'projectTitle',
        message: 'Please enter a project title'
    }, function(res){
        if (res.projectTitle) {
            filename = res.projectTitle.replace(/ /g, '_');
            filename = dateString + '-' + filename;
            filename += '-' + config.firstName;
            filename += '-' + config.surName;
            filename += '-' + config.category;
            filename += '.md';
            target
                .pipe(replace('<<projectTitle>>', res.projectTitle))
                .pipe(replace('<<firstName>>', config.firstName))
                .pipe(replace('<<surName>>', config.surName))
                .pipe(replace('<<category>>', config.category))
                .pipe(rename(filename))
                .pipe(gulp.dest(config.reportdir));
        } else {
            // TODO : throw error
        }
    }))
});

gulp.task('server', function(next) {
  var   connect = require('connect'),
        serveStatic = require('serve-static');
        server = connect();

  server.use(serveStatic("./server")).listen(5000, next);
});

gulp.task('watch', ['server'], function() {
    var server = livereload();
    gulp.watch('reports/*.md').on('change', function(file) {
      server.changed(file.path);
  });
});

gulp.task('default', ['create']);
/**
 * Project Report Generator
 * Copyright (c) 2014-2014, Jelte Lagendijk. (MIT Licensed)
 * https://github.com/j3lte/project-reports
 */
var gulp = require('gulp'),
    replace = require('gulp-replace'),
    rename = require("gulp-rename"),
    prompt = require("gulp-prompt"),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');

var config = require('./config.json'),
    filename = 'empty_rapport',
    toWatch = '*.md',
    template_path = 'template/template.md';

var today = new Date();
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
var projectDate = monthNames[today.getMonth()] + ' ' + today.getFullYear();
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
            toWatch = filename;
            target
                .pipe(replace('<<projectDate>>', projectDate))
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

gulp.task('generate', function() {
    gulp.src(config.reportdir + '/*.md')
        .pipe(replace(/```\n/g, '</pre>\n'))
        .pipe(replace(/```(.*)\n/g, '<pre lang="$1">\n'))
        .pipe(gulp.dest(config.outputdir));
});

gulp.task('server', function(next) {
  var   connect = require('connect'),
        serveStatic = require('serve-static');
        server = connect();

  server
    .use(serveStatic("./server"))
    .use('/vendor', serveStatic(__dirname + '/vendor/'))
    .use('/reports', serveStatic(__dirname + '/' + config.reportdir + '/'))
    .listen(5000, next);
});

gulp.task('watch', ['server'], function() {
    var server = livereload();
    server.changed(); // fire changed in order to get livereload started
    gulp
        .watch('reports/' + toWatch).on('change', function(file) {
            server.changed(file.path);
        });
});

gulp.task('default', ['create']);

gulp.task('preview', ['watch']);
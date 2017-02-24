var gulp = require('gulp');
var browserSync = require('browser-sync');

// Rafraichissement du browser
var reload = browserSync.reload;

var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var notify = require("gulp-notify");
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');


// task browser-sync qui permet de configurer au lancement browser-sync
gulp.task('browser-sync', function() {
    browserSync({
        port: 3000,
        server: {
            baseDir: "./", //base
            index: "index.html" //fichier a chargé
        }
    });
});



// Création d'une tâche "default"
// Au lancement de default, la tache browser-Sync va se lancer
gulp.task('default',['browser-sync', 'css', 'pluginCss', 'pluginJs', 'js', 'html'],function(){
  gulp.watch('./css/*.css',['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html', ['html']);

  //watch permet de "watcher", observer les changements de fichiers css du dossier css et de relancer la tâche "css"
  console.log('Ma tâche par défault...');
});

gulp.task('pluginCss',function(){
   console.log('Ma tâche pour le css de mes plugins...');

   return gulp.src(['./bower_components/materialize/dist/css/materialize.css', './bower_components/flexslider/flexslider.css', ])
   .pipe(autoprefixer({
     browsers:['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
    cascade:false}))
   .pipe(concatCss('pluginBundle.min.css'))//concaténation en 1 seul fichier
   .pipe(minifyCss()) //compression de la css
   .pipe(gulp.dest('dist/')) // permet d'envoyer le fichier minifier dans le répertoire dist
   .pipe(notify("css compressée et concatenée !"))
   .pipe(reload({stream:true, once:true})); //je relance mon navigateur quand ma tâche css est accomplie : permet de rafraîchir mon navigateur

});
gulp.task('css',function(){
   console.log('Ma tâche pour le css...');

   return gulp.src('./css/*.css')
   .pipe(autoprefixer({
     browsers:['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
    cascade:false}))
   .pipe(concatCss('bundle.min.css'))//concaténation en 1 seul fichier
   .pipe(minifyCss()) //compression de la css
   .pipe(gulp.dest('dist/')) // permet d'envoyer le fichier minifier dans le répertoire dist/css
   .pipe(notify("css compressée et concatenée !"))
   .pipe(reload({stream:true, once:true})); //je relance mon navigateur quand ma tâche css est accomplie : permet de rafraîchir mon navigateur

});

gulp.task('pluginJs',function(){
  return gulp.src(['./js/modernizr.custom.js', './bower_components/jquery/dist/jquery.js', './bower_components/materialize/dist/js/materialize.min.js', './js/jquery.lettering.js', './bower_components/flexslider/jquery.flexslider-min.js', './wimpy/wimpy.js'])
  .pipe(concat('plugin.min.js'))//concaténation en 1 seul fichier
  .pipe(uglify()) //minify js
  .pipe(gulp.dest('./dist/')) // permet d'envoyer le fichier minifier dans le répertoire dist/css
  .pipe(notify("JS modifié !"))
  .pipe(reload({stream:true, once:true})); //je relance mon navigateur quand ma tâche css est accomplie : permet de rafraîchir mon navigateur
});

gulp.task('js',function(){
  return gulp.src('./js/main.js')
  .pipe(concat('app.min.js'))//concaténation en 1 seul fichier
  .pipe(uglify()) //minify js
  .pipe(gulp.dest('./dist/')) // permet d'envoyer le fichier minifier dans le répertoire dist/css
  .pipe(notify("JS modifié !"))
  .pipe(reload({stream:true, once:true})); //je relance mon navigateur quand ma tâche css est accomplie : permet de rafraîchir mon navigateur
});


gulp.task('html', function(){
  return gulp.src('./*.html')
  .pipe(reload({stream:true, once:true}));
});

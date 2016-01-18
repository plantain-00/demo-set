var gulp = require("gulp");
var nodemon = require("gulp-nodemon");

gulp.task("nodemon",function(){
	nodemon({
		script: 'app.js',
		ext: 'js html',
		env: {
			'NODE_ENV':'development'
		}
	}).on('restart', function () {
      console.log('restarted!')
    })
});
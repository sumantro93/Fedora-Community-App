var gulp = require('gulp');
var imagemin = require('gulp-image');

module.exports = function(options) {
options.src = options.src || 'resources/www/img/**/*';
options.dest = options.dest || 'www/img';

return gulp.src(options.src)
    .pipe(imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true,
        verbose: true,
        pngquant: true,
        optipng: false,
        zopflipng: true,
        advpng: true,
        jpegRecompress: false,
        jpegoptim: true,
        mozjpeg: true,
        gifsicle: true,
        svgo: true,
        //  plugins: [imagemin.gifsicle(), imageminJpegoptim(), imagemin.optipng(), imagemin.svgo()],
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{
            cleanupIDs: false
        }]
    }))
    .pipe(gulp.dest(options.dest));
}

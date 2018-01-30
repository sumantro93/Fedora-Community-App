# Image Copy and Optimization Task
Copy image resources to build directory and optimizes them. This project is created in the style of the other ionic-gulp-* tasks used in the ``gulpfile.js`` of starter projects created with the ionic2 generator, e.g. (https://github.com/driftyco/ionic-gulp-tasks). It should be considered temporary until Ionic releases something official. It is published as npm module so that it can be easily included (and reapplied during beta changes) of the ionic2 build-tools. 

## Installation
```
$ npm install --save-dev ionic-gulp-image-task
```
## API

### imageCopyOptimize([options])

Returns a [stream](http://nodejs.org/api/stream.html) of [Vinyl files](https://github.com/wearefractal/vinyl-fs)
that can be [piped](http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options).

#### Available options:
- **src** (String|Array) Glob or array of globs ([What's a glob?](https://github.com/isaacs/node-glob#glob-primer)) matching image source files. Default: `'resources/www/img/**/*'`.
- **dest** (String) Output path for the HTML files. Default: `'www/img'`.

## Example

```
var imageCopyOptimize = require('ionic-gulp-image-task');

gulp.task('image', imageCopyOptimize);

gulp.task('image', function(){
  return imageCopyOptimize({ dest: 'www/my-custom-build-dir'});
});
```

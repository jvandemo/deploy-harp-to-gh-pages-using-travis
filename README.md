# Your AngularJS application

## How to develop

First install all dependencies

```sh
$ npm install
$ bower install
```

Then run gulp to build and watch files during development

```sh
$ gulp
```

Finally start the harp server from your project directory:

```sh
$ harp server
```

And navigate to `http://localhost:9000` in your browser to preview your work:

![Homepage](http://i.imgur.com/dORKysf.png)

## File structure

All action happens in the `public` directory, so let's have a look at its structure:

```sh
public
├── 200.jade
├── _build                          # main _build directory for global app stuff
│   ├── app.config.module.js        # Example 'app.config' module
│   ├── app.config.module.spec.js   # Put your unit tests here too, Karma will find them for you
│   ├── app.config.router.js        # Configure the router
│   ├── app.less                    # Global app styles that you want Gulp to add to /public/build/css/app.css
│   ├── app.module.js               # Main 'app' module
│   └── app.module.spec.js          # Sample unit tests for main 'app' module
├── build                           # Build directory where files built by Gulp are saved
│   ├── css
│   │   ├── app.css                 # All .less files from _build directories are concatenated here
│   │   └── app.min.css             # Minified version for production
│   └── js
│       ├── app.js                  # All .js files from _build directories are concatenated here
│       └── app.min.js              # Minified version for production
└── components
    ├── footer                      # Example footer component
    │   ├── _build                  # Component _build directory with files that you want Gulp to build
    │   │   └── footer.less         # Styles that you want to add to /public/build/css/app.css
    │   └── footer.jade             # Jade file will be compiled to HTML automatically
    ├── header                      # Example header component
    │   ├── _build                  # Component _build directory with files that you want Gulp to build
    │   │   └── header.less         # Styles that you want to add to /public/build/css/app.css
    │   └── header.jade             # Jade file will be compiled to HTML automatically
    └── homepage                    # Example homepage component
        ├── _build                  # Component _build directory with files that you want Gulp to build
        │   └── homepage.routes.js  # JavaScript code that you want to add to /public/build/js/app.js
        └── homepage.jade           # Jade file will be compiled to HTML automatically
```

## Testing

To run unit tests:

```sh
$ gulp test
```

This will run all tests in `public/**/_build/**/*.spec.js`.

## Documentation

To generate documentation:

```sh
$ gulp docs
```
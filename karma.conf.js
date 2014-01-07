module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
        'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
        'src/**/*.js',
        'tests/**/*.html',
        'tests/**/*.js'
    ],
    preprocessors: {
      'tests/**/*.html': ['html2js']
    },
    exclude: [
        'src/*.min.js'
    ],
    reporters: ['progress'],
    plugins : [
        'karma-mocha',
        'karma-chai',
        'karma-html2js-preprocessor',
        'karma-phantomjs-launcher'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true
  });
};

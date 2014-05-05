module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
        'bower_components/jquery/dist/jquery.min.js',
        'src/**/*.js',
        'tests/**/*.html',
        'tests/**/*.js'
    ],
    preprocessors: {
      'tests/**/*.html': ['html2js'],
      'src/**/*.js' : ['coverage']
    },
    exclude: [
        'src/*.min.js'
    ],
    reporters: ['progress', 'coverage'],
    plugins : [
        'karma-mocha',
        'karma-chai',
        'karma-html2js-preprocessor',
        'karma-phantomjs-launcher',
        'karma-coverage'
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

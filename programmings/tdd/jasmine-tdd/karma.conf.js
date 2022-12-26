module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine-ajax', 'jasmine'],
    plugins: Object.keys(require('./package').devDependencies).flatMap(
      (packageName) => {
        if (!packageName.startsWith('karma-')) return []
        return [require(packageName)]
      }
    ),
    files: [
      {
        pattern: './test/**/*.js',
        type: 'module'
      },
      {
        pattern: './src/**/*.js',
        type: 'module'
      }
    ],
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],
    autoWatch: true,
    singleRun: false,
    browsers: ['Chrome']
  });
}
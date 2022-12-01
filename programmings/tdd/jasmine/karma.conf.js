module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      {
        pattern: './test/*.js',
        type: 'module'
      },
      {
        pattern: './src/**/*.js',
        type: 'module'
      }
    ],
    autoWatch: true,
    singleRun: false,
    browsers: ['Chrome'],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ],
  });
}
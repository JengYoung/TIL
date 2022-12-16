module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
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
    autoWatch: true,
    singleRun: false,
    browsers: ['Chrome']
  });
}
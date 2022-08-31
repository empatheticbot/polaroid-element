module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: '../dist/index.js', type: 'module' },
      { pattern: 'test.js', type: 'module' },
    ],
    reporters: ['mocha', 'progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    middleware: [],
    plugins: ['karma-*'],
    preprocessors: {
      '../dist/**/*.js': ['coverage'],
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },
  })
}

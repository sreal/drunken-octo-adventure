basePath = '';
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'js/vendor/angular.min.js',
  'js/vendor/angular-mocks.js',
  'js/public/**/*.js',
  'test/js/*.js',
];
autoWatch      = true;
//browsers       = ['Chrome', 'ChromeCanary', 'Firefox', 'Opera', 'Safari', 'PhantomJS', 'IE']
browsers       = ['PhantomJS'];
captureTimeout = 5000;
colors         = true;
logLevel       = LOG_INFO; // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
port           = 9876;
reporters      = ['progress'];
runnerPort     = 9100;
singleRun      = false;

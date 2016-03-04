module.exports = function(config){
  config.set({

    basePath : './app',

    files : [
    ],
    jspm: {
        loadFiles: [
          'test/GithubUserService.spec.js'
        ],
        serveFiles: [
          './**/*'
        ]
    },
    autoWatch : true,

    frameworks: ['jspm', 'jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-jspm',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};

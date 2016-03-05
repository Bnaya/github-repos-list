module.exports = function(config){
  config.set({

    basePath : './app',

    files : [
    ],
    jspm: {
        loadFiles: [
          'test/**/*'
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
            'karma-jasmine'
            ]
  });
};

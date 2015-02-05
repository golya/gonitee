module.exports = function(config){
    config.set({
        //  root path location that will be used to resolve all relative paths in files and exclude sections
        basePath : '../',

        // files to include, ordered by dependencies
        files : [
            'gonitee.html',
            'js/*.js',
            'lib/*.js',
            'tests/unit/*.js'
        ],
        // files to exclude
        exclude : [
        ],

        // karma has its own autoWatch feature but Grunt watch can also do this
        autoWatch : false,

        // testing framework, be sure to install the correct karma plugin
        frameworks: ['jasmine'],

        // browsers to test against, be sure to install the correct browser launcher plugins
        browsers : ['PhantomJS'],

        // map of preprocessors that is used mostly for plugins
        preprocessors: {
            // test coverage
            'app/js/controllers/*.js': ['jshint', 'coverage'],
            'app/js/directives/*.js': ['jshint', 'coverage'],
            'app/js/app.js': ['jshint', 'coverage']
        },

        reporters: ['progress', 'coverage'],

        // list of karma plugins
        plugins : [
            'karma-jshint-preprocessor',
            'karma-coverage',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],
        coverageReporter: {
            // type of file to output, use text to output to console
            type : 'text',
            // directory where coverage results are saved
            dir: 'test-results/coverage/'
            // if type is text or text-summary, you can set the file name
            // file: 'coverage.txt'
        },
        junitReporter: {
            outputFile: 'test-results/junit-results.xml'
        }
})};
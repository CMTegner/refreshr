module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        lint: {
            all: ["*.js", "test/*.js"]
        },
        jshint: {
            options: {
                // Enforcing options
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: false,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                plusplus: false,
                quotmark: "double",
                regexp: false,
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                //maxparams: 0,
                //maxdepth: 0,
                maxstatements: 1,
                //maxcomplexity: 0,

                // Relaxing options
                asi: false,
                boss: false,
                debug: false,
                eqnull: false,
                es5: false,
                esnext: false,
                evil: false,
                expr: false,
                funcscope: false,
                globalstrict: true,
                iterator: false,
                lastsemic: false,
                laxbreak: false,
                laxcomma: false,
                loopfunc: false,
                multistr: false,
                onecase: false,
                proto: false,
                regexdash: false,
                scripturl: false,
                smarttabs: false,
                shadow: false,
                sub: false,
                supernew: false,
                validthis: false,

                // Environments
                browser: true,
                couch: false,
                devel: false,
                dojo: false,
                jquery: false,
                mootools: false,
                node: true,
                nonstandard: false,
                prototype: false,
                rhino: false,
                worker: false,
                wsh: false
            }
        }
    });

    grunt.task.registerTask("vows", "Run vows test", function() {
        var done = this.async(),
            vows = require("child_process").spawn("vows", ["--spec"]);

        vows.stdout.on("data", function (data) {
            grunt.log.writeln(data);
        });

        vows.stderr.on("data", function (data) {
            grunt.log.writeln(data);
        });

        vows.on('exit', function (code) {
            done(code);
        });
    });

    grunt.registerTask("default", "lint vows");

};


"use strict";

var VOWS = require("vows"),
    ASSERT = require("assert");

exports.suite1 = VOWS.describe("watchr").addBatch({
    "when loaded": {
        topic: function () {
            var WATCHR = require("../watchr.js"),
                callback = this.callback;
            return require("http").get("http://localhost:9898", function () {
                    callback(null, true);
                })
                .on("error", function () {
                    callback(null, false);
                })
                .setTimeout(1000);
        },

        "should start a server": function (success) {
            ASSERT.isTrue(success);
        }
    },
    "GET /refreshr.js": {
        topic: function () {
            var WATCHR = require("../watchr.js"),
                callback = this.callback;
            require("http").get("http://localhost:9898/refreshr.js", function (response) {
                    var result = "";
                    response.on("data", function (chunk) {
                        result += chunk;
                    });
                    response.on("end", function () {
                        callback(null, result);
                    });
                })
                .on("error", function () {
                    callback(null, null);
                })
                .setTimeout(1000);
        },

        "should serve refreshr.js": function (result) {
            var refreshr = require("fs").readFileSync(__dirname + "/../refreshr.js", "UTF-8");
            ASSERT.strictEqual(refreshr, result);
        }
    }
});


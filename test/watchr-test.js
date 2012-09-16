"use strict";

var VOWS = require("vows"),
    ASSERT = require("assert"),
    REQUEST = require("request"),
    FS = require("fs"),
    filename = "foo.txt",
    timestamp;

exports.suite = VOWS.describe("watchr").addBatch({
    "when loaded": {
        topic: function () {
            var WATCHR = require("../watchr.js");
            REQUEST("http://localhost:9898", this.callback);
        },

        "should start a server": function (error, response, body) {
            ASSERT.isNull(error);
            ASSERT.strictEqual(response.statusCode, 200);
        }
    },

    "GET /refreshr.js": {
        topic: function () {
            var WATCHR = require("../watchr.js");
            REQUEST("http://localhost:9898/refreshr.js", this.callback);
        },

        "should serve refreshr.js": function (error, response, body) {
            var refreshr = FS.readFileSync(__dirname + "/../refreshr.js", "UTF-8");
            ASSERT.isNull(error);
            ASSERT.strictEqual(response.statusCode, 200);
            ASSERT.strictEqual(body, refreshr);
        }
    },

    "GET /watchr.js": {
        topic: function () {
            var WATCHR = require("../watchr.js"),
                callback = this.callback;
            FS.openSync(filename, "w");
            timestamp = FS.statSync(filename).ctime.getTime();
            setTimeout(function () {
                REQUEST("http://localhost:9898/watchr.js?callback=foo", callback);
            }, 1000);
        },

        "should wrap the response in the provided `callback` query-parameter": function (error, response, body) {
            ASSERT.isNull(error);
            ASSERT.strictEqual(response.statusCode, 200);
            ASSERT.match(body, /foo\(\d+\);/);
        },

        "should return the timestamp": function (error, response, body) {
            var reportedTimeString = body.replace(/foo\((\d+)\);/, "$1"),
                // fs.stat.*time do not return millis, so we need to remove
                // them from the reported time to make this test work
                reportedTime = Math.floor(parseInt(reportedTimeString, 10) / 1000) * 1000;
            FS.unlinkSync("foo.txt"); // TODO: Remove when the following test is fixed
            ASSERT.isNull(error);
            ASSERT.strictEqual(response.statusCode, 200);
            ASSERT.strictEqual(reportedTime, timestamp);
        }/*,

        "after any changes": {
            topic: function () {
                var WATCHR = require("../watchr.js"),
                    callback = this.callback,
                    fd = FS.openSync(filename, "w");
                FS.writeSync(fd, "test");
                FS.closeSync(fd);
                timestamp = FS.statSync(filename).mtime.getTime();
                setTimeout(function () {
                    REQUEST("http://localhost:9898/watchr.js?callback=foo", callback);
                }, 1000);
            },

            "should report the update timestamp": function (error, response, body) {
                var reportedTimeString = body.replace(/foo\((\d+)\);/, "$1"),
                    reportedTime = Math.floor(parseInt(reportedTimeString, 10) / 1000) * 1000;
                FS.unlinkSync("foo.txt");
                ASSERT.isNull(error);
                ASSERT.strictEqual(response.statusCode, 200);
                // TODO: Need to track actual update time instead of fs.watch trigger time
                ASSERT.strictEqual(reportedTime, timestamp);
            }
        }*/
    }
});


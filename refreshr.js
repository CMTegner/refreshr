(function () {
    "use strict";

    var updated,
        func,
        script;

    function scriptLoaded(u) {
        delete window[func];
        script.parentNode.removeChild(script);
        if (!updated || updated === u) {
            updated = u;
            poll();
        } else if (updated !== u) {
            window.location.reload();
        }
    }

    function checkForUpdates() {
        func = "refreshr_" + Math.floor(Math.random() * 10e11);
        window[func] = scriptLoaded;
        script = document.createElement("script");
        script.src = "http://localhost:9898/watchr.js?callback=" + func;
        document.scripts[0].insertBefore(script);
    }

    function poll() {
        setTimeout(checkForUpdates, 1000);
    }

    poll();
}());


define(function () {
    var undef;

    var arg = function (arg, otherwise) {
        return arg !== undef ? arg : otherwise;
    };

    var lock = function (time) {
        setTimeout(function () {
            var start = +(new Date),
                current = 0;
            console.log('Locking thread at %d', start);

            start += time;
            while (start > (current = +(new Date))) {
                console.log('tick');
            }

            console.log('Unlocking thread at %d', current);
        }, 0);
    };

    /**
     * @param {Function} condition
     * @param {number} [checkInterval=50] How long
     * @param {number} [releaseDuration=0] How long to release the thread.
     */
    return function (condition, checkInterval, releaseDuration) {
        checkInterval = arg(checkInterval, 50);
        releaseDuration = arg(releaseDuration, 0);

        var id = setInterval(function () {
            if (!condition()) {
                lock(checkInterval);
            } else {
                clearTimeout(id);
            }
        }, releaseDuration);
    };
});
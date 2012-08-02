(function (global) {
    var undef;

    /**
     * Simple args getter.
     *
     * @param {*} arg Used if defined.
     * @param otherwise Used if arg is not defined.
     * @return {*}
     */
    var arg = function (arg, otherwise) {
        return arg !== undef ? arg : otherwise;
    };

    /**
     * Locks up the main thread as soon as the current thread completes.
     *
     * @param {number} time
     */
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
     * Locks up the main thread until a condition is met, releasing it
     * momentarily to allow other "threads" to advance.
     *
     * @param {Function} condition
     * @param {number} [checkInterval=50] How long
     */
    var lockThreadUntil = global.lockThreadUntil = function (condition, checkInterval, releaseDuration) {
        checkInterval = arg(checkInterval, 50);
        releaseDuration = arg(releaseDuration, 0);

        var id = setInterval(function () {
            if (!condition()) {
                lock(checkInterval);
            } else {
                clearInterval(id);
            }
        }, releaseDuration);
    };

    define(function () {
        return lockThreadUntil;
    });
})(this);
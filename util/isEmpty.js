define(function () {
    /**
     * Probably more we should do for complex cases, but simpler seems better  
     * for now.
     * 
     * @param {Array|Object} thing
     * @return {boolean}
     */
    return function (thing) {
        // If it's an Array, then the task is obvious.
        if (thing.length && thing.length > 0) {
            return false;
        }
        
        // If it's an Object, then compare to another object to avoid confounds
        // caused by native prototype extension.
        var key = '';
        var compareTo = {};
        for (key in thing) {
            if (!compareTo[key]) {
                return false;
            }
        }
        
        return true;
    };
});
define([
    'dojo/_base/declare', './declareNative',
    'dojo/_base/array', 'dojo/_base/lang'
], function (declare, declareNative, arrayUtils, lang) {
    var aSlice = Array.prototype.slice;
    /**
     *
     */
    return function (moduleOrCtor, ancestors, proto) {
        var args = aSlice.call(arguments);
        if (lang.isString(moduleOrCtor)) {
            args.splice(0, 1, moduleOrCtor.split('/').join('.'));
            return declare.apply(this, args);
        } else {
            return declareNative.apply(this, args);
        }

    };
});
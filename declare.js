define([], function () {
    // A few functions that prevent needing a dependency.
    var isArray = function (obj) {
        return Object.prototype.toString.apply(obj) === '[object Array]';
    };

    var isFunction = function (obj) {
        return Object.prototype.toString.apply(obj) === '[object Function]';
    };

    var mixin = function (objs) {
        var args = arguments;
        var target = args[0];
        for (var i = 1, len = args.length, arg, prop; i < len; ++i) {
            arg = args[i];
            for (prop in arg) {
                if (arg.hasOwnProperty(prop)) {
                    target[prop] = arg[prop];
                }
            }
        }
        return target;
    };
    
    /**
     * @param {Function?} constructor
     * @param {(Array|Object)?} ancestors
     * @param {Object} prototype
     * @return {constructor}
     */
    return function (Ctor, ancestors, proto) {
        // There better be  a prototype.
        proto = proto || ancestors || Ctor || (function () {
            throw "A prototype is required.";
        })();
        
        // If ancestors isn't the same as prototype, then make it an Array.'
        ancestors = ancestors || Ctor;
        ancestors = ancestors === proto ? 
                        [] :
                            isArray(ancestors) ?
                                ancestors :
                                    [ancestors];
        
        Ctor = isFunction(Ctor) ? Ctor : function Class () {};
        
        // The prototype is really just another mixin.
        ancestors.push(proto);
        
        // null prototype is not a big deal.
        Ctor.prototype = ancestors.shift();
        
        ancestors.unshift(Ctor.prototype);
        
        mixin.apply(this, ancestors);
        
        return Ctor;
    };
});

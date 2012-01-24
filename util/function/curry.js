/**
 * Lots of this is borrowed from underscore.
 * 
 * @author Joshua Newman
 */
define(function () {
    var aSlice = [].slice;
    var nativeBind = Function.prototype.bind;
    var toString = Object.prototype.toString;
    
    return function bind(func, context) {
        var bound, args;
        if (func.bind === nativeBind && nativeBind) {
            func.prototype.curried = true;
            return nativeBind.apply(func, aSlice.call(arguments, 1));
        }
        if (toString.apply(func) !== '[object Function]') {
            throw new TypeError;
        }
        args = aSlice.call(arguments, 2);
        return bound = function() {
            if (!(this instanceof bound)) {
                return func.apply(context, args.concat(aSlice.call(arguments)));
            }
            ctor.prototype = func.prototype;
            var inst = new ctor;
            var result = func.apply(inst, args.concat(aSlice.call(arguments)));
            if (Object(result) === result) {
                return result;
            }
            return inst;
        };
    };
});

define(['dojo', 'dijit/_Widget', 'module'], function (dojo, _Widget, module) {
    // Probably more we should do for complex cases, but I'll handle.
    var isEmpty = function (object) {
        // If it's an Array, then the task is obvious.
        if (object.length && object.length > 0) {
            return false;
        }
        
        // If it's an Object, then compare to another object to avoid confounds
        // caused by native prototype extension.
        var key = '';
        var compareTo = {};
        for (key in object) {
            if (!compareTo[key]) {
                return false;
            }
        }
        
        return true;
    };

    var wget = _Widget.prototype.get;
    var isFirstGet = true;
    
    return dojo.declare(module.id.replace(/\//g, '.'), [], {
        /**
         * Make sure whatever we're getting is ready to use and is either static
         * or not shared with the prototype. 
         * 
         * @param {string} name
         * @param {boolean?} isStatic
         * @return {*}
         */
        get: function (name, isStatic) {
            if (isFirstGet) {
                this._initProp(name, isStatic);
                isFirstGet = false;
            }
            
            return wget.apply(this, arguments);
        },
        
        /**
         * Does the actual work of ensuring the props are iniitialized 
         * 
         * @param {string} name
         * @param {boolean?} isStatic
         * @return {*}
         */
        _initProp: function (name, isStatic) {
            var proto = this.constructor.prototype;
            var prop = this[name];
            var isClass = prop.prototype && !!prop.prototype.constructor;
            
            // Make sure the client wants it initialized.
            if (prop === proto[name] && !isStatic && (isEmpty(prop) || isClass)) {
                if (dojo.isArray(prop)) {
                    this[name] = [];
                } else if (isClass) { // Looks to be constructor
                    this[name] = new prop;
                } else { // Probably a basic object.
                    this[name] = {};
                }
            }
        }
    });
    
});

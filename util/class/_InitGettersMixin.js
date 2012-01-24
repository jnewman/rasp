define([
    'dojo', 
    'dijit/_WidgetBase', 
    'module',
    './_getAttrNamesPlainObjectMixin', 
    '../isEmpty'
], function (dojo, _WidgetBase, module, _getAttrNamesPlainObjectMixin, isEmpty) {
    // Steal the necessary methods from _WidgetBase
    var wget = _WidgetBase.prototype.get;
    var aSlice = [].slice;
    return dojo.declare(module.id.replace(/\//g, '.'), [], {
        /**
         * Make sure whatever we're getting is ready to use and is either static
         * or not shared with the prototype. 
         *
         * @param {boolean?} isClassMethod 
         * @param {string} name
         * @param {...} args
         * @return {*}
         */
        get: function (isClassMethod, name) {
            var args = aSlice.apply(arguments);
            
            if (typeof isClassMethod === 'string') {
                name = isClassMethod;
                
                // Client doesn't care, so assume it's not a classMethod
                args.unshift(false);
            }
            
            if (!this._wasGotten(name)) {
                this._initProp.apply(this, args);
             }
            
            return wget.apply(this, arguments);
        },
        
        /**
         * Does the actual work of ensuring the props are initialized 
         *
         * @private
         *  
         * @param {boolean?} isClassMethod 
         * @param {string} name
         * @param {...} args
         * @return {*}
         */
        _initProp: function (isClassMethod, name) {
            var args = aSlice.apply(arguments).slice(2);
            var proto = this.constructor.prototype;
            var prop = this[name];
            var isClass = prop.prototype && !!prop.prototype.constructor;
            
            // Make sure the client wants it initialized.
            if (prop === proto[name] && !isClassMethod && (isEmpty(prop) || isClass || isCurriedClass)) {
                if (dojo.isArray(prop)) {
                    this[name] = [];
                } else if (isClass) { // Looks to be constructor
                    this[name] = prop.prototype.constructor.apply(prop, args);
                } else { // Probably a basic object.
                    this[name] = {};
                }
            }
            
            if (!this._getAttrNames) {
                dojo.mixin(this, _getAttrNamesPlainObjectMixin);
            }
        },
        
        /**
         * @private
         * @param {string} name
         * @return {boolean}
         */
        _wasGotten: function (name) {
            if (!this._gotten) {
                this._gotten = {};
                return false;
            } else {
                return !!this._gotten[name];
            }
        },
        
        /**
         * Cache whether we've gotten the attribute before to cut down on memory
         * usage. 
         * 
         * @private
         * @type {object}
         */
        _gotten: null
        
    });
    
});

define(['dijit/_WidgetBase', 'module'], function (_WidgetBase) {
    
    // Steal the hard work from _WidgetBase
    var _wgetAttrNames = _WidgetBase.prototype._getAttrNames;
    
    return {
        /**
         * _WidgetBase.get needs this method to work with non widgets. 
         * 
         * @private
         * @param {string} name
         * @return {*}
         */
        _getAttrNames: function (name) {
            // make sure _attrPairNames is available for caching.
            this._attrPairNames = this._attrPairNames || {};
              
            return _wgetAttrNames.apply(this, arguments);
        }
        
    };
    
});


define(function () {
    var aSlice = [].slice;
    
    /**
     * Trap default arguments for a class in a transparent way. Sadly, this 
     * won't work with built-in Function.prototype.bind, cause it hides the 
     * constructor from us.  
     * 
     * @param {class} Class
     * @param {...} args
     * @return {Function.<class>} 
     */ 
    return function (Class, args) {
        var args = aSlice.apply(arguments).slice(1); 
        
        return function () {
            return Class.prototype.constructor.apply(Class, args);
        };
    }; 
});

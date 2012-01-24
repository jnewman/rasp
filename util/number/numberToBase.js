define(function () {
    /**
     * Takes an arbitrary number and converts it to an Array of numbers   
     * representing the increment of the whole at the given offset. Example, 
     * 
     * @param {number} number
     * @param {number} newBase
     * @param {number?} originalBase
     * @return {Array.<number>}
     */
    return function (number, newBase, originalBase) {
        var digits = [];
        
        // Lets us accept any base for conversion.
        number = parseInt(number, originalBase || 10);
        
        // Using do, wince the loop must execute once;
        do {
            // We'll find the least significant first.
            digits.unshift(number % newBase);
        } while ((number = Math.floor(number /= newBase)) > 0);
        
        return digits;
    };
});

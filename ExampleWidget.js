define([
    'dojo', 
    'dijit/_Widget',
    'rasp/util/class/_InitGetters', 
    'module' 
], function (dojo, _Widget, _InitGetters, module) {
    return dojo.declare(module.id.replace(/\//g, '.'), [_Widget, _InitGetters], {
        baz: Array,
        qux: []
    });
});

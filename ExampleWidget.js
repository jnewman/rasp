define([
    'dojo', 
    'rasp/util/class/_InitGettersMixin', 
    'module',
    'dijit/form/TextBox',
    'rasp/util/class/classCurry'
], function (dojo, _InitGettersMixin, module, TextBox, classCurry) {
    return dojo.declare(module.id.replace(/\//g, '.'), [_InitGettersMixin], {
        baz: Array,
        qux: [],
        textBox: classCurry(TextBox, {}, 'main'),
        
        foo: function () {
            return 'Bar';
        }
    });
});

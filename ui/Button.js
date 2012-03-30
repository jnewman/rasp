define([
    'module', '../util/class/declare', 'dijit/form/Button'
], function (module, declare, Button) {
    return declare(module.id, [Button], {
        templateString: '',
        buildRendering: function () {
            this.domNode = this.focusNode = this.iconNode = this.srcNodeRef;
            this.srcNodeRef = '';
        }
    });
});
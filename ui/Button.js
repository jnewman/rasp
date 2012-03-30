define([
    'module', '../util/class/declare', 'dijit/form/Button'
], function (module, declare, Button) {
    return declare(module.id, [Button], {
        /**
         * Wipe out the existing template.
         *
         * @type {string}
         */
        templateString: '',

        /**
         * Re-add all the attach-points and attach the click handler.
         */
        buildRendering: function () {
            this.domNode = this.titleNode = this.focusNode = this.iconNode = this.srcNodeRef;
            delete this.srcNodeRef;

            this.connect(this.domNode, 'click', this._onClick);
        }
    });
});
define([
    'module', '../../util/class/declare',
    'dojo/_base/lang', 'dojo/dom-attr',
    'config/tinymce-config',
    '../../amd/tinymce!'
], function (
    module, declare,
    lang, domAttr,
    config,
    tinymce
) {
    // Pin to the local version.
    return declare(module.id, null, {
        /**
         * Attach this node, so we know where the editor should go.
         *
         * @protected
         * @type {HTMLTextAreaElement}
         */
        _tinymceNode: null,

        /**
         * @type {tinymce.Editor}
         */
        _tinymceInstance: null,

        /**
         * Setup tinymce on the instance..
         */
        startup: function () {
            this.inherited(arguments);

            var node = this.get('_tinymceNode');
            if (!node) {
                throw '_tinymceNode is a required property.';
            }

            // This should always be set by attach-points
            var id = this.id + '_tinymceEditor';
            domAttr.set(node, 'id', id);

            config = lang.mixin({}, config, {
                setup: lang.hitch(this, function (editor) {
                    editor.onInit.add(this._tinymceInit, this);
                })
            });

            this._tinymceInstance = new tinymce.Editor(id, config);
            this._tinymceInstance.init();
        },

        /**
         *
         */
        _tinymceInit: function () {
            this._tinymceInstance.show();
            console.log(this, arguments);
        }
    });
});
define([
    'module', '../../util/class/declare',
    'dojo/_base/lang', 'dojo/dom-attr',
    'config/tinymce-config',
    '../../amd/tinymce'
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
        _editor: null,

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

            lang.mixin(config, {
                instance_init_callback: lang.hitch(this, this._tinymceInit)
            });

            this._editor = new tinymce.Editor(id, config);
        },

        /**
         *
         */
        _tinymceInit: function () {
            console.log(this, arguments);
        }
    });
});
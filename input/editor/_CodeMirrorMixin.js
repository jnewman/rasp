define([
    'module', '../../util/class/declare', 'dojo/_base/lang', 'dojo/dom-attr',
    'config/codemirror-config', '../../amd/codemirror'
], function (
    module, declare, lang, domAttr,
    config, CodeMirror
    ) {
    return declare(module.id, null, {
        /**
         * Attach this node, so we know where the editor should go.
         *
         * @protected
         * @type {HTMLTextAreaElement}
         */
        _codemirrorNode: null,

        /**
         * @type {}
         */
        _codemirrorInstance: null,

        /**
         * Setup tinymce on the instance..
         */
        startup: function () {
            this.inherited(arguments);

            var node = this.get('_codemirrorNode');
            if (!node) {
                throw '_codemirrorNode is a required property.';
            }

            // This should always be set by attach-points
            var id = this.id + '_codemirrorEditor';
            domAttr.set(node, 'id', id);

            config = lang.mixin({}, config, {
                initCallback: lang.hitch(this, this._codeMirrorInit)
            });

            this._codemirrorInstance = CodeMirror.fromTextArea(node, config);
        },

        _codeMirrorInit: function () {
        }
    });
});
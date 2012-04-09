define([
    'module', '../../util/class/declare',
    'dojo/_base/lang', 'dojo/dom-attr', 'dojo/_base/Deferred',
    'config/codemirror-config', '../../amd/codemirror'
], function (
    module, declare,
    lang, domAttr, Deferred,
    config, CodeMirror
) {
    return declare(module.id, null, {
        /**
         * Attach this node, so we know where the editor should go.
         *
         * @protected
         * @type {HTMLTextAreaElement}
         */
        _codeMirrorNode: null,

        /**
         * @protected
         * @type {CodeMirror}
         */
        _codeMirrorInstance: null,

        /**
         * @protected
         * @type {string}
         */
        _codeMirrorValue: '',

        /**
         * @protected
         * @type {dojo._base.Deferred}
         */
        _codeMirrorInitDef: null,

        /**
         * Initialize the deferred, so we can block setters while CodeMirror loads.
         */
        constructor: function () {
            this._codeMirrorInitDef = new Deferred;
        },

        /**
         * Setup CodeMirror on the instance..
         */
        postCreate: function () {
            this.inherited(arguments);

            var node = this.get('_codeMirrorNode');
            if (!node) {
                throw '_codeMirrorNode is a required property.';
            }

            // This should always be set by attach-points
            var id = this.id + '_codeMirrorEditor';
            domAttr.set(node, 'id', id);

            config = lang.mixin({}, config, {
                initCallback: lang.hitch(this, this._codeMirrorInit),
                onChange: lang.hitch(this, this._codeMirrorChange)
            });

            this._codeMirrorInstance = CodeMirror.fromTextArea(node, config);
        },

        /**
         * @protected
         * Let setters know CodeMirror is ready.
         */
        _codeMirrorInit: function () {
            this._codeMirrorInitDef.resolve();
        },

        /**
         * Makes sure we don't cascade into a stack overflow.
         *
         * @private
         * @type {boolean}
         */
        _setByCodeMirror: false,

        /**
         * Safely set CodeMirror's value to that of this widget.
         *
         * @param {string}
         * @return {T}
         */
        _setValueAttr: function (value) {
            this.inherited(arguments);
            if (!this._setByCodeMirror) {
                this.set('_codeMirrorValue', value);
            }

            return this;
        },

        /**
         * Update the _Widget's value prop.
         * @protected
         */
        _codeMirrorChange: function () {
            this._setByCodeMirror = true;
            this.set('value', this.get('_codeMirrorValue'));
            this._setByCodeMirror = false;
        },

        /**
         * @protected
         * @return {string}
         */
        _get_codeMirrorValueAttr: function () {
            return this._codeMirrorInstance.getCode();
        },

        /**
         * @protected
         * @param {string} value
         * @return {T}
         */
        _set_codeMirrorValueAttr: function (value) {
            this._codeMirrorValue = value;

            this._codeMirrorInitDef.then(lang.hitch(this, function () {
                this._codeMirrorInstance.setCode(value);
            }));

            return this;
        }
    });
});
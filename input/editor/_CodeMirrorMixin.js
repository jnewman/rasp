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
         * @type {CodeMirror}
         */
        _codeMirrorInstance: null,

        /**
         * @type {string}
         */
        _codeMirrorValue: '',

        _codeMirrorInitDef: null,

        constructor: function () {
            this._codeMirrorInitDef = new Deferred;
        },

        /**
         * Setup tinymce on the instance..
         */
        startup: function () {
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
         * Let setters know CodeMirror is ready.
         */
        _codeMirrorInit: function () {
            this._codeMirrorInitDef.resolve();
        },

        /**
         * Makes sure we don't cascade into a stack overflow.
         *
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
            if (!this._setByCodeMirror) {
                this.set('_codeMirrorValue', value);
            }

            return this;
        },


        _codeMirrorChange: function (value) {
            this._setByCodeMirror = true;
            this.set('value', this.get('_codeMirrorValue'));
            this._setByCodeMirror = false;
        },

        _get_codeMirrorValueAttr: function () {
            return this._codeMirrorInstance.getCode();
        },

        _set_codeMirrorValueAttr: function (value) {
            this._codeMirrorValue = value;

            if (!!this._codeMirrorInstance) {
                this._codeMirrorInstance.setCode(value);
            } else {
                console.info('setter inFlight');
                this._codeMirrorInitDef.then(lang.hitch(this, function () {
                    this._codeMirrorInstance.setCode(value);
                }));
            }

            return this;
        }
    });
});
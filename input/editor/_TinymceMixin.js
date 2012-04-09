define([
    'module', '../../util/class/declare',
    'dojo/_base/lang', 'dojo/dom-attr', 'dojo/_base/Deferred',
    'config/tinymce-config',
    '../../amd/tinymce!'
], function (
    module, declare,
    lang, domAttr, Deferred,
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
         * @protected
         * @type {tinymce.Editor}
         */
        _tinymceInstance: null,

        /**
         * @protected
         * @type {string}
         */
        _tinymceValue: '',

        /**
         * @protected
         * @type {dojo._base.Deferred}
         */
        _tinymceInitDef: null,

        /**
         * Initialize the deferred, so we can block setters while tinymce loads.
         */
        constructor: function () {
            this._tinymceInitDef = new Deferred;
        },

        /**
         * Setup tinymce on the instance..
         */
        postCreate: function () {
            this.inherited(arguments);

            var node = this.get('_tinymceNode');
            if (!node) {
                throw '_tinymceNode is a required property.';
            }

            var id = this.id + '_tinymceEditor';
            domAttr.set(node, 'id', id);

            // Make sure we're connected.
            config = lang.mixin({}, config, {
                setup: lang.hitch(this, function (editor) {
                    editor.onInit.add(this._tinymceInit, this);
                    editor.onChange.add(this._tinymceChange, this);
                })
            });

            this._tinymceInstance = new tinymce.Editor(id, config);
            this._tinymceInstance.init();
        },

        /**
         * @protected
         * Let the widget know we've got tinymce running.
         */
        _tinymceInit: function () {
            this._tinymceInitDef.resolve();
        },

        /**
         * Makes sure we don't cascade into a stack overflow.
         *
         * @private
         * @type {boolean}
         */
        _setByTinymce: false,

        /**
         * Safely set tinymce's value to that of this widget.
         *
         * @public
         * @param {string}
         * @return {T}
         */
        _setValueAttr: function (value) {
            this.inherited(arguments);
            if (!this._setByTinymce) {
                this.set('_tinymceValue', value);
            }

            return this;
        },

        /**
         * Update the _Widget's value prop.
         * @protected
         */
        _tinymceChange: function () {
            this._setByTinymce = true;
            this.set('value', this.get('_tinymceValue'));
            this._setByTinymce = false;
        },

        /**
         * @protected
         * @param {Object} settings See tinymce.Editor.getContent for details.
         * @return {*} normally a string, but affected by settings.
         */
        _get_tinymceValueAttr: function (settings) {
            return this._tinymceInstance.getContent(settings);
        },

        /**
         * @protected
         * @param {*} value
         * @param {Object} settings See tinymce.Editor.setContent for details.
         * @return {T}
         */
        _set_tinymceValueAttr: function (value, settings) {
            this._tinymceValue = value;

            this._tinymceInitDef.then(lang.hitch(this, function () {
                this._tinymceInstance.setContent(value, settings);
            }));

            return this;
        }
    });
});
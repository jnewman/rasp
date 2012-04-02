define([
    'module', '../util/class/declare',
    'dijit/_WidgetBase', 'dijit/_TemplatedMixin', 'dijit/_WidgetsInTemplateMixin',
    './editor/_TinymceMixin', './editor/_CodeMirrorMixin',
    'dojo/text!./templates/Editor.html',
        'dijit/layout/TabContainer', 'dijit/layout/ContentPane'
], function (
    module, declare,
    _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
    _TinymceMixin, _CodeMirrorMixin,
    template
) {
    return declare(module.id, [
        _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
        _TinymceMixin, _CodeMirrorMixin
    ], {
        /**
         * @type {string}
         */
        templateString: template,

        /**
         * @type {Element}
         */
        _valueNode: null,

        /**
         * @param {string} value
         * @return {T}
         */
        _setValueAttr: function (value) {
            // Required for our mixins to know they need to update their
            // editors.
            this.inherited(arguments);

            this._valueNode.innerHTML = value;
            return this;
        }
    });
});
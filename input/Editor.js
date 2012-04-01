define([
    'module', '../util/class/declare',
    'dijit/_WidgetBase', 'dijit/_TemplatedMixin', 'dijit/_WidgetsInTemplateMixin',
    './editor/_TinymceMixin', './editor/_CodeMirrorMixin',
    'dojo/text!./templates/Editor.html'
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
        templateString: template
    });
});
define([
    'module', '../util/class/declare',
    'dijit/_WidgetBase', 'dijit/_TemplatedMixin', 'dijit/_WidgetsInTemplateMixin',
    './editor/_TinymceMixin', './editor/CodeMirrorMixin',
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
        templateString: template
    });
});
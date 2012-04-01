define([
    'tinymce/classes/tinymce'
], {
    load: function (name, req, load) {
        req([
            'config/tinymce-config',

                'tinymce/classes/util/Dispatcher',
                'tinymce/classes/util/URI',
                'tinymce/classes/util/Cookie',
                'tinymce/classes/util/JSON',
                'tinymce/classes/util/JSONP',
                'tinymce/classes/util/XHR',
                'tinymce/classes/util/JSONRequest',
                'tinymce/classes/util/VK',
                'tinymce/classes/util/Quirks',

                // tinymce.html.*
                'tinymce/classes/html/Entities',
                'tinymce/classes/html/Styles',
                'tinymce/classes/html/Schema',
                'tinymce/classes/html/SaxParser',
                'tinymce/classes/html/Node',
                'tinymce/classes/html/DomParser',
                'tinymce/classes/html/Serializer',
                'tinymce/classes/html/Writer',

                // tinymce.dom.*
                'tinymce/classes/dom/DOMUtils',
                'tinymce/classes/dom/Range',
                'tinymce/classes/dom/TridentSelection',
                'tinymce/classes/dom/Sizzle',
                'tinymce/classes/dom/EventUtils',
                'tinymce/classes/dom/Element',
                'tinymce/classes/dom/Selection',
                'tinymce/classes/dom/Serializer',
                'tinymce/classes/dom/ScriptLoader',
                'tinymce/classes/dom/TreeWalker',
                'tinymce/classes/dom/RangeUtils',

                // tinymce.ui.*
                'tinymce/classes/ui/KeyboardNavigation',
                'tinymce/classes/ui/Control',
                'tinymce/classes/ui/Container',
                'tinymce/classes/ui/Separator',
                'tinymce/classes/ui/MenuItem',
                'tinymce/classes/ui/Menu',
                'tinymce/classes/ui/DropMenu',
                'tinymce/classes/ui/Button',
                'tinymce/classes/ui/ListBox',
                'tinymce/classes/ui/NativeListBox',
                'tinymce/classes/ui/MenuButton',
                'tinymce/classes/ui/SplitButton',
                'tinymce/classes/ui/ColorSplitButton',
                'tinymce/classes/ui/ToolbarGroup',
                'tinymce/classes/ui/Toolbar',

                // tinymce.*
                'tinymce/classes/AddOnManager',
                'tinymce/classes/EditorManager',
                'tinymce/classes/Editor',
                'tinymce/classes/EditorCommands',
                'tinymce/classes/UndoManager',
                'tinymce/classes/ForceBlocks',
                'tinymce/classes/ControlManager',
                'tinymce/classes/WindowManager',
                'tinymce/classes/Formatter',
                'tinymce/classes/LegacyInput'
        ], function (config) {
            req([
                'tinymce/plugins/advhr/editor_plugin_src',
                'tinymce/plugins/contextmenu/editor_plugin_src',
                'tinymce/plugins/inlinepopups/editor_plugin_src',
                'tinymce/plugins/pagebreak/editor_plugin_src',
                'tinymce/plugins/tabfocus/editor_plugin_src',
                'tinymce/plugins/advimage/editor_plugin_src',
                'tinymce/plugins/directionality/editor_plugin_src',
                'tinymce/plugins/insertdatetime/editor_plugin_src',
                'tinymce/plugins/paste/editor_plugin_src',
                'tinymce/plugins/table/editor_plugin_src',
                'tinymce/plugins/advlink/editor_plugin_src',
                'tinymce/plugins/emotions/editor_plugin_src',
                'tinymce/plugins/layer/editor_plugin_src',
                'tinymce/plugins/preview/editor_plugin_src',
                'tinymce/plugins/template/editor_plugin_src',
                'tinymce/plugins/advlist/editor_plugin_src',
                'tinymce/plugins/example/editor_plugin_src',
                'tinymce/plugins/legacyoutput/editor_plugin_src',
                'tinymce/plugins/print/editor_plugin_src',
                'tinymce/plugins/visualchars/editor_plugin_src',
                'tinymce/plugins/autolink/editor_plugin_src',
                'tinymce/plugins/example_dependency/editor_plugin_src',
                'tinymce/plugins/lists/editor_plugin_src',
                'tinymce/plugins/save/editor_plugin_src',
                'tinymce/plugins/wordcount/editor_plugin_src',
                'tinymce/plugins/autoresize/editor_plugin_src',
                'tinymce/plugins/fullpage/editor_plugin_src',
                'tinymce/plugins/media/editor_plugin_src',
                'tinymce/plugins/searchreplace/editor_plugin_src',
                'tinymce/plugins/xhtmlxtras/editor_plugin_src',
                'tinymce/plugins/autosave/editor_plugin_src',
                'tinymce/plugins/fullscreen/editor_plugin_src',
                'tinymce/plugins/nonbreaking/editor_plugin_src',
                'tinymce/plugins/spellchecker/editor_plugin_src',
                'tinymce/plugins/bbcode/editor_plugin_src',
                'tinymce/plugins/iespell/editor_plugin_src',
                'tinymce/plugins/noneditable/editor_plugin_src',
                'tinymce/plugins/style/editor_plugin_src',
                'tinymce/themes/advanced/editor_template_src'

            ], function () {
                load(tinymce);
            });
        });
    }
});
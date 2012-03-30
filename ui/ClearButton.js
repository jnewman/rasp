define([
    'module', '../util/class/define',
    'dojo/query', '../util/dom/getAncestors', './Button'
], function (
    module, define,
    query, getAncestors, Button
) {
    return define(module.id, [Button], {
        /**
         * @type {HTMLFormElement}
         */
        containingForm: null,

        /**
         * Figure out which form we're in.
         */
        postCreate: function () {
            this.inherited(arguments);

            this.containingForm = getAncestors(this.domNode).filter(function (ancestor) {
                return ancestor.nodeName === 'FORM';
            });
        },

        /**
         * Clear all the inputs in the containingForm.
         */
        onClick: function () {
            var form = this.containingForm;
            form.set && form.set('value', (function () {
                var values = {};

                var key = '';
                for (key in form.get('value')) {
                    values[key] = '';
                }

                return values;
            })());
        }
    });
})
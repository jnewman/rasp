define(['dojo/_base/NodeList'], function (NodeList) {
    return function (node) {
        var ancestors = [];

        while (node.parentNode) {
            node = node.parentNode;
            ancestors.push(node);
        }

        return new NodeList(ancestors);
    };
});
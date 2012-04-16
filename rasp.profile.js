var profile = {
    basePath: '..',

    action: 'release',

    cssOptimize: 'comments',

    mini: true,

    optimize: 'closure',

    layerOptimize: 'closure',

    stripConsole: 'all',

    selectorEngine: 'acme',

    layers: {
        'dojo/dojo': {
            include: [
                'dojo/dojo',
                'dojo/domReady',
                'rasp/main',
                'rasp/run'
            ],

            boot: true,
            customBase: true
        }
    },

    staticHasFeatures: {
        'dojo-trace-api':0,
        'dojo-log-api':0,
        'dojo-publish-privates':0,
        'dojo-sync-loader':0,
        'dojo-test-sniff':0
    },

    resourceTags: {
        test: function (filename, mid) {
            return false;
        },

        miniExclude: function (filename, mid) {
            return mid in {
                'rasp/profile': 1
            };
        }
    }
};
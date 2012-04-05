define([
    'module', 'require', 'dojo/_base/array', 'dojo/_base/Deferred'
], function (module, require, arrayUtils, Deferred) {
    var modules = {};

    return {
        load: function (name, req, load, config) {
            var mod = req.module;
            var deps = mod.deps;
            var mods = modules[mod.mid];
            var last = 0;

            // We queue these up once.
            if (!mods) {
                deps = arrayUtils.filter(deps, function (dep, i) {
                    // The dependency is being loaded by this plugin.
                    return dep.plugin && dep.plugin.mid === module.id
                });

                last = deps.length - 1;

                mods = modules[mod.mid] = arrayUtils.map(deps, function (dep, i) {
                    return {
                        // The last one doesn't need a deferred.
                        def: i < last ? new Deferred : null,
                        name: req.toUrl(dep.prid)
                    };
                });

                // Start loading the first one.
                req([name], function () {
                    mods[0].def.resolve(name);
                    load(req(name));
                    console.log("Loaded", name);
                });

            } else { // i > 0
                last = mods.length - 1;

                arrayUtils.forEach(mods, function (mod, i) {
                    if (req.toUrl(mod.name) === req.toUrl(name)) { // It's this module.
                        // Wait for the previous, then load this one.
                        mods[i - 1].def.then(function () {
                            req([name], function () {

                                // The last module doesn't need a deferred.
                                mod.def && mod.def.resolve(name);

                                load(req(name));
                                console.log("Loaded", name);
                            });
                        });
                    }
                });
            }

        }
    };
});
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (settings) {
    return {
        // Add asset Information
        assets: true,
        // Sort assets by a field
        assetsSort: "field",
        // Add information about cached (not built) modules
        cached: true,
        // Show cached assets (setting this to `false` only shows emitted files)
        cachedAssets: true,
        // Add children information
        children: true,
        // Add chunk information (setting this to `false` allows for a less verbose output)
        chunks: true,
        // Add built modules information to chunk information
        chunkModules: true,
        // Add the origins of chunks and chunk merging info
        chunkOrigins: true,
        // Sort the chunks by a field
        chunksSort: "field",
        // Context directory for request shortening
        context: settings.path.resolve.source,
        // `webpack --colors` equivalent
        colors: true,
        // Display the distance from the entry point for each module
        depth: true,
        // Display the entry points with the corresponding bundles
        entrypoints: true,
        // Add errors
        errors: true,
        // Add details to errors (like resolving log)
        errorDetails: true,
        // Exclude modules which match one of the given strings or regular expressions
        exclude: [/node_modules[\\\/]react/],
        // Add the hash of the compilation
        hash: true,
        // Set the maximum number of modules to be shown
        maxModules: 15,
        // Add built modules information
        modules: true,
        // Sort the modules by a field
        modulesSort: "field",
        // Show performance hint when file size exceeds `performance.maxAssetSize`
        performance: true,
        // Show the exports of the modules
        providedExports: true,
        // Add public path information
        publicPath: true,
        // Add information about the reasons why modules are included
        reasons: true,
        // Add the source code of modules
        source: true,
        // Add timing information
        timings: true,
        // Show which exports of a module are used
        usedExports: true,
        // Add webpack version information
        version: true,
        // Add warnings
        warnings: true
    };
};
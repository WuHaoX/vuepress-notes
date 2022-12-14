import { Bundler } from '@vuepress/core';
import { VueLoaderOptions } from 'vue-loader';
export { VueLoaderOptions } from 'vue-loader';
import { ModuleOptions, Compiler, Configuration } from 'webpack';
export { Configuration as WebpackConfiguration } from 'webpack';
import WebpackChainConfig from 'webpack-chain';
export { default as WebpackChainConfig } from 'webpack-chain';
import WebpackDevServer from 'webpack-dev-server';
export { default as WebpackDevServer } from 'webpack-dev-server';

interface LoaderContext {
    /**
     * Loader API version. Currently 2.
     * This is useful for providing backwards compatibility.
     * Using the version you can specify custom logic or fallbacks for breaking changes.
     */
    version: string;
    /**
     *  The directory of the module. Can be used as context for resolving other stuff.
     *  In the example: /abc because resource.js is in this directory
     */
    context: string;
    /**
     * Starting with webpack 4, the formerly `this.options.context` is provided as `this.rootContext`.
     */
    rootContext: string;
    /**
     * The resolved request string.
     * In the example: "/abc/loader1.js?xyz!/abc/node_modules/loader2/index.js!/abc/resource.js?rrr"
     */
    request: string;
    /**
     *  A string or any object. The query of the request for the current loader.
     */
    query: any;
    /**
     * A data object shared between the pitch and the normal phase.
     */
    data?: any;
    callback: LoaderCallback;
    /**
     * Make this loader async.
     */
    async(): LoaderCallback | undefined;
    /**
     *  Make this loader result cacheable. By default it's not cacheable.
     *  A cacheable loader must have a deterministic result, when inputs and dependencies haven't changed.
     *  This means the loader shouldn't have other dependencies than specified with this.addDependency.
     *  Most loaders are deterministic and cacheable.
     */
    cacheable(flag?: boolean): void;
    /**
     * An array of all the loaders. It is writeable in the pitch phase.
     * loaders = [{request: string, path: string, query: string, module: function}]
     *
     * In the example:
     * [
     *   { request: "/abc/loader1.js?xyz",
     *     path: "/abc/loader1.js",
     *     query: "?xyz",
     *     module: [Function]
     *   },
     *   { request: "/abc/node_modules/loader2/index.js",
     *     path: "/abc/node_modules/loader2/index.js",
     *     query: "",
     *     module: [Function]
     *   }
     * ]
     */
    loaders: any[];
    /**
     * The index in the loaders array of the current loader.
     * In the example: in loader1: 0, in loader2: 1
     */
    loaderIndex: number;
    /**
     * The resource part of the request, including query.
     * In the example: "/abc/resource.js?rrr"
     */
    resource: string;
    /**
     * The resource file.
     * In the example: "/abc/resource.js"
     */
    resourcePath: string;
    /**
     * The query of the resource.
     * In the example: "?rrr"
     */
    resourceQuery: string;
    /**
     * Emit a warning.
     */
    emitWarning(message: string | Error): void;
    /**
     * Emit a error.
     */
    emitError(message: string | Error): void;
    /**
     * Execute some code fragment like a module.
     *
     * Don't use require(this.resourcePath), use this function to make loaders chainable!
     *
     */
    exec(code: string, filename: string): any;
    /**
     * Resolves the given request to a module, applies all configured loaders and calls
     * back with the generated source, the sourceMap and the module instance (usually an
     * instance of NormalModule). Use this function if you need to know the source code
     * of another module to generate the result.
     */
    loadModule(request: string, callback: (err: Error | null, source: string, sourceMap: RawSourceMap, module: ModuleOptions) => void): any;
    /**
     * Resolve a request like a require expression.
     */
    resolve(context: string, request: string, callback: (err: Error, result: string) => void): any;
    /**
     * Resolve a request like a require expression.
     */
    resolveSync(context: string, request: string): string;
    /**
     * Adds a file as dependency of the loader result in order to make them watchable.
     * For example, html-loader uses this technique as it finds src and src-set attributes.
     * Then, it sets the url's for those attributes as dependencies of the html file that is parsed.
     */
    addDependency(file: string): void;
    /**
     * Adds a file as dependency of the loader result in order to make them watchable.
     * For example, html-loader uses this technique as it finds src and src-set attributes.
     * Then, it sets the url's for those attributes as dependencies of the html file that is parsed.
     */
    dependency(file: string): void;
    /**
     * Add a directory as dependency of the loader result.
     */
    addContextDependency(directory: string): void;
    /**
     * Remove all dependencies of the loader result. Even initial dependencies and these of other loaders. Consider using pitch.
     */
    clearDependencies(): void;
    /**
     * Pass values to the next loader.
     * If you know what your result exports if executed as module, set this value here (as a only element array).
     */
    value: any;
    /**
     * Passed from the last loader.
     * If you would execute the input argument as module, consider reading this variable for a shortcut (for performance).
     */
    inputValue: any;
    /**
     * A boolean flag. It is set when in debug mode.
     */
    debug: boolean;
    /**
     * Should the result be minimized.
     */
    minimize: boolean;
    /**
     * Should a SourceMap be generated.
     */
    sourceMap: boolean;
    /**
     * Target of compilation. Passed from configuration options.
     * Example values: "web", "node"
     */
    target: 'web' | 'webworker' | 'async-node' | 'node' | 'electron-main' | 'electron-renderer' | 'node-webkit' | string;
    /**
     * This boolean is set to true when this is compiled by webpack.
     *
     * Loaders were originally designed to also work as Babel transforms.
     * Therefore if you write a loader that works for both, you can use this property to know if
     * there is access to additional loaderContext and webpack features.
     */
    webpack: boolean;
    /**
     * Emit a file. This is webpack-specific.
     */
    emitFile(name: string, content: Buffer | string, sourceMap: any): void;
    /**
     * Access to the compilation's inputFileSystem property.
     */
    fs: any;
    /**
     * Which mode is webpack running.
     */
    mode: 'production' | 'development' | 'none';
    /**
     * Hacky access to the Compilation object of webpack.
     */
    _compilation: any;
    /**
     * Hacky access to the Compiler object of webpack.
     */
    _compiler: Compiler;
    /**
     * Hacky access to the Module object being loaded.
     */
    _module: any;
    /** Flag if HMR is enabled */
    hot: boolean;
}
declare type LoaderCallback = (err: Error | undefined | null, content?: string | Buffer, sourceMap?: RawSourceMap) => void;
interface StartOfSourceMap {
    file?: string;
    sourceRoot?: string;
}
interface RawSourceMap extends StartOfSourceMap {
    version: string;
    sources: string[];
    names: string[];
    sourcesContent?: string[];
    mappings: string;
}

/**
 * Options for bundler-webpack
 */
interface WebpackBundlerOptions {
    /**
     * use webpack-merge to set webpack config
     */
    configureWebpack?: (config: Configuration, isServer: boolean, isBuild: boolean) => Configuration | void;
    /**
     * use webpack-chain to set webpack config
     */
    chainWebpack?: (config: WebpackChainConfig, isServer: boolean, isBuild: boolean) => void;
    /**
     * `setupMiddlewares` config of webpack-dev-server
     */
    devServerSetupMiddlewares?: WebpackDevServer.Configuration['setupMiddlewares'];
    /**
     * vue-loader options
     */
    vue?: VueLoaderOptions;
    /**
     * postcss-loader options
     */
    postcss?: PostcssLoaderOptions;
    /**
     * stylus-loader options
     */
    stylus?: StylusLoaderOptions;
    /**
     * sass-loader options for scss files
     */
    scss?: SassLoaderOptions;
    /**
     * sass-loader options for sass files
     */
    sass?: SassLoaderOptions;
    /**
     * less-loader options
     */
    less?: LessLoaderOptions;
    /**
     * only target evergreen browsers or not
     */
    evergreen?: boolean;
}
/**
 * Common options for some webpack loaders
 */
interface LoaderOptions {
    sourceMap?: boolean;
    webpackImporter?: boolean;
    additionalData?: string | ((content: string, loaderContext: LoaderContext) => string);
}
/**
 * Common type for style pre-processor options
 */
declare type StylePreprocessorOptions<T extends Record<string, any> = Record<string, any>> = T | ((loaderContext: LoaderContext) => TextDecodeOptions);
/**
 * Options for postcss-loader
 *
 * @see https://github.com/webpack-contrib/postcss-loader#options
 */
interface PostcssLoaderOptions extends Pick<LoaderOptions, 'sourceMap'> {
    execute?: boolean;
    postcssOptions?: StylePreprocessorOptions;
    implementation?: ((...args: any) => any) | string;
}
/**
 * Options for stylus-loader
 *
 * @see https://github.com/webpack-contrib/stylus-loader#options
 */
interface StylusLoaderOptions extends LoaderOptions {
    stylusOptions?: StylePreprocessorOptions;
}
/**
 * Options for sass-loader
 *
 * @see https://github.com/webpack-contrib/sass-loader#options
 */
interface SassLoaderOptions extends LoaderOptions {
    implementation?: Record<string, any> | string;
    sassOptions?: StylePreprocessorOptions;
}
/**
 * Options for less-loader
 *
 * @see https://github.com/webpack-contrib/less-loader#options
 */
interface LessLoaderOptions extends LoaderOptions {
    lessOptions?: StylePreprocessorOptions;
}

declare const webpackBundler: (options?: WebpackBundlerOptions) => Bundler;

export { LessLoaderOptions, LoaderOptions, PostcssLoaderOptions, SassLoaderOptions, StylePreprocessorOptions, StylusLoaderOptions, WebpackBundlerOptions, webpackBundler as default, webpackBundler };

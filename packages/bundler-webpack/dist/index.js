// src/build/build.ts
import {
  colors,
  debug,
  fs as fs5,
  importFileDefault,
  withSpinner
} from "@vuepress/utils";
import webpack2 from "webpack";

// src/resolveWebpackConfig.ts
import { merge } from "webpack-merge";
var resolveWebpackConfig = ({
  config,
  options,
  isServer,
  isBuild
}) => {
  options.chainWebpack?.(config, isServer, isBuild);
  const webpackConfig = config.toConfig();
  const configureWebpackResult = options.configureWebpack?.(
    webpackConfig,
    isServer,
    isBuild
  );
  if (configureWebpackResult) {
    return merge(webpackConfig, configureWebpackResult);
  }
  return webpackConfig;
};

// src/build/createClientConfig.ts
import { createRequire as createRequire6 } from "module";
import { fs as fs3 } from "@vuepress/utils";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin2 from "mini-css-extract-plugin";

// src/config/createBaseConfig.ts
import Config from "webpack-chain";

// src/config/handleDevtool.ts
var handleDevtool = ({
  app,
  config,
  isBuild
}) => {
  if (app.env.isDebug) {
    config.devtool("source-map");
  } else if (!isBuild) {
    config.devtool("eval-cheap-module-source-map");
  }
};

// src/config/handleEntry.ts
import { fs } from "@vuepress/utils";
var handleEntry = ({
  app,
  config
}) => {
  config.entry("app").add(
    app.dir.client(
      fs.readJsonSync(app.dir.client("package.json")).exports["./app"]
    )
  );
};

// src/config/handleMode.ts
var handleMode = ({
  app,
  config,
  isBuild
}) => {
  config.mode(!isBuild || app.env.isDebug ? "development" : "production");
};

// src/config/handleModuleAssets.ts
var handleModuleAssets = ({
  app,
  config
}) => {
  config.module.rule("images").test(/\.(png|jpe?g|gif|webp)(\?.*)?$/).type("asset").set("generator", {
    filename: "assets/img/[name].[contenthash:8][ext]"
  });
  config.module.rule("svg").test(/\.(svg)(\?.*)?$/).type("asset/resource").set("generator", {
    filename: "assets/img/[name].[contenthash:8][ext]"
  });
  config.module.rule("media").test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/).type("asset/resource").set("generator", {
    filename: "assets/media/[name].[contenthash:8][ext]"
  });
  config.module.rule("fonts").test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i).type("asset/resource").set("generator", {
    filename: "assets/fonts/[name].[contenthash:8][ext]"
  });
};

// src/config/handleModuleJs.ts
import { createRequire } from "module";

// src/config/resolveEsbuildJsxOptions.ts
var resolveEsbuildJsxOptions = () => ({
  jsxFactory: "jsx",
  jsxFragment: "Fragment"
});

// src/config/handleModuleJs.ts
var require2 = createRequire(import.meta.url);
var handleModuleJs = ({
  options,
  config,
  isBuild,
  isServer
}) => {
  if (options.evergreen !== false || !isBuild || isServer) {
    return;
  }
  config.module.rule("js").test(/\.jsx?$/).exclude.add((filePath) => {
    if (/\.vue\.jsx?$/.test(filePath)) {
      return false;
    }
    if (/(@vuepress[/\\][^/\\]*|vuepress-[^/\\]*)[/\\](?!node_modules).*\.js$/.test(
      filePath
    )) {
      return false;
    }
    return /node_modules/.test(filePath);
  }).end().use("esbuild-loader").loader(require2.resolve("esbuild-loader")).options({
    target: "es2015",
    loader: "jsx",
    ...resolveEsbuildJsxOptions()
  }).end();
};

// src/config/handleModulePug.ts
var handleModulePug = ({ config }) => {
  config.module.rule("pug").test(/\.pug$/).use("pug-plain-loader").loader("pug-plain-loader");
};

// src/config/handleModuleStyles.ts
import { createRequire as createRequire2 } from "module";
import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import postcssCsso from "postcss-csso";
var require3 = createRequire2(import.meta.url);
var handleModuleStyles = ({
  options,
  config,
  isBuild,
  isServer
}) => {
  const createStyleRules = ({
    lang,
    test
  }) => {
    const baseRule = config.module.rule(lang).test(test);
    const modulesRule = baseRule.oneOf("modules").resourceQuery(/module/);
    const normalRule = baseRule.oneOf("normal");
    return {
      modulesRule,
      normalRule
    };
  };
  const applyStyleHandlers = ({
    rule,
    cssModules,
    loaderName,
    loaderOptions = {}
  }) => {
    if (!isServer) {
      if (isBuild) {
        rule.use("extract-css-loader").loader(MiniCssExtractPlugin.loader);
      } else {
        rule.use("style-loader").loader(require3.resolve("style-loader"));
      }
    }
    rule.use("css-loader").loader(require3.resolve("css-loader")).options({
      modules: cssModules ? {
        localIdentName: `[local]_[contenthash:base64:8]`,
        exportOnlyLocals: isServer
      } : false,
      importLoaders: 1
    });
    rule.use("postcss-loader").loader(require3.resolve("postcss-loader")).options({
      postcssOptions: {
        plugins: [autoprefixer, postcssCsso]
      },
      ...options.postcss
    });
    if (loaderName) {
      rule.use(loaderName).loader(loaderName).options(loaderOptions);
    }
  };
  const handleStyle = ({
    lang,
    test,
    loaderName,
    loaderOptions
  }) => {
    const { modulesRule, normalRule } = createStyleRules({
      lang,
      test
    });
    applyStyleHandlers({
      rule: modulesRule,
      cssModules: true,
      loaderName,
      loaderOptions
    });
    applyStyleHandlers({
      rule: normalRule,
      cssModules: false,
      loaderName,
      loaderOptions
    });
  };
  handleStyle({
    lang: "css",
    test: /\.css$/
  });
  handleStyle({
    lang: "postcss",
    test: /\.p(ost)?css$/
  });
  handleStyle({
    lang: "scss",
    test: /\.scss$/,
    loaderName: "sass-loader",
    loaderOptions: options.scss
  });
  handleStyle({
    lang: "sass",
    test: /\.sass$/,
    loaderName: "sass-loader",
    loaderOptions: options.sass
  });
  handleStyle({
    lang: "less",
    test: /\.less$/,
    loaderName: "less-loader",
    loaderOptions: options.less
  });
  handleStyle({
    lang: "stylus",
    test: /\.styl(us)?$/,
    loaderName: "stylus-loader",
    loaderOptions: {
      stylusOptions: {
        includeCSS: true,
        compress: false
      },
      ...options.stylus
    }
  });
};

// src/config/handleModuleTs.ts
import { createRequire as createRequire3 } from "module";
var require4 = createRequire3(import.meta.url);
var handleModuleTs = ({
  app,
  config
}) => {
  config.module.rule("ts").test(/\.tsx?/).use("esbuild-loader").loader(require4.resolve("esbuild-loader")).options({
    target: "es2018",
    loader: "tsx",
    ...resolveEsbuildJsxOptions()
  }).end();
};

// src/config/handleModuleVue.ts
import { createRequire as createRequire4 } from "module";
import { VueLoaderPlugin } from "vue-loader";
var require5 = createRequire4(import.meta.url);
var handleModuleVue = ({
  app,
  options,
  config,
  isServer
}) => {
  config.module.rule("vue").test(/\.vue$/).use("vue-loader").loader(require5.resolve("vue-loader")).options({
    ...options.vue,
    isServerBuild: isServer
  }).end();
  config.plugin("vue-loader").use(VueLoaderPlugin);
};

// src/config/handleModule.ts
var handleModule = ({
  app,
  options,
  config,
  isBuild,
  isServer
}) => {
  config.module.noParse(
    /(^(vue|vue-router|vuex|vuex-router-sync)$)|(^@vue\/[^/]*$)/
  );
  handleModuleVue({ app, options, config, isServer });
  handleModulePug({ config });
  handleModuleAssets({ app, config });
  handleModuleJs({ options, config, isBuild, isServer });
  handleModuleTs({ app, config });
  handleModuleStyles({ options, config, isBuild, isServer });
};

// src/config/handleNode.ts
var handleNode = ({ config }) => {
  config.node.merge({
    __filename: false,
    __dirname: false,
    global: false
  });
};

// src/config/handleOtherOptions.ts
import { createRequire as createRequire5 } from "module";
var require6 = createRequire5(import.meta.url);
var handleOtherOptions = ({
  app,
  config,
  isBuild,
  isServer
}) => {
  config.set("infrastructureLogging", {
    level: app.env.isDebug ? "info" : "error"
  });
  config.set("cache", {
    type: "filesystem",
    cacheDirectory: app.dir.cache(),
    version: JSON.stringify({
      isBuild,
      isServer,
      "version": app.version,
      "esbuild-loader": require6("esbuild-loader/package.json").version,
      "vue-loader": require6("vue-loader/package.json").version,
      "webpack": require6("webpack/package.json").version
    })
  });
};

// src/config/handlePluginDefine.ts
import webpack from "webpack";
var handlePluginDefine = async ({
  app,
  config,
  isBuild,
  isServer
}) => {
  config.plugin("define").use(webpack.DefinePlugin, [
    {
      __VUEPRESS_VERSION__: JSON.stringify(app.version),
      __VUEPRESS_DEV__: JSON.stringify(!isBuild),
      __VUEPRESS_SSR__: JSON.stringify(isServer),
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(app.env.isDebug)
    }
  ]);
  const defineResult = await app.pluginApi.hooks.define.process(app, isServer);
  config.plugin("define").tap(([options]) => {
    defineResult.forEach(
      (defineObject) => Object.entries(defineObject).forEach(([key, value]) => {
        options[key] = JSON.stringify(value);
      })
    );
    return [options];
  });
};

// src/config/handleResolve.ts
var handleResolve = async ({
  app,
  config,
  isServer
}) => {
  config.resolve.alias.set("@source", app.dir.source()).set("@temp", app.dir.temp()).set("@internal", app.dir.temp("internal"));
  config.merge({
    resolve: {
      extensionAlias: {
        ".js": [".ts", ".js"],
        ".mjs": [".mts", ".mjs"]
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".json"]
    }
  });
  config.resolve.extensions.merge([
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".vue",
    ".json"
  ]);
  const aliasResult = await app.pluginApi.hooks.alias.process(app, isServer);
  aliasResult.forEach(
    (aliasObject) => Object.entries(aliasObject).forEach(([key, value]) => {
      config.resolve.alias.set(key, value);
    })
  );
};

// src/config/createBaseConfig.ts
var createBaseConfig = async ({
  app,
  options,
  isBuild,
  isServer
}) => {
  const config = new Config();
  handleEntry({ app, config });
  handleMode({ app, config, isBuild });
  handleNode({ config });
  handleDevtool({ app, config, isBuild });
  await handleResolve({ app, config, isServer });
  handleModule({ app, options, config, isBuild, isServer });
  await handlePluginDefine({ app, config, isBuild, isServer });
  handleOtherOptions({ app, config, isBuild, isServer });
  return config;
};

// src/config/createClientBaseConfig.ts
var createClientBaseConfig = async ({
  app,
  options,
  isBuild
}) => {
  const config = await createBaseConfig({
    app,
    options,
    isServer: false,
    isBuild
  });
  config.output.path(app.dir.dest()).filename(
    isBuild ? "assets/js/[name].[chunkhash:8].js" : "assets/js/[name].js"
  ).publicPath(app.options.base);
  return config;
};

// src/build/ssr/createClientPlugin.ts
import { fs as fs2 } from "@vuepress/utils";

// src/build/ssr/utils.ts
var isJS = (file) => /\.js(\?[^.]+)?$/.test(file);
var isCSS = (file) => /\.css(\?[^.]+)?$/.test(file);

// src/build/ssr/createClientPlugin.ts
var createClientPlugin = (outputFile) => {
  const clientPlugin = {
    apply(compiler) {
      compiler.hooks.emit.tapPromise(
        "vuepress-client-plugin",
        async (compilation) => {
          const stats = compilation.getStats().toJson();
          const {
            assets = [],
            modules = [],
            entrypoints = {},
            chunks = []
          } = stats;
          const allFiles = assets.map((a) => a.name);
          const initialFiles = Object.keys(entrypoints).map((name) => entrypoints[name].assets.map((item) => item.name)).reduce((assets2, all) => all.concat(assets2), []).filter((file) => isJS(file) || isCSS(file));
          const asyncFiles = allFiles.filter(
            (file) => (isJS(file) || isCSS(file)) && !initialFiles.includes(file)
          );
          const assetModules = modules.filter(
            (m) => !!(m.assets && m.assets.length)
          );
          const manifestModules = {};
          const fileToIndex = (file) => allFiles.indexOf(file);
          modules.forEach((m) => {
            if (m.chunks.length !== 1) {
              return;
            }
            const cid = m.chunks[0];
            const chunk = chunks.find((c) => c.id === cid);
            if (!chunk || !chunk.files) {
              return;
            }
            const request = m.identifier.replace(/\s\w+$/, "");
            const files = [...chunk.files.map(fileToIndex)];
            assetModules.forEach((m2) => {
              if (m2.chunks.some((id) => id === cid)) {
                files.push(...m2.assets.map(fileToIndex));
              }
            });
            manifestModules[request] = files;
          });
          const clientManifest = {
            all: allFiles,
            initial: initialFiles,
            async: asyncFiles,
            modules: manifestModules
          };
          const clientManifestJson = JSON.stringify(clientManifest, null, 2);
          await fs2.outputFile(outputFile, clientManifestJson);
        }
      );
    }
  };
  return clientPlugin;
};

// src/build/createClientConfig.ts
var require7 = createRequire6(import.meta.url);
var clientManifestFilename = ".server/client-manifest.json";
var createClientConfig = async (app, options) => {
  const config = await createClientBaseConfig({
    app,
    options,
    isBuild: true
  });
  config.module.rule("vue").test(/\.vue$/).use("vuepress-loader").before("vue-loader").loader(require7.resolve("#vuepress-loader")).end();
  config.plugin("vuepress-client").use(createClientPlugin(app.dir.temp(clientManifestFilename)));
  if (fs3.pathExistsSync(app.dir.public())) {
    config.plugin("copy").use(CopyWebpackPlugin, [
      {
        patterns: [{ from: app.dir.public(), to: app.dir.dest() }]
      }
    ]);
  }
  config.plugin("extract-css").use(MiniCssExtractPlugin2, [
    {
      filename: "assets/css/styles.[chunkhash:8].css"
    }
  ]);
  config.optimization.splitChunks({
    cacheGroups: {
      styles: {
        idHint: "styles",
        test: (m) => /css\/mini-extract/.test(m.type),
        chunks: "all",
        enforce: true,
        reuseExistingChunk: true
      },
      vendor: {
        idHint: "vendor",
        test: /node_modules/,
        chunks: "all",
        priority: -10,
        reuseExistingChunk: true
      }
    }
  });
  config.optimization.runtimeChunk(true);
  if (!app.env.isDebug) {
    config.performance.hints(false);
  }
  return config;
};

// src/build/createServerConfig.ts
import { createRequire as createRequire7 } from "module";
var require8 = createRequire7(import.meta.url);
var createServerConfig = async (app, options) => {
  const isBuild = true;
  const isServer = true;
  const config = await createBaseConfig({
    app,
    options,
    isBuild,
    isServer
  });
  config.output.path(app.dir.temp(".server")).filename("app.cjs").publicPath(app.options.base).libraryTarget("commonjs2");
  config.target("node");
  config.externals(["vue"]);
  config.devtool("source-map");
  config.optimization.minimize(false);
  config.module.rule("vue").test(/\.vue$/).use("vuepress-loader").before("vue-loader").loader(require8.resolve("#vuepress-loader")).end();
  return config;
};

// src/build/renderPage.ts
import { fs as fs4, renderHead } from "@vuepress/utils";
import { ssrContextKey } from "vue";

// src/build/renderPagePrefetchLinks.ts
var renderPagePrefetchLinks = ({
  app,
  asyncFilesMeta,
  pageClientFilesMeta
}) => {
  const shouldPrefetch = app.options.shouldPrefetch;
  if (shouldPrefetch === false) {
    return "";
  }
  const prefetchFilesMeta = asyncFilesMeta.filter(
    ({ file }) => !pageClientFilesMeta.some((f) => f.file === file)
  );
  return prefetchFilesMeta.map(({ file, type }) => {
    if (shouldPrefetch !== true && !shouldPrefetch(file, type)) {
      return "";
    }
    return `<link rel="prefetch" href="${app.options.base}${file}" as="${type}" />`;
  }).join("");
};

// src/build/renderPagePreloadLinks.ts
var renderPagePreloadLinks = ({
  app,
  initialFilesMeta,
  pageClientFilesMeta
}) => {
  const shouldPreload = app.options.shouldPreload;
  if (shouldPreload === false) {
    return "";
  }
  const preloadFilesMeta = [...initialFilesMeta, ...pageClientFilesMeta];
  return preloadFilesMeta.map(({ file, extension, type }) => {
    if (shouldPreload === true && type !== "script" && type !== "style") {
      return "";
    }
    if (shouldPreload !== true && !shouldPreload(file, type)) {
      return "";
    }
    return `<link rel="preload" href="${app.options.base}${file}"${type !== "" ? ` as="${type}"` : ""}${type === "font" ? ` type="font/${extension}" crossorigin` : ""}>`;
  }).join("");
};

// src/build/renderPageScripts.ts
var renderPageScripts = ({
  app,
  initialFilesMeta,
  pageClientFilesMeta
}) => [...pageClientFilesMeta, ...initialFilesMeta].filter(({ type }) => type === "script").map(
  ({ file }) => `<script src="${app.options.base}${file}" defer><\/script>`
).join("");

// src/build/renderPageStyles.ts
var renderPageStyles = ({
  app,
  initialFilesMeta,
  pageClientFilesMeta
}) => [...initialFilesMeta, ...pageClientFilesMeta].filter(({ type }) => type === "style").flatMap(({ file }) => [
  `<link rel="preload" href="${app.options.base}${file}" as="style" />`,
  `<link rel="stylesheet" href="${app.options.base}${file}" />`
]).join("");

// src/build/resolvePageClientFilesMeta.ts
var resolvePageClientFilesMeta = ({
  moduleRequests,
  moduleFilesMetaMap
}) => {
  const files = /* @__PURE__ */ new Set();
  moduleRequests.forEach((request) => {
    moduleFilesMetaMap[request]?.forEach((file) => files.add(file));
  });
  return Array.from(files);
};

// src/build/renderPage.ts
var renderPage = async ({
  app,
  page,
  vueApp,
  vueRouter,
  renderToString,
  ssrTemplate,
  allFilesMeta,
  initialFilesMeta,
  asyncFilesMeta,
  moduleFilesMetaMap
}) => {
  await vueRouter.push(page.path);
  await vueRouter.isReady();
  delete vueApp._context.provides[ssrContextKey];
  const ssrContext = {
    _registeredComponents: /* @__PURE__ */ new Set(),
    lang: "en",
    head: []
  };
  const pageRendered = await renderToString(vueApp, ssrContext);
  const pageClientFilesMeta = resolvePageClientFilesMeta({
    moduleRequests: Array.from(ssrContext._registeredComponents),
    moduleFilesMetaMap
  });
  const html = ssrTemplate.replace("{{ version }}", app.version).replace("{{ lang }}", ssrContext.lang).replace(
    "<!--vuepress-ssr-head-->",
    ssrContext.head.map(renderHead).join("")
  ).replace(
    "<!--vuepress-ssr-resources-->",
    `${renderPagePreloadLinks({
      app,
      initialFilesMeta,
      pageClientFilesMeta
    })}${renderPagePrefetchLinks({
      app,
      asyncFilesMeta,
      pageClientFilesMeta
    })}`
  ).replace(
    "<!--vuepress-ssr-styles-->",
    renderPageStyles({ app, initialFilesMeta, pageClientFilesMeta })
  ).replace("<!--vuepress-ssr-app-->", () => pageRendered).replace(
    "<!--vuepress-ssr-scripts-->",
    renderPageScripts({ app, initialFilesMeta, pageClientFilesMeta })
  );
  await fs4.outputFile(page.htmlFilePath, html);
};

// src/build/resolveFileMeta.ts
import { path } from "@vuepress/utils";

// src/build/resolveFileMetaType.ts
var resolveFileMetaType = (extension) => {
  if (extension === "js") {
    return "script";
  }
  if (extension === "css") {
    return "style";
  }
  if (/jpe?g|png|svg|gif|webp|ico/.test(extension)) {
    return "image";
  }
  if (/woff2?|ttf|otf|eot/.test(extension)) {
    return "font";
  }
  return "";
};

// src/build/resolveFileMeta.ts
var resolveFileMeta = (file) => {
  const extension = path.extname(file).slice(1);
  return {
    file,
    extension,
    type: resolveFileMetaType(extension)
  };
};

// src/build/resolveClientManifestMeta.ts
var resolveClientManifestMeta = ({
  all,
  initial,
  async,
  modules
}) => {
  const allFilesMeta = all.map(resolveFileMeta);
  const initialFilesMeta = initial.map(resolveFileMeta);
  const asyncFilesMeta = async.map(resolveFileMeta);
  const moduleFilesMetaMap = Object.fromEntries(
    Object.entries(modules).map(([moduleRequest, assetFilesIndex]) => {
      return [
        moduleRequest,
        assetFilesIndex.map((fileIndex) => allFilesMeta[fileIndex]).filter(
          ({ file, type }) => async.includes(file) || type !== "style" && type !== "script"
        )
      ];
    })
  );
  return {
    allFilesMeta,
    initialFilesMeta,
    asyncFilesMeta,
    moduleFilesMetaMap
  };
};

// src/build/build.ts
var log = debug("vuepress:bundler-webpack/build");
var build = async (options, app) => {
  await app.pluginApi.hooks.extendsBundlerOptions.process(options, app);
  log("compiling start");
  await withSpinner("Compiling with webpack")(async () => {
    const clientConfig = resolveWebpackConfig({
      config: await createClientConfig(app, options),
      options,
      isServer: false,
      isBuild: true
    });
    const serverConfig = resolveWebpackConfig({
      config: await createServerConfig(app, options),
      options,
      isServer: true,
      isBuild: true
    });
    await new Promise((resolve, reject) => {
      webpack2([clientConfig, serverConfig], (err, stats) => {
        if (err) {
          reject(err);
        } else if (stats?.hasErrors()) {
          stats.toJson().errors?.forEach((err2) => {
            console.error(err2);
          });
          reject(new Error("Failed to compile with errors"));
        } else {
          if (stats?.hasWarnings()) {
            stats.toJson().warnings?.forEach((warning) => {
              console.warn(warning);
            });
          }
          resolve();
        }
      });
    });
  });
  log("compiling finish");
  await withSpinner(`Rendering ${app.pages.length} pages`)(async (spinner) => {
    const ssrTemplate = (await fs5.readFile(app.options.templateBuild)).toString();
    const clientManifestPath = app.dir.temp(clientManifestFilename);
    const clientManifest = await fs5.readJson(clientManifestPath);
    const {
      allFilesMeta,
      initialFilesMeta,
      asyncFilesMeta,
      moduleFilesMetaMap
    } = resolveClientManifestMeta(clientManifest);
    const serverEntryPath = app.dir.temp(".server/app.cjs");
    const { createVueApp } = await importFileDefault(serverEntryPath);
    const { app: vueApp, router: vueRouter } = await createVueApp();
    const { renderToString } = await import("vue/server-renderer");
    for (const page of app.pages) {
      if (spinner) {
        spinner.text = `Rendering pages ${colors.magenta(page.path)}`;
      }
      await renderPage({
        app,
        page,
        vueApp,
        vueRouter,
        renderToString,
        ssrTemplate,
        allFilesMeta,
        initialFilesMeta,
        asyncFilesMeta,
        moduleFilesMetaMap
      });
    }
  });
  if (!app.env.isDebug) {
    await fs5.remove(app.dir.temp(".server"));
  }
};

// src/dev/dev.ts
import { colors as colors2, logger, ora } from "@vuepress/utils";
import webpack4 from "webpack";
import WebpackDevServer from "webpack-dev-server";

// src/dev/createDevConfig.ts
import HtmlPlugin from "html-webpack-plugin";
import webpack3 from "webpack";
var createDevConfig = async (app, options) => {
  const config = await createClientBaseConfig({
    app,
    options,
    isBuild: false
  });
  config.plugin("html").use(HtmlPlugin, [
    {
      template: app.options.templateDev
    }
  ]);
  config.plugin("hmr").use(webpack3.HotModuleReplacementPlugin);
  return config;
};

// src/dev/createDevServerConfig.ts
import { sep } from "path";
import { path as path2 } from "@vuepress/utils";

// src/dev/trailingSlashMiddleware.ts
var trailingSlashMiddleware = (req, res, next) => {
  if (!["GET", "HEAD"].includes(req.method) || req.path.split("/").pop()?.includes(".") || req.path.endsWith("/")) {
    return next();
  }
  const query = req.url.slice(req.path.length);
  res.redirect(302, `${req.path}/${query}`);
};

// src/dev/createDevServerConfig.ts
var createDevServerConfig = async (app, options) => ({
  allowedHosts: "all",
  compress: true,
  devMiddleware: {
    publicPath: app.options.base,
    writeToDisk: false,
    stats: app.env.isDebug ? "normal" : "errors-warnings"
  },
  headers: {
    "access-control-allow-origin": "*"
  },
  historyApiFallback: {
    disableDotRule: true,
    rewrites: [{ from: /./, to: path2.join(app.options.base, "index.html") }]
  },
  host: app.options.host,
  hot: true,
  setupMiddlewares: (middlewares, devServer) => {
    devServer.app?.use(trailingSlashMiddleware);
    return options.devServerSetupMiddlewares?.(middlewares, devServer) ?? middlewares;
  },
  open: app.options.open,
  port: app.options.port,
  static: {
    directory: app.dir.public().replace("/", sep),
    publicPath: app.options.base,
    watch: {
      ignoreInitial: true,
      ignored: [
        "node_modules"
      ]
    }
  }
});

// src/dev/dev.ts
var dev = async (options, app) => {
  await app.pluginApi.hooks.extendsBundlerOptions.process(options, app);
  const webpackConfig = resolveWebpackConfig({
    config: await createDevConfig(app, options),
    options,
    isServer: false,
    isBuild: false
  });
  const compiler = webpack4(webpackConfig);
  const serverConfig = await createDevServerConfig(app, options);
  const server = new WebpackDevServer(serverConfig, compiler);
  const [, close] = await Promise.all([
    server.start(),
    new Promise((resolve, reject) => {
      const spinner = ora();
      let hasStarted = false;
      let hasFinished = false;
      compiler.hooks.beforeCompile.tap("vuepress-dev", () => {
        if (hasStarted)
          return;
        hasStarted = true;
        spinner.start("Compiling with webpack...");
      });
      compiler.hooks.done.tap("vuepress-dev", ({ endTime, startTime }) => {
        if (hasFinished)
          return;
        hasFinished = true;
        spinner.succeed(`Compilation finished in ${endTime - startTime}ms`);
        const url = `http://${serverConfig.host === "0.0.0.0" ? "localhost" : serverConfig.host}:${serverConfig.port}${app.options.base}`;
        logger.success(
          `VuePress webpack dev server is listening at ${colors2.cyan(url)}`
        );
        resolve(() => server.stop());
      });
      compiler.hooks.failed.tap("vuepress-dev", (err) => {
        if (hasFinished)
          return;
        hasFinished = true;
        spinner.fail("Compilation failed");
        reject(err);
      });
    })
  ]);
  return close;
};

// src/webpackBundler.ts
var webpackBundler = (options = {}) => ({
  name: "@vuepress/bundler-webpack",
  dev: (app) => dev(options, app),
  build: (app) => build(options, app)
});

// src/index.ts
var src_default = webpackBundler;
export {
  src_default as default,
  webpackBundler
};

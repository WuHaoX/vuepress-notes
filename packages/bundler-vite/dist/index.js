// src/build/build.ts
import { colors, debug, fs as fs3, importFile, withSpinner } from "@vuepress/utils";
import { build as viteBuild } from "vite";

// src/resolveViteConfig.ts
import { default as vuePlugin } from "@vitejs/plugin-vue";

// src/plugins/constantsReplacementPlugin.ts
var pageComponentFileRegexp = /\.html\.vue($|\?)/;
var vueTemplateRegexp = /<template>[\s\S]*<\/template>/;
var jsStringBreaker = "\u200B";
var vueTemplateBreaker = "<wbr>";
var constantsReplacementPlugin = (app) => {
  const pagesDirPrefix = `${app.dir.temp("pages")}/`;
  let constantsRegexp;
  const replaceConstants = (code, breaker) => code.replace(
    constantsRegexp,
    (constant) => `${constant[0]}${breaker}${constant.slice(1)}`
  );
  return {
    name: "vuepress:constants-replacement",
    enforce: "pre",
    configResolved(resolvedConfig) {
      const constants = ["process.env"];
      if (app.env.isBuild) {
        constants.push("import.meta");
        if (resolvedConfig.define) {
          constants.push(...Object.keys(resolvedConfig.define));
        }
      }
      constantsRegexp = new RegExp(
        `\\b(${constants.map((item) => item.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")).join("|")})`,
        "g"
      );
    },
    transform(code, id) {
      if (!id.startsWith(pagesDirPrefix))
        return;
      if (!pageComponentFileRegexp.test(id)) {
        return replaceConstants(code, jsStringBreaker);
      }
      const match = code.match(vueTemplateRegexp);
      if (match === null)
        return;
      return code.substring(0, match.index) + replaceConstants(match[0], vueTemplateBreaker) + code.substring(match.index + match[0].length);
    }
  };
};

// src/plugins/mainPlugin.ts
import { fs } from "@vuepress/utils";
import autoprefixer from "autoprefixer";
import history from "connect-history-api-fallback";
import postcssrc from "postcss-load-config";
var mainPlugin = ({
  app,
  isBuild,
  isServer
}) => ({
  name: "vuepress:main",
  config: async () => {
    if (!isBuild) {
      await app.writeTemp(
        "vite-root/index.html",
        fs.readFileSync(app.options.templateDev).toString().replace(
          /<\/body>/,
          `<script type="module">
import '@vuepress/client/app'
<\/script>
</body>`
        )
      );
    }
    const clientPackages = [
      "@vuepress/client",
      ...app.pluginApi.plugins.filter(({ name }) => name !== "user-config").map(({ name }) => name)
    ];
    let postcssPlugins;
    try {
      const postcssConfigResult = await postcssrc();
      postcssPlugins = postcssConfigResult.plugins;
    } catch (error) {
      postcssPlugins = [autoprefixer];
    }
    return {
      root: app.dir.temp("vite-root"),
      base: app.options.base,
      mode: !isBuild || app.env.isDebug ? "development" : "production",
      define: await resolveDefine({ app, isBuild, isServer }),
      publicDir: app.dir.public(),
      cacheDir: app.dir.cache(),
      resolve: {
        alias: await resolveAlias({ app, isServer })
      },
      css: {
        postcss: {
          plugins: isServer ? [] : postcssPlugins
        },
        preprocessorOptions: {
          scss: { charset: false }
        }
      },
      server: {
        host: app.options.host,
        port: app.options.port,
        open: app.options.open
      },
      build: {
        ssr: isServer,
        outDir: isServer ? app.dir.temp(".server") : app.dir.dest(),
        emptyOutDir: false,
        cssCodeSplit: false,
        rollupOptions: {
          input: app.dir.client(
            fs.readJsonSync(app.dir.client("package.json")).exports["./app"]
          ),
          output: {
            ...isServer ? {
              entryFileNames: `[name].[hash].mjs`
            } : {}
          },
          preserveEntrySignatures: "allow-extension"
        },
        minify: isServer ? false : !app.env.isDebug
      },
      optimizeDeps: {
        exclude: clientPackages
      },
      ssr: {
        format: "esm",
        noExternal: clientPackages
      }
    };
  },
  generateBundle(_, bundle) {
    if (isServer) {
      Object.keys(bundle).forEach((key) => {
        if (bundle[key].type === "asset") {
          delete bundle[key];
        }
      });
    }
  },
  configureServer(server) {
    return () => {
      server.middlewares.use(
        history({
          rewrites: [
            {
              from: /\.html$/,
              to: "/index.html"
            }
          ]
        })
      );
    };
  }
});
var resolveAlias = async ({
  app,
  isServer
}) => {
  const alias = {
    "@internal": app.dir.temp("internal"),
    "@temp": app.dir.temp(),
    "@source": app.dir.source()
  };
  const aliasResult = await app.pluginApi.hooks.alias.process(app, isServer);
  aliasResult.forEach(
    (aliasObject) => Object.entries(aliasObject).forEach(([key, value]) => {
      alias[key] = value;
    })
  );
  return [
    ...Object.keys(alias).map((item) => ({
      find: item,
      replacement: alias[item]
    })),
    ...isServer ? [] : [
      {
        find: /^vue$/,
        replacement: "vue/dist/vue.runtime.esm-bundler.js"
      },
      {
        find: /^vue-router$/,
        replacement: "vue-router/dist/vue-router.esm-bundler.js"
      }
    ]
  ];
};
var resolveDefine = async ({
  app,
  isBuild,
  isServer
}) => {
  const define = {
    __VUEPRESS_VERSION__: JSON.stringify(app.version),
    __VUEPRESS_DEV__: JSON.stringify(!isBuild),
    __VUEPRESS_SSR__: JSON.stringify(isServer),
    __VUE_OPTIONS_API__: JSON.stringify(true),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(app.env.isDebug)
  };
  if (app.env.isDebug) {
    define["process.env.NODE_ENV"] = JSON.stringify("development");
  }
  const defineResult = await app.pluginApi.hooks.define.process(app, isServer);
  defineResult.forEach(
    (defineObject) => Object.entries(defineObject).forEach(([key, value]) => {
      define[key] = JSON.stringify(value);
    })
  );
  return define;
};

// src/plugins/userConfigPlugin.ts
var userConfigPlugin = (options) => ({
  name: "vuepress:user-config",
  config: () => options.viteOptions ?? {}
});

// src/resolveViteConfig.ts
var resolveViteConfig = async ({
  app,
  options,
  isBuild,
  isServer
}) => {
  return {
    clearScreen: false,
    configFile: false,
    logLevel: !isBuild || app.env.isDebug ? "info" : "warn",
    esbuild: {
      charset: "utf8"
    },
    plugins: [
      vuePlugin(options.vuePluginOptions),
      constantsReplacementPlugin(app),
      mainPlugin({ app, isBuild, isServer }),
      userConfigPlugin(options)
    ]
  };
};

// src/build/renderPage.ts
import { fs as fs2, renderHead } from "@vuepress/utils";
import { ssrContextKey } from "vue";

// src/build/renderPagePrefetchLinks.ts
var renderPagePrefetchLinks = ({
  app,
  outputEntryChunk,
  pageChunkFiles
}) => {
  const shouldPrefetch = app.options.shouldPrefetch;
  if (shouldPrefetch === false) {
    return "";
  }
  const prefetchFiles = outputEntryChunk.dynamicImports.filter(
    (item) => !pageChunkFiles.some((file) => file === item)
  );
  return prefetchFiles.map((item) => {
    const type = item.endsWith(".js") ? "script" : item.endsWith(".css") ? "style" : "";
    if (shouldPrefetch !== true && !shouldPrefetch(item, type)) {
      return "";
    }
    return `<link rel="prefetch" href="${app.options.base}${item}" as="${type}" />`;
  }).join("");
};

// src/build/renderPagePreloadLinks.ts
var renderPagePreloadLinks = ({
  app,
  outputEntryChunk,
  pageChunkFiles
}) => {
  const shouldPreload = app.options.shouldPreload;
  if (shouldPreload === false) {
    return "";
  }
  const preloadFiles = Array.from(
    /* @__PURE__ */ new Set([
      outputEntryChunk.fileName,
      ...outputEntryChunk.imports,
      ...pageChunkFiles
    ])
  );
  return preloadFiles.map((item) => {
    const type = item.endsWith(".js") ? "script" : item.endsWith(".css") ? "style" : "";
    if (shouldPreload === true && type !== "script" && type !== "style") {
      return "";
    }
    if (shouldPreload !== true && !shouldPreload(item, type)) {
      return "";
    }
    if (type === "script") {
      return `<link rel="modulepreload" href="${app.options.base}${item}">`;
    }
    return `<link rel="preload" href="${app.options.base}${item}"${type !== "" ? ` as="${type}"` : ""}>`;
  }).join("");
};

// src/build/renderPageScripts.ts
var renderPageScripts = ({
  app,
  outputEntryChunk
}) => `<script type="module" src="${app.options.base}${outputEntryChunk.fileName}" defer><\/script>`;

// src/build/renderPageStyles.ts
var renderPageStyles = ({
  app,
  outputCssAsset
}) => outputCssAsset ? [
  `<link rel="preload" href="${app.options.base}${outputCssAsset.fileName}" as="style" />`,
  `<link rel="stylesheet" href="${app.options.base}${outputCssAsset.fileName}" />`
].join("") : "";

// src/build/resolvePageChunkFiles.ts
var resolvePageChunkFiles = ({
  page,
  output
}) => output.filter(
  (item) => item.type === "chunk" && (item.facadeModuleId === page.componentFilePath || item.facadeModuleId === page.dataFilePath)
).flatMap(({ fileName, imports, dynamicImports }) => [
  fileName,
  ...imports,
  ...dynamicImports
]);

// src/build/renderPage.ts
var renderPage = async ({
  app,
  page,
  vueApp,
  vueRouter,
  renderToString,
  ssrTemplate,
  output,
  outputEntryChunk,
  outputCssAsset
}) => {
  await vueRouter.push(page.path);
  await vueRouter.isReady();
  delete vueApp._context.provides[ssrContextKey];
  const ssrContext = {
    lang: "en",
    head: []
  };
  const pageRendered = await renderToString(vueApp, ssrContext);
  const pageChunkFiles = resolvePageChunkFiles({ page, output });
  const html = ssrTemplate.replace("{{ version }}", app.version).replace("{{ lang }}", ssrContext.lang).replace(
    "<!--vuepress-ssr-head-->",
    ssrContext.head.map(renderHead).join("")
  ).replace(
    "<!--vuepress-ssr-resources-->",
    `${renderPagePreloadLinks({
      app,
      outputEntryChunk,
      pageChunkFiles
    })}${renderPagePrefetchLinks({
      app,
      outputEntryChunk,
      pageChunkFiles
    })}`
  ).replace(
    "<!--vuepress-ssr-styles-->",
    renderPageStyles({ app, outputCssAsset })
  ).replace("<!--vuepress-ssr-app-->", () => pageRendered).replace(
    "<!--vuepress-ssr-scripts-->",
    renderPageScripts({ app, outputEntryChunk })
  );
  await fs2.outputFile(page.htmlFilePath, html);
};

// src/build/build.ts
var log = debug("vuepress:bundler-vite/build");
var build = async (options, app) => {
  await app.pluginApi.hooks.extendsBundlerOptions.process(options, app);
  log("compiling start");
  let clientOutput;
  let serverOutput;
  await withSpinner("Compiling with vite")(async () => {
    const clientConfig = await resolveViteConfig({
      app,
      options,
      isBuild: true,
      isServer: false
    });
    const serverConfig = await resolveViteConfig({
      app,
      options,
      isBuild: true,
      isServer: true
    });
    [clientOutput, serverOutput] = await Promise.all([
      viteBuild(clientConfig),
      viteBuild(serverConfig)
    ]);
  });
  log("compiling finish");
  await withSpinner(`Rendering ${app.pages.length} pages`)(async (spinner) => {
    const ssrTemplate = (await fs3.readFile(app.options.templateBuild)).toString();
    const clientEntryChunk = clientOutput.output.find(
      (item) => item.type === "chunk" && item.isEntry
    );
    const clientCssAsset = clientOutput.output.find(
      (item) => item.type === "asset" && item.fileName.endsWith(".css")
    );
    const serverEntryChunk = serverOutput.output.find(
      (item) => item.type === "chunk" && item.isEntry
    );
    const serverEntryPath = app.dir.temp(".server", serverEntryChunk.fileName);
    const { createVueApp } = await importFile(serverEntryPath);
    const { app: vueApp, router: vueRouter } = await createVueApp();
    const { renderToString } = await import("vue/server-renderer");
    for (const page of app.pages) {
      if (spinner)
        spinner.text = `Rendering pages ${colors.magenta(page.path)}`;
      await renderPage({
        app,
        page,
        vueApp,
        vueRouter,
        renderToString,
        ssrTemplate,
        output: clientOutput.output,
        outputEntryChunk: clientEntryChunk,
        outputCssAsset: clientCssAsset
      });
    }
  });
  if (!app.env.isDebug) {
    await fs3.remove(app.dir.temp(".server"));
  }
};

// src/dev.ts
import { createRequire } from "module";
import { colors as colors2, fs as fs4 } from "@vuepress/utils";
import { createServer } from "vite";
var require2 = createRequire(import.meta.url);
var dev = async (options, app) => {
  await app.pluginApi.hooks.extendsBundlerOptions.process(options, app);
  const viteConfig = await resolveViteConfig({
    app,
    options,
    isBuild: false,
    isServer: false
  });
  const server = await createServer(viteConfig);
  await server.listen();
  const viteVersion = fs4.readJsonSync(
    require2.resolve("vite/package.json")
  ).version;
  server.config.logger.info(
    colors2.cyan(`
  vite v${viteVersion}`) + colors2.green(` dev server running at:
`),
    {
      clear: !server.config.logger.hasWarned
    }
  );
  server.printUrls();
  return server.close.bind(server);
};

// src/viteBundler.ts
var viteBundler = (options = {}) => ({
  name: "@vuepress/bundler-vite",
  dev: (app) => dev(options, app),
  build: (app) => build(options, app)
});

// src/index.ts
var src_default = viteBundler;
export {
  src_default as default,
  viteBundler
};

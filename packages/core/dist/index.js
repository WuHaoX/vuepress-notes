// src/app/prepare/prepareClientConfigs.ts
var prepareClientConfigs = async (app) => {
  const clientConfigFiles = await app.pluginApi.hooks.clientConfigFile.process(
    app
  );
  const content = `${clientConfigFiles.map((filePath, index) => `import clientConfig${index} from '${filePath}'`).join("\n")}

export const clientConfigs = [
${clientConfigFiles.map((_, index) => `  clientConfig${index},`).join("\n")}
]
`;
  await app.writeTemp("internal/clientConfigs.js", content);
};

// src/app/prepare/preparePageComponent.ts
var preparePageComponent = async (app, page) => {
  await app.writeTemp(
    page.componentFilePathRelative,
    [
      `${page.sfcBlocks.template?.tagOpen}<div>${page.sfcBlocks.template?.contentStripped}</div>${page.sfcBlocks.template?.tagClose}
`,
      page.sfcBlocks.script?.content,
      page.sfcBlocks.scriptSetup?.content,
      ...page.sfcBlocks.styles.map((item) => item.content),
      ...page.sfcBlocks.customBlocks.map((item) => item.content)
    ].join("\n")
  );
};

// src/app/prepare/preparePageData.ts
var HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
`;
var preparePageData = async (app, page) => {
  let content = `export const data = JSON.parse(${JSON.stringify(
    JSON.stringify(page.data)
  )})
`;
  if (app.env.isDev) {
    content += HMR_CODE;
  }
  await app.writeTemp(page.dataFilePathRelative, content);
};

// src/app/prepare/preparePagesComponents.ts
var preparePagesComponents = async (app) => {
  const content = `import { defineAsyncComponent } from 'vue'

export const pagesComponents = {${app.pages.map(
    ({ key, path: path9, componentFilePath, componentFileChunkName }) => `
  // path: ${path9}
  ${JSON.stringify(key)}: defineAsyncComponent(() => import(${componentFileChunkName ? `/* webpackChunkName: "${componentFileChunkName}" */` : ""}${JSON.stringify(componentFilePath)})),`
  ).join("")}
}
`;
  await app.writeTemp("internal/pagesComponents.js", content);
};

// src/app/prepare/preparePagesData.ts
var preparePagesData = async (app) => {
  const content = `export const pagesData = {${app.pages.map(
    ({ key, path: path9, dataFilePath, dataFileChunkName }) => `
  // path: ${path9}
  ${JSON.stringify(key)}: () => import(${dataFileChunkName ? `/* webpackChunkName: "${dataFileChunkName}" */` : ""}${JSON.stringify(dataFilePath)}).then(({ data }) => data),`
  ).join("")}
}
`;
  await app.writeTemp("internal/pagesData.js", content);
};

// src/app/prepare/preparePagesRoutes.ts
import { ensureLeadingSlash } from "@vuepress/shared";
var resolvePageRouteItem = ({
  key,
  path: path9,
  pathInferred,
  filePathRelative,
  routeMeta
}) => {
  const redirectsSet = /* @__PURE__ */ new Set();
  redirectsSet.add(decodeURI(path9));
  if (path9.endsWith("/")) {
    redirectsSet.add(path9 + "index.html");
  } else {
    redirectsSet.add(path9.replace(/.html$/, ""));
  }
  if (pathInferred !== null) {
    redirectsSet.add(pathInferred);
    redirectsSet.add(encodeURI(pathInferred));
  }
  if (filePathRelative !== null) {
    const filenamePath = ensureLeadingSlash(filePathRelative);
    redirectsSet.add(filenamePath);
    redirectsSet.add(encodeURI(filenamePath));
  }
  redirectsSet.delete(path9);
  return [key, path9, routeMeta, [...redirectsSet]];
};
var preparePagesRoutes = async (app) => {
  const routeItems = app.pages.map(resolvePageRouteItem);
  const content = `export const pagesRoutes = [${routeItems.map((routeItem) => `
  ${JSON.stringify(routeItem)},`).join("")}
]
`;
  await app.writeTemp("internal/pagesRoutes.js", content);
};

// src/app/prepare/prepareSiteData.ts
var HMR_CODE2 = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
`;
var prepareSiteData = async (app) => {
  let content = `export const siteData = JSON.parse(${JSON.stringify(
    JSON.stringify(app.siteData)
  )})
`;
  if (app.env.isDev) {
    content += HMR_CODE2;
  }
  await app.writeTemp("internal/siteData.js", content);
};

// src/app/appInit.ts
import { debug as debug3 } from "@vuepress/utils";

// src/app/resolveAppMarkdown.ts
import { createMarkdown } from "@vuepress/markdown";
var resolveAppMarkdown = async (app) => {
  await app.pluginApi.hooks.extendsMarkdownOptions.process(
    app.options.markdown,
    app
  );
  const markdown = createMarkdown(app.options.markdown);
  await app.pluginApi.hooks.extendsMarkdown.process(markdown, app);
  return markdown;
};

// src/app/resolveAppPages.ts
import { debug as debug2, globby } from "@vuepress/utils";

// src/page/inferPagePath.ts
import { ensureLeadingSlash as ensureLeadingSlash2, resolveLocalePath } from "@vuepress/shared";
var inferPagePath = ({
  app,
  filePathRelative
}) => {
  if (!filePathRelative) {
    return {
      pathInferred: null,
      pathLocale: "/"
    };
  }
  const pathInferred = ensureLeadingSlash2(filePathRelative).replace(/\.md$/, ".html").replace(/\/(README|index).html$/i, "/");
  const pathLocale = resolveLocalePath(app.siteData.locales, pathInferred);
  return {
    pathInferred,
    pathLocale
  };
};

// src/page/renderPageContent.ts
var renderPageContent = async ({
  app,
  content,
  filePath,
  filePathRelative,
  options
}) => {
  const markdownEnv = {
    base: app.options.base,
    filePath,
    filePathRelative,
    frontmatter: { ...options.frontmatter }
  };
  const contentRendered = app.markdown.render(content, markdownEnv);
  const {
    excerpt = "",
    frontmatter = {},
    headers = [],
    importedFiles = [],
    links = [],
    sfcBlocks = {
      template: null,
      script: null,
      scriptSetup: null,
      scripts: [],
      styles: [],
      customBlocks: []
    },
    title = ""
  } = markdownEnv;
  return {
    contentRendered,
    deps: importedFiles,
    excerpt,
    frontmatter,
    headers,
    links,
    sfcBlocks,
    title: frontmatter.title ?? title
  };
};

// src/page/resolvePageComponentInfo.ts
import { path } from "@vuepress/utils";
var resolvePageComponentInfo = async ({
  app,
  htmlFilePathRelative,
  key
}) => {
  const componentFilePathRelative = path.join(
    "pages",
    `${htmlFilePathRelative}.vue`
  );
  const componentFilePath = app.dir.temp(componentFilePathRelative);
  const componentFileChunkName = key;
  return {
    componentFilePath,
    componentFilePathRelative,
    componentFileChunkName
  };
};

// src/page/resolvePageDataInfo.ts
import { path as path2 } from "@vuepress/utils";
var resolvePageDataInfo = ({
  app,
  htmlFilePathRelative,
  key
}) => {
  const dataFilePathRelative = path2.join("pages", `${htmlFilePathRelative}.js`);
  const dataFilePath = app.dir.temp(dataFilePathRelative);
  const dataFileChunkName = key;
  return {
    dataFilePath,
    dataFilePathRelative,
    dataFileChunkName
  };
};

// src/page/resolvePageDate.ts
import { formatDateString, isString } from "@vuepress/shared";
import { path as path3 } from "@vuepress/utils";
var FILENAME_DATE_RE = /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?-(.*)$/;
var DIRNAME_DATE_RE = /(\d{4})\/(\d{1,2})(?:\/(\d{1,2}))?(\/|$)/;
var DEFAULT_DATE = "0000-00-00";
var resolvePageDate = ({
  frontmatter,
  filePathRelative
}) => {
  if (frontmatter.date instanceof Date) {
    return formatDateString(
      [
        frontmatter.date.getUTCFullYear(),
        frontmatter.date.getUTCMonth() + 1,
        frontmatter.date.getUTCDate()
      ].join("-"),
      DEFAULT_DATE
    );
  }
  if (isString(frontmatter.date)) {
    return formatDateString(frontmatter.date, DEFAULT_DATE);
  }
  if (filePathRelative === null) {
    return DEFAULT_DATE;
  }
  const filename = path3.parse(filePathRelative).name;
  if (filename) {
    const matches = filename.match(FILENAME_DATE_RE);
    if (matches) {
      return formatDateString(
        `${matches[1]}-${matches[2]}-${matches[3] ?? "01"}`,
        DEFAULT_DATE
      );
    }
  }
  const dirname = path3.dirname(filePathRelative);
  if (dirname !== ".") {
    const matches = dirname.match(DIRNAME_DATE_RE);
    if (matches) {
      return formatDateString(
        `${matches[1]}-${matches[2]}-${matches[3] ?? "01"}`,
        DEFAULT_DATE
      );
    }
  }
  return DEFAULT_DATE;
};

// src/page/resolvePageFileContent.ts
import { debug, fs } from "@vuepress/utils";
var log = debug("vuepress:core/page");
var resolvePageFileContent = async ({
  filePath,
  options
}) => {
  if (filePath) {
    try {
      const content = await fs.readFile(filePath, "utf-8");
      return content;
    } catch (e) {
      log(e instanceof Error ? e.message : e);
    }
  }
  return options.content ?? "";
};

// src/page/resolvePageFilePath.ts
import { logger, path as path4 } from "@vuepress/utils";
var resolvePageFilePath = ({
  app,
  options
}) => {
  if (!options.filePath) {
    return {
      filePath: null,
      filePathRelative: null
    };
  }
  if (!path4.isAbsolute(options.filePath)) {
    throw logger.createError(
      `filePath is not absolute file path: ${options.filePath}}`
    );
  }
  return {
    filePath: options.filePath,
    filePathRelative: path4.relative(app.dir.source(), options.filePath)
  };
};

// src/page/resolvePageHtmlInfo.ts
import { removeLeadingSlash } from "@vuepress/shared";
var resolvePageHtmlInfo = ({
  app,
  path: pagePath
}) => {
  const htmlFilePathRelative = removeLeadingSlash(
    decodeURI(pagePath.replace(/\/$/, "/index.html"))
  );
  const htmlFilePath = app.dir.dest(htmlFilePathRelative);
  return {
    htmlFilePath,
    htmlFilePathRelative
  };
};

// src/page/resolvePageKey.ts
import { hash } from "@vuepress/utils";
var resolvePageKey = ({ path: path9 }) => `v-${hash(path9)}`;

// src/page/resolvePageLang.ts
import { isString as isString2 } from "@vuepress/shared";
var resolvePageLang = ({
  app,
  frontmatter,
  pathLocale
}) => {
  if (isString2(frontmatter.lang) && frontmatter.lang) {
    return frontmatter.lang;
  }
  return app.siteData.locales[pathLocale]?.lang ?? app.siteData.lang;
};

// src/page/resolvePagePath.ts
import { ensureEndingSlash } from "@vuepress/shared";
import { logger as logger2 } from "@vuepress/utils";
var resolvePagePath = ({
  permalink,
  pathInferred,
  options
}) => {
  let pagePath = options.path || permalink || pathInferred;
  if (!pagePath) {
    throw logger2.createError(
      `page path is empty, page options: ${JSON.stringify(options, null, 2)}`
    );
  }
  if (!pagePath.endsWith(".html")) {
    pagePath = ensureEndingSlash(pagePath);
  }
  return encodeURI(pagePath);
};

// src/page/resolvePagePermalink.ts
import { ensureLeadingSlash as ensureLeadingSlash3, isString as isString3 } from "@vuepress/shared";
import { path as path5 } from "@vuepress/utils";
var resolvePagePermalink = ({
  app,
  frontmatter,
  slug,
  date,
  pathInferred,
  pathLocale
}) => {
  if (isString3(frontmatter.permalink)) {
    return frontmatter.permalink;
  }
  const permalinkPattern = getPermalinkPattern({ app, frontmatter });
  if (permalinkPattern === null) {
    return null;
  }
  const [year, month, day] = date.split("-");
  const link = path5.join(
    pathLocale,
    permalinkPattern.replace(/:year/, year).replace(/:month/, month).replace(/:day/, day).replace(/:slug/, slug).replace(/:raw/, pathInferred?.replace(/^\//, "") ?? "")
  );
  return ensureLeadingSlash3(link);
};
var getPermalinkPattern = ({
  app,
  frontmatter
}) => {
  if (frontmatter.permalinkPattern === null) {
    return null;
  }
  if (isString3(frontmatter.permalinkPattern)) {
    return frontmatter.permalinkPattern;
  }
  return app.options.permalinkPattern;
};

// src/page/resolvePageRouteMeta.ts
var resolvePageRouteMeta = ({
  frontmatter
}) => frontmatter.routeMeta ?? {};

// src/page/resolvePageSlug.ts
import { path as path6 } from "@vuepress/utils";
var DATE_RE = /(\d{4}-\d{1,2}(-\d{1,2})?)-(.*)/;
var resolvePageSlug = ({
  filePathRelative
}) => {
  if (!filePathRelative) {
    return "";
  }
  const filename = path6.parse(filePathRelative).name;
  const match = filename.match(DATE_RE);
  return match ? match[3] : filename;
};

// src/page/createPage.ts
var createPage = async (app, options) => {
  await app.pluginApi.hooks.extendsPageOptions.process(options, app);
  const { filePath, filePathRelative } = resolvePageFilePath({
    app,
    options
  });
  const content = await resolvePageFileContent({ filePath, options });
  const {
    contentRendered,
    deps,
    excerpt,
    frontmatter,
    headers,
    links,
    sfcBlocks,
    title
  } = await renderPageContent({
    app,
    content,
    filePath,
    filePathRelative,
    options
  });
  const routeMeta = resolvePageRouteMeta({ frontmatter });
  const slug = resolvePageSlug({ filePathRelative });
  const date = resolvePageDate({ frontmatter, filePathRelative });
  const { pathInferred, pathLocale } = inferPagePath({ app, filePathRelative });
  const lang = resolvePageLang({ app, frontmatter, pathLocale });
  const permalink = resolvePagePermalink({
    app,
    frontmatter,
    slug,
    date,
    pathInferred,
    pathLocale
  });
  const path9 = resolvePagePath({ permalink, pathInferred, options });
  const key = resolvePageKey({ path: path9 });
  const { htmlFilePath, htmlFilePathRelative } = resolvePageHtmlInfo({
    app,
    path: path9
  });
  const {
    componentFilePath,
    componentFilePathRelative,
    componentFileChunkName
  } = await resolvePageComponentInfo({
    app,
    htmlFilePathRelative,
    key
  });
  const { dataFilePath, dataFilePathRelative, dataFileChunkName } = resolvePageDataInfo({ app, htmlFilePathRelative, key });
  const page = {
    data: {
      key,
      path: path9,
      title,
      lang,
      frontmatter,
      excerpt,
      headers
    },
    key,
    path: path9,
    title,
    lang,
    frontmatter,
    excerpt,
    headers,
    content,
    contentRendered,
    date,
    deps,
    links,
    pathInferred,
    pathLocale,
    permalink,
    routeMeta,
    sfcBlocks,
    slug,
    filePath,
    filePathRelative,
    componentFilePath,
    componentFilePathRelative,
    componentFileChunkName,
    dataFilePath,
    dataFilePathRelative,
    dataFileChunkName,
    htmlFilePath,
    htmlFilePathRelative
  };
  await app.pluginApi.hooks.extendsPage.process(page, app);
  return page;
};

// src/app/resolveAppPages.ts
var log2 = debug2("vuepress:core/app");
var resolveAppPages = async (app) => {
  log2("resolveAppPages start");
  const pageFilePaths = await globby(app.options.pagePatterns, {
    absolute: true,
    cwd: app.dir.source()
  });
  const pages = await Promise.all(
    pageFilePaths.map((filePath) => createPage(app, { filePath }))
  );
  if (!pages.some((page) => page.path === "/404.html")) {
    pages.push(
      await createPage(app, {
        path: "/404.html",
        frontmatter: {
          layout: "NotFound"
        }
      })
    );
  }
  log2("resolveAppPages finish");
  return pages;
};

// src/app/appInit.ts
var log3 = debug3("vuepress:core/app");
var appInit = async (app) => {
  log3("init start");
  app.pluginApi.registerHooks();
  app.markdown = await resolveAppMarkdown(app);
  app.pages = await resolveAppPages(app);
  await app.pluginApi.hooks.onInitialized.process(app);
  log3("init finish");
};

// src/app/appPrepare.ts
import { debug as debug4 } from "@vuepress/utils";
var log4 = debug4("vuepress:core/app");
var appPrepare = async (app) => {
  log4("prepare start");
  for (const page of app.pages) {
    await preparePageComponent(app, page);
  }
  await preparePagesComponents(app);
  for (const page of app.pages) {
    await preparePageData(app, page);
  }
  await preparePagesData(app);
  await preparePagesRoutes(app);
  await prepareSiteData(app);
  await prepareClientConfigs(app);
  await app.pluginApi.hooks.onPrepared.process(app);
  log4("prepare finish");
};

// src/app/appUse.ts
import { colors, debug as debug5, warn } from "@vuepress/utils";

// src/app/resolvePluginObject.ts
import { isFunction } from "@vuepress/shared";
var resolvePluginObject = (app, plugin) => isFunction(plugin) ? plugin(app) : plugin;

// src/app/appUse.ts
var log5 = debug5("vuepress:core/app");
var appUse = (app, rawPlugin) => {
  const pluginObject = resolvePluginObject(app, rawPlugin);
  if (!pluginObject.name) {
    warn(`an anonymous plugin or theme was detected and ignored`);
    return app;
  }
  log5(`use plugin ${colors.magenta(pluginObject.name)}`);
  if (pluginObject.multiple !== true) {
    const duplicateIndex = app.pluginApi.plugins.findIndex(
      ({ name }) => name === pluginObject.name
    );
    if (duplicateIndex !== -1) {
      app.pluginApi.plugins.splice(duplicateIndex, 1);
      warn(
        `plugin ${colors.magenta(
          pluginObject.name
        )} has been used multiple times, only the last one will take effect`
      );
    }
  }
  app.pluginApi.plugins.push(pluginObject);
  return app;
};

// src/pluginApi/createHookQueue.ts
import { colors as colors2, debug as debug6, logger as logger3 } from "@vuepress/utils";
var log6 = debug6("vuepress:core/plugin-api");
var createHookQueue = (name) => {
  const items = [];
  const hookQueue = {
    name,
    items,
    add: (item) => {
      items.push(item);
    },
    process: async (...args) => {
      const results = [];
      for (const item of items) {
        log6(
          `process ${colors2.magenta(name)} from ${colors2.magenta(
            item.pluginName
          )}`
        );
        try {
          const result = await item.hook(...args);
          if (result !== void 0) {
            results.push(result);
          }
        } catch (e) {
          logger3.error(
            `error in hook ${colors2.magenta(name)} from ${colors2.magenta(
              item.pluginName
            )}`
          );
          throw e;
        }
      }
      return results;
    }
  };
  return hookQueue;
};

// src/pluginApi/createPluginApiHooks.ts
var createPluginApiHooks = () => ({
  onInitialized: createHookQueue("onInitialized"),
  onPrepared: createHookQueue("onPrepared"),
  onWatched: createHookQueue("onWatched"),
  onGenerated: createHookQueue("onGenerated"),
  extendsMarkdownOptions: createHookQueue("extendsMarkdownOptions"),
  extendsMarkdown: createHookQueue("extendsMarkdown"),
  extendsPageOptions: createHookQueue("extendsPageOptions"),
  extendsPage: createHookQueue("extendsPage"),
  extendsBundlerOptions: createHookQueue("extendsBundlerOptions"),
  clientConfigFile: createHookQueue("clientConfigFile"),
  alias: createHookQueue("alias"),
  define: createHookQueue("define")
});

// src/pluginApi/normalizeAliasDefineHook.ts
import { isFunction as isFunction2 } from "@vuepress/shared";
var normalizeAliasDefineHook = (hook) => async (app, isServer) => isFunction2(hook) ? hook(app, isServer) : hook;

// src/pluginApi/normalizeClientConfigFileHook.ts
import { isFunction as isFunction3 } from "@vuepress/shared";
import { fs as fs2, logger as logger4 } from "@vuepress/utils";
var normalizeClientConfigFileHook = (hook) => async (app) => {
  const clientConfigFileResult = isFunction3(hook) ? await hook(app) : hook;
  const isExisted = await fs2.pathExists(clientConfigFileResult);
  if (!isExisted) {
    throw logger4.createError(
      `client config file does not exist: ${clientConfigFileResult}`
    );
  }
  return clientConfigFileResult;
};

// src/pluginApi/createPluginApiRegisterHooks.ts
var createPluginApiRegisterHooks = (plugins, hooks) => () => {
  plugins.forEach(
    ({
      name: pluginName,
      multiple,
      alias,
      define,
      clientConfigFile,
      ...commonHooks
    }) => {
      if (alias) {
        hooks.alias.add({
          pluginName,
          hook: normalizeAliasDefineHook(alias)
        });
      }
      if (define) {
        hooks.define.add({
          pluginName,
          hook: normalizeAliasDefineHook(define)
        });
      }
      if (clientConfigFile) {
        hooks.clientConfigFile.add({
          pluginName,
          hook: normalizeClientConfigFileHook(clientConfigFile)
        });
      }
      Object.keys(commonHooks).forEach((key) => {
        if (hooks[key] && commonHooks[key]) {
          hooks[key].add({
            pluginName,
            hook: commonHooks[key]
          });
        }
      });
    }
  );
};

// src/pluginApi/createPluginApi.ts
var createPluginApi = () => {
  const plugins = [];
  const hooks = createPluginApiHooks();
  const registerHooks = createPluginApiRegisterHooks(plugins, hooks);
  return {
    plugins,
    hooks,
    registerHooks
  };
};

// src/app/resolveAppDir.ts
import { createRequire } from "module";
import { path as path7 } from "@vuepress/utils";
var require2 = createRequire(import.meta.url);
var createAppDirFunction = (baseDir) => {
  return (...args) => path7.resolve(baseDir, ...args);
};
var resolveAppDir = (options) => {
  const cache = createAppDirFunction(options.cache);
  const temp = createAppDirFunction(options.temp);
  const source = createAppDirFunction(options.source);
  const dest = createAppDirFunction(options.dest);
  const publicDir = createAppDirFunction(options.public);
  const client = createAppDirFunction(
    path7.resolve(require2.resolve("@vuepress/client/package.json"), "..")
  );
  return {
    cache,
    temp,
    source,
    dest,
    client,
    public: publicDir
  };
};

// src/app/resolveAppEnv.ts
var resolveAppEnv = (options, isBuild) => ({
  isBuild,
  isDev: !isBuild,
  isDebug: options.debug
});

// src/app/resolveAppOptions.ts
import { createRequire as createRequire2 } from "module";
import { path as path8 } from "@vuepress/utils";
var require3 = createRequire2(import.meta.url);
var resolveAppOptions = ({
  base = "/",
  lang = "en-US",
  title = "",
  description = "",
  head = [],
  locales = {},
  source,
  dest = path8.resolve(source, ".vuepress/dist"),
  temp = path8.resolve(source, ".vuepress/.temp"),
  cache = path8.resolve(source, ".vuepress/.cache"),
  public: publicDir = path8.resolve(source, ".vuepress/public"),
  host = "0.0.0.0",
  port = 8080,
  open = false,
  templateDev = path8.normalize(
    require3.resolve("@vuepress/client/templates/dev.html")
  ),
  shouldPreload = true,
  shouldPrefetch = true,
  templateBuild = path8.normalize(
    require3.resolve("@vuepress/client/templates/build.html")
  ),
  bundler,
  debug: debug7 = false,
  markdown = {},
  pagePatterns = ["**/*.md", "!.vuepress", "!node_modules"],
  permalinkPattern = null,
  plugins = [],
  theme
}) => ({
  base,
  lang,
  title,
  description,
  head,
  locales,
  source,
  dest,
  temp,
  cache,
  public: publicDir,
  host,
  port,
  open,
  templateDev,
  shouldPreload,
  shouldPrefetch,
  templateBuild,
  bundler,
  debug: debug7,
  markdown,
  pagePatterns,
  permalinkPattern,
  plugins,
  theme
});

// src/app/resolveAppSiteData.ts
var resolveAppSiteData = (options) => ({
  base: options.base,
  lang: options.lang,
  title: options.title,
  description: options.description,
  head: options.head,
  locales: options.locales
});

// src/app/resolveAppVersion.ts
import { createRequire as createRequire3 } from "module";
import { fs as fs3 } from "@vuepress/utils";
var require4 = createRequire3(import.meta.url);
var resolveAppVersion = () => {
  const pkgJson = fs3.readJsonSync(
    require4.resolve("@vuepress/core/package.json")
  );
  return pkgJson.version;
};

// src/app/resolveAppWriteTemp.ts
import { fs as fs4 } from "@vuepress/utils";
var resolveAppWriteTemp = (dir) => {
  const tempCache = /* @__PURE__ */ new Map();
  const writeTemp = async (file, content) => {
    const filePath = dir.temp(file);
    const contentCached = tempCache.get(filePath);
    if (contentCached !== content) {
      await fs4.outputFile(filePath, content);
      tempCache.set(filePath, content);
    }
    return filePath;
  };
  return writeTemp;
};

// src/app/resolveThemeInfo.ts
var resolveThemeInfo = (app, theme) => {
  const themeObject = resolvePluginObject(app, theme);
  const themeInfo = {
    plugins: [...themeObject.plugins ?? [], themeObject],
    templateBuild: themeObject.templateBuild,
    templateDev: themeObject.templateDev
  };
  if (!themeObject.extends) {
    return themeInfo;
  }
  const parentThemeInfo = resolveThemeInfo(app, themeObject.extends);
  return {
    plugins: [...parentThemeInfo.plugins, ...themeInfo.plugins],
    templateBuild: themeObject.templateBuild ?? parentThemeInfo.templateBuild,
    templateDev: themeObject.templateDev ?? parentThemeInfo.templateDev
  };
};

// src/app/setupAppThemeAndPlugins.ts
var setupAppThemeAndPlugins = (app, config) => {
  const themeInfo = resolveThemeInfo(app, app.options.theme);
  app.options.templateDev = config.templateDev ?? themeInfo.templateDev ?? app.options.templateDev;
  app.options.templateBuild = config.templateBuild ?? themeInfo.templateBuild ?? app.options.templateBuild;
  [...themeInfo.plugins, ...app.options.plugins].flat().forEach((plugin) => app.use(plugin));
};

// src/app/createBaseApp.ts
var createBaseApp = (config, isBuild = false) => {
  const options = resolveAppOptions(config);
  const dir = resolveAppDir(options);
  const env = resolveAppEnv(options, isBuild);
  const pluginApi = createPluginApi();
  const siteData = resolveAppSiteData(options);
  const version = resolveAppVersion();
  const writeTemp = resolveAppWriteTemp(dir);
  const app = {
    options,
    siteData,
    version,
    dir,
    env,
    pluginApi,
    writeTemp,
    use: (plugin) => appUse(app, plugin),
    init: () => appInit(app),
    prepare: () => appPrepare(app)
  };
  setupAppThemeAndPlugins(app, config);
  return app;
};

// src/app/createBuildApp.ts
var createBuildApp = (config) => {
  const app = createBaseApp(config, true);
  app.build = () => app.options.bundler.build(app);
  return app;
};

// src/app/createDevApp.ts
var createDevApp = (config) => {
  const app = createBaseApp(config, false);
  app.dev = () => app.options.bundler.dev(app);
  return app;
};
export {
  appInit,
  appPrepare,
  appUse,
  createAppDirFunction,
  createBaseApp,
  createBuildApp,
  createDevApp,
  createHookQueue,
  createPage,
  createPluginApi,
  createPluginApiHooks,
  createPluginApiRegisterHooks,
  inferPagePath,
  normalizeAliasDefineHook,
  normalizeClientConfigFileHook,
  prepareClientConfigs,
  preparePageComponent,
  preparePageData,
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
  prepareSiteData,
  renderPageContent,
  resolveAppDir,
  resolveAppEnv,
  resolveAppOptions,
  resolveAppPages,
  resolveAppSiteData,
  resolveAppVersion,
  resolveAppWriteTemp,
  resolvePageComponentInfo,
  resolvePageDataInfo,
  resolvePageDate,
  resolvePageFileContent,
  resolvePageFilePath,
  resolvePageHtmlInfo,
  resolvePageKey,
  resolvePageLang,
  resolvePagePath,
  resolvePagePermalink,
  resolvePageRouteMeta,
  resolvePageSlug,
  resolvePluginObject,
  resolveThemeInfo
};

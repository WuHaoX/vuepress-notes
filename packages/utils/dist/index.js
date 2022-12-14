// src/index.ts
import debug from "debug";
import fs from "fs-extra";
import { globby } from "globby";
import hash from "hash-sum";
import ora2 from "ora";
import colors2 from "picocolors";
import path3 from "upath";

// src/getDirname.ts
import { fileURLToPath } from "url";
import path from "upath";
var getDirname = (importMetaUrl) => path.dirname(fileURLToPath(importMetaUrl));

// src/importFile.ts
import { pathToFileURL } from "url";
var importFile = (filePath) => import(pathToFileURL(filePath).toString());
var importFileDefault = (filePath) => importFile(filePath).then((m) => m.default);

// src/formatMs.ts
var formatMs = (ms) => {
  if (ms < 1e3)
    return `${ms}ms`;
  return `${(ms / 1e3).toFixed(2)}s`;
};

// src/isChildPath.ts
import path2 from "upath";
var isChildPath = (child, parent) => {
  const childPath = path2.normalize(child);
  const parentPath = path2.normalize(parent);
  if (!path2.win32.isAbsolute(childPath) || !path2.win32.isAbsolute(parentPath)) {
    return false;
  }
  const relativePath = path2.relative(parentPath, childPath);
  return relativePath === "" || !relativePath.startsWith("..");
};

// src/logger.ts
import colors from "picocolors";
var info = (...args) => {
  console.log(colors.cyan("info"), ...args);
};
var tip = (...args) => {
  console.log(colors.blue("tip"), ...args);
};
var success = (...args) => {
  console.log(colors.green("success"), ...args);
};
var warn = (...args) => {
  console.warn(colors.yellow("warning"), ...args);
};
var error = (...args) => {
  console.error(colors.red("error"), ...args);
};
var createError = (message) => {
  error(message);
  return new Error(message);
};
var logger = {
  info,
  tip,
  success,
  warn,
  error,
  createError
};

// src/renderHeadAttrs.ts
var renderHeadAttrs = (attrs) => Object.entries(attrs).filter((item) => item[1] !== false).map(
  ([key, value]) => value === true ? ` ${key}` : ` ${key}="${attrs[key]}"`
).join("");

// src/renderHead.ts
var renderHead = ([
  tag,
  attrs,
  innerHTML = ""
]) => {
  const openTag = `<${tag}${renderHeadAttrs(attrs)}>`;
  if (tag === "link" || tag === "meta" || tag === "base") {
    return openTag;
  }
  return `${openTag}${innerHTML}</${tag}>`;
};

// src/withSpinner.ts
import process from "process";
import ora from "ora";
var withSpinner = (msg) => async (target) => {
  if (process.env.DEBUG) {
    return target();
  }
  const start = Date.now();
  const spinner = ora();
  try {
    spinner.start(msg);
    const result = await target(spinner);
    spinner.succeed(`${msg} - done in ${formatMs(Date.now() - start)}`);
    return result;
  } catch (e) {
    spinner.fail(`${msg} - failed in ${formatMs(Date.now() - start)}`);
    throw e;
  }
};
export {
  colors2 as colors,
  createError,
  debug,
  error,
  formatMs,
  fs,
  getDirname,
  globby,
  hash,
  importFile,
  importFileDefault,
  info,
  isChildPath,
  logger,
  ora2 as ora,
  path3 as path,
  renderHead,
  renderHeadAttrs,
  success,
  tip,
  warn,
  withSpinner
};

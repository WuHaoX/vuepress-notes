export { default as debug } from 'debug';
export { default as fs } from 'fs-extra';
export { globby } from 'globby';
export { default as hash } from 'hash-sum';
import { Ora } from 'ora';
export { default as ora } from 'ora';
export { default as colors } from 'picocolors';
export { default as path } from 'upath';
import { HeadConfig, HeadAttrsConfig } from '@vuepress/shared';

declare const getDirname: (importMetaUrl: string) => string;

/**
 * A helper for dynamically importing a file path
 *
 * We need to use `pathToFileURL` to transform file path wo compat with windows
 */
declare const importFile: <T>(filePath: string) => Promise<T>;
/**
 * A wrapper of `importFile` and returns the default export
 */
declare const importFileDefault: <T>(filePath: string) => Promise<T>;

/**
 * Format millisecond
 */
declare const formatMs: (ms: number) => string;

/**
 * Check if `child` is a sub path of `parent` or not. Return `true` if
 * they are the same path
 */
declare const isChildPath: (child: string, parent: string) => boolean;

declare const info: (...args: any[]) => void;
declare const tip: (...args: any[]) => void;
declare const success: (...args: any[]) => void;
declare const warn: (...args: any[]) => void;
declare const error: (...args: any[]) => void;
declare const createError: (message?: string | undefined) => Error;
declare const logger: {
    info: (...args: any[]) => void;
    tip: (...args: any[]) => void;
    success: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    createError: (message?: string | undefined) => Error;
};

/**
 * Render head config to string
 */
declare const renderHead: ([tag, attrs, innerHTML,]: HeadConfig) => string;

/**
 * Render head attrs config to string
 */
declare const renderHeadAttrs: (attrs: HeadAttrsConfig) => string;

declare const withSpinner: (msg: string) => <T>(target: (spinner?: Ora) => Promise<T>) => Promise<T>;

export { createError, error, formatMs, getDirname, importFile, importFileDefault, info, isChildPath, logger, renderHead, renderHeadAttrs, success, tip, warn, withSpinner };

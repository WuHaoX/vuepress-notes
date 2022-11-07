import { logger } from '@vuepress/utils';
const assetsExtensions = [
    // basic
    'html',
    'js',
    'css',
    // images
    'png',
    'jpg',
    'jpeg',
    'gif',
    'svg',
    // fonts
    'woff',
    'woff2',
    'eot',
    'tff',
    'otf',
];
export const generateServiceWorker = async (app, serviceWorkerFilename, generateSWConfig) => {
    // lazy-load workbox-build
    const { generateSW } = await import('workbox-build');
    const globDirectory = app.dir.dest();
    const swDest = app.dir.dest(serviceWorkerFilename);
    const { warnings } = await generateSW({
        dontCacheBustURLsMatching: new RegExp(`\\.[0-9a-f]{8}\\.(${assetsExtensions.join('|')})$`),
        globPatterns: [`**/*.{${assetsExtensions.join(',')}}`],
        mode: app.env.isDebug ? 'development' : 'production',
        sourcemap: app.env.isDebug,
        ...generateSWConfig,
        // should not be override by user config
        globDirectory,
        swDest,
    });
    warnings.forEach((warning) => logger.warn('[@vuepress/plugin-pwa]', warning));
};

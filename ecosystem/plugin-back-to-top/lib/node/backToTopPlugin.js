import { getDirname, path } from '@vuepress/utils';
const __dirname = getDirname(import.meta.url);
export const backToTopPlugin = () => ({
    name: '@vuepress/plugin-back-to-top',
    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
});

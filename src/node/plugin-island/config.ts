import { SiteConfig } from 'shared/types';
import { Plugin } from 'vite';

const SITE_DATA_ID = 'island:site-data';

export function pluginConfig(config: SiteConfig): Plugin {
  return {
    name: 'island:side-data',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        //虚拟模块
        return '\0' + SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    }
  };
}
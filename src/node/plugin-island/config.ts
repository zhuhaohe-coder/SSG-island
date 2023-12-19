import { join, relative } from 'path';
import { Plugin } from 'vite';
import { SiteConfig } from 'shared/types/index';
import { PACKAGE_ROOT } from 'node/constants';

const SITE_DATA_ID = 'island:site-data';

//当有模块导入 island:site-data 时，它实际上会返回一个默认导出为 config.siteData 值的模块。
export function pluginConfig(
  config: SiteConfig,
  restartServer?: () => Promise<void>
): Plugin {
  // let server: ViteDevServer | null = null;
  return {
    name: 'island:config',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    config() {
      return {
        resolve: {
          alias: {
            '@runtime': join(PACKAGE_ROOT, 'src', 'runtime', 'index.ts')
          }
        },
        css: {
          modules: {
            localsConvention: 'camelCaseOnly'
          }
        }
      };
    },
    // configureServer(s) {
    //   server = s;
    // },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath.replaceAll('\\', '/')];
      const include = (id: string) =>
        customWatchedFiles.some((file) => id.includes(file));

      if (include(ctx.file)) {
        console.log(
          `\n${relative(config.root, ctx.file)} changed, restarting server...`
        );
        // 重启 Dev Server
        await restartServer();
      }
    }
  };
}

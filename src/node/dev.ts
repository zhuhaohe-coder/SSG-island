import { createServer } from 'vite';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { createVitePlugins } from './vitePlugins';

export async function createDevServer(
  root: string,
  restartServer: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development');
  console.log(config);

  return createServer({
    //因为 Vite 本身也是一个静态资源服务器，如果把 root 设为 docs 目录，那么当你访问约定式路由的时候，Vite 会直接给你返回 tsx 文件的编译结果，这是不符合我们预期的
    root: PACKAGE_ROOT,
    plugins: await createVitePlugins(config, restartServer),
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}

import { build as viteBuild } from 'vite';
import { InlineConfig } from 'vite';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import { dirname, join } from 'path';
import type { RollupOutput } from 'rollup';
import fs from 'fs-extra';
import { pathToFileURL } from 'url';
import ora from 'ora';
import { SiteConfig } from 'shared/types';
import { createVitePlugins } from './vitePlugins';
import { Route } from './plugin-routes';

export async function build(root: string = process.cwd(), config: SiteConfig) {
  // 打包代码，包括 client 端 + server 端
  const [clientBundle] = await bundle(root, config);
  // 引入 server-entry 模块
  const serverEntryPath = join(root, '.temp', 'ssr-entry.js');
  const { render, routes } = await import(
    pathToFileURL(serverEntryPath).toString()
  );
  // 服务端渲染，产出
  await renderPage(render, routes, root, clientBundle);
}

export async function bundle(root: string, config: SiteConfig) {
  //公用配置抽离
  const resolveViteConfig = async (
    isServer: boolean
  ): Promise<InlineConfig> => ({
    mode: 'production',
    root,
    //自动注入 import React from 'react'，避免 React is not defined 的错误
    plugins: await createVitePlugins(config, undefined, isServer),
    build: {
      ssr: isServer,
      outDir: isServer ? join(root, '.temp') : join(root, 'build'),
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          // format: isServer ? 'cjs' : 'esm'
          format: 'esm'
        }
      }
    }
  });

  // console.log("building client + server bundles...");
  const spinner = ora('building client + server bundles...').start();

  try {
    //并发优化
    const [clientBundle, serverBundle] = await Promise.all([
      // 打包 client 端
      viteBuild(await resolveViteConfig(false)),
      // 打包 server 端
      viteBuild(await resolveViteConfig(true))
    ]);

    spinner.stop();

    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (error) {
    console.log(error);
  }
}

export async function renderPage(
  render: () => string,
  routes: Route[],
  root: string,
  clientBundle: RollupOutput
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  console.log('Rendering page in server side...');
  return Promise.all(
    routes.map(async (route) => {
      const routePath = route.path;
      const appHtml = render();
      //注入客户端脚本,添加交互
      const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <title>title</title>
          <meta name="description" content="xxx">
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script type="module" src="./${clientChunk?.fileName}"></script>
        </body>
      </html>`.trim();
      //确保目录存在。如果目录结构不存在，则会创建它。
      const fileName = routePath.endsWith('/')
        ? `${routePath}index.html`
        : `${routePath}.html`;
      await fs.ensureDir(join(root, 'build', dirname(fileName)));
      await fs.writeFile(join(root, 'build', fileName), html);
      await fs.remove(join(root, '.temp'));
    })
  );
}

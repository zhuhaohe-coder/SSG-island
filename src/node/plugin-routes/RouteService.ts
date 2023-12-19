import fastGlob from 'fast-glob';
import path from 'path';
import { normalizePath } from 'vite';

interface RouteMeta {
  routePath: string;
  absolutePath: string;
}

export class RouteService {
  #scanDir: string;
  #routeData: RouteMeta[] = [];
  constructor(scanDir: string) {
    this.#scanDir = scanDir;
  }

  async init() {
    const files = fastGlob
      .sync('**/*.{js,ts,jsx,tsx,md,mdx}', {
        cwd: this.#scanDir,
        absolute: true,
        ignore: ['**/build/**', '**/.island/**', 'config.ts']
      })
      .sort();
    files.forEach((file) => {
      const fileRelativePath = normalizePath(
        path.relative(this.#scanDir, file)
      );
      //路由路径
      const routePath = this.normalizePath(fileRelativePath);
      //绝对路径
      this.#routeData.push({
        routePath,
        absolutePath: file
      });
    });
  }

  //获取路由路径, 方便测试
  getRouteMeta(): RouteMeta[] {
    return this.#routeData;
  }

  normalizePath(rawPath: string) {
    //移除文件扩展名，并且如果路径末尾有"index"的话也会移除
    const routePath = rawPath.replace(/\.(.*)?$/, '').replace(/index$/, '');
    // '/'开头
    return routePath.startsWith('/') ? routePath : `/${routePath}`;
  }

  generateRoutesCode(ssr = false) {
    return `
  import React from 'react';
  ${ssr ? '' : 'import loadable from "@loadable/component";'}
  ${this.#routeData
    .map((route, index) => {
      //   return `import Route${index} from '${route.absolutePath}';`;
      //按需加载 在SSR/SSG中,没有网络IO的开销, 无需使用按需加载
      return ssr
        ? `import Route${index} from '${route.absolutePath}';`
        : `const Route${index} = loadable(() => import('${route.absolutePath}'));`;
    })
    .join('\n')}
  export const routes = [
  ${this.#routeData
    .map((route, index) => {
      return `{ path: '${route.routePath}', element: React.createElement(Route${index}),preload: () => import('${route.absolutePath}') }`;
    })
    .join(',\n')}
  ];
  `;
  }
}

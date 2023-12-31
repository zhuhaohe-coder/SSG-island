import { PageData } from 'shared/types';
import { Layout } from '../theme-default/index';
import { matchRoutes } from 'react-router-dom';
import { routes } from 'island:routes';
import { Route } from 'node/plugin-routes';
import siteData from 'island:site-data';

export function App() {
  return <Layout />;
}

export async function initPageData(routePath: string): Promise<PageData> {
  //获取路由组件编译后的模块内存
  const matched = matchRoutes(routes, routePath);
  if (matched) {
    const moduleInfo = await (matched[0].route as Route).preload();
    return {
      pageType: 'doc',
      siteData,
      frontMatter: moduleInfo.frontMatter,
      pagePath: routePath
    };
  }
  return {
    pageType: '404',
    siteData,
    pagePath: routePath,
    frontMatter: {}
  };
}

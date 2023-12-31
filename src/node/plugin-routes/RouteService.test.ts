import { RouteService } from './RouteService';
import { describe, expect, test } from 'vitest';
import path from 'path';
import { normalizePath } from 'vite';

describe('RouteService', async () => {
  const testDir = normalizePath(path.join(__dirname, 'fixtures'));
  const routeService = new RouteService(testDir);
  await routeService.init();

  test('conventional route by file structure', () => {
    const routeMeta = routeService.getRouteMeta().map((item) => {
      console.log(item.absolutePath.replace(testDir, 'TEST_DIR'));

      return {
        ...item,
        absolutePath: item.absolutePath.replace(testDir, 'TEST_DIR')
      };
    });

    expect(routeMeta).toMatchInlineSnapshot(`
      [
        {
          "absolutePath": "TEST_DIR/a.mdx",
          "routePath": "/a",
        },
        {
          "absolutePath": "TEST_DIR/b.mdx",
          "routePath": "/b",
        },
      ]
    `);
  });

  test('generate routes code', async () => {
    expect(routeService.generateRoutesCode().replaceAll(testDir, 'TEST_DIR'))
      .toMatchInlineSnapshot(`
      "
        import React from 'react';
        import loadable from '@loadable/component';
        const Route0 = loadable(() => import('TEST_DIR/a.mdx'));
      const Route1 = loadable(() => import('TEST_DIR/b.mdx'));
        export const routes = [
        { path: '/a', element: React.createElement(Route0) },
      { path: '/b', element: React.createElement(Route1) }
        ];
        "
    `);
  });
});

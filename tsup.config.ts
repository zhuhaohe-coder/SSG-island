import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['./src/node/cli.ts', './src/node/index.ts'],
  clean: true,
  bundle: true,
  splitting: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  shims: true,
  banner: {
    // 使用它可以在生成的 JavaScript 和 CSS 文件的开头插入任意字符串。这样就解决了ems中使用require的问题
    js: 'import { createRequire as createRequire0 } from "module"; const require = createRequire0(import.meta.url);'
  }
});

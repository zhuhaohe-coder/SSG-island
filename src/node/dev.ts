import { createServer as createViteServer } from "vite";
import { pluginIndexHtml } from "./plugin-island/indexHtml";

export async function createDevServer(root = process.cwd()) {
  return createViteServer({
    root,
    plugins: [pluginIndexHtml()],
  });
}

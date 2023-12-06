import { readFile } from "fs/promises";
import { Plugin } from "vite";
import { DEFAULT_HTML_PATH } from "../constants";

export function pluginIndexHtml(): Plugin {
  return {
    name: "island:index-html",
    apply: "serve",
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          //1. 读取template.html的内容
          const content = await readFile(DEFAULT_HTML_PATH, "utf-8");
          try {
            //2. 响应HTML浏览器
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(content);
          } catch (error) {
            return next(error);
          }
        });
      };
    },
  };
}

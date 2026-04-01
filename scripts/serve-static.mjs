import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const rootDir = process.env.WEB_ROOT ?? "dist";
const port = Number(process.env.PORT ?? 5173);

const mimeByExt = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

const resolvePath = (urlPath) => {
  const safePath = normalize(urlPath).replace(/^\\+/, "");
  const candidate = safePath === "/" ? "index.html" : safePath.replace(/^\//, "");
  return join(rootDir, candidate);
};

const server = createServer((req, res) => {
  const target = resolvePath(req.url ?? "/");

  if (!existsSync(target) || statSync(target).isDirectory()) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  const mime = mimeByExt[extname(target)] ?? "application/octet-stream";
  res.setHeader("Content-Type", mime);
  createReadStream(target).pipe(res);
});

server.listen(port, () => {
  console.log(`Web UI ready: http://localhost:${port}`);
  console.log(`Serving directory: ${rootDir}`);
});

// Minimal static file server for the built site (npm run build -> dist/).
// Exists so local preview doesn't depend on the Astro CLI's dev/preview
// server staying up reliably — plain Node http, same spirit as the sibling
// project's server.js, but scoped to just serving files (no feed proxying;
// that stays a build-time concern per the events-media-feed plan).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 4321);
const DIST_DIR = path.join(__dirname, "dist");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function resolveFilePath(pathname) {
  let candidate = path.join(DIST_DIR, decodeURIComponent(pathname));

  if (!candidate.startsWith(DIST_DIR)) {
    return null; // directory traversal attempt
  }

  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
    candidate = path.join(candidate, "index.html");
  } else if (!fs.existsSync(candidate)) {
    // Astro's static output writes clean routes as <route>/index.html
    const asIndex = path.join(candidate, "index.html");
    if (fs.existsSync(asIndex)) candidate = asIndex;
  }

  return candidate;
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://localhost:${PORT}`);
  const filePath = resolveFilePath(requestUrl.pathname);

  if (!filePath) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      const notFoundPath = path.join(DIST_DIR, "404.html");
      if (fs.existsSync(notFoundPath)) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        fs.createReadStream(notFoundPath).pipe(res);
        return;
      }
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    res.end(data);
  });
});

if (!fs.existsSync(DIST_DIR)) {
  console.error('dist/ not found — run "npm run build" first.');
  process.exit(1);
}

server.listen(PORT, () => {
  console.log(`Serving dist/ at http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop.");
});

// Genera descargas/apuntes/*.pdf a partir de apuntes/*.html usando Chromium (Playwright).
// Uso: node scripts/build-pdfs.mjs
import { readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "descargas/apuntes");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
await page.emulateMedia({ colorScheme: "light", media: "print" });
for (const f of readdirSync(join(root, "apuntes")).filter(f => f.endsWith(".html"))) {
  await page.goto(pathToFileURL(join(root, "apuntes", f)).href, { waitUntil: "networkidle" }).catch(() => {});
  const out = join(outDir, f.replace(/\.html$/, ".pdf"));
  await page.pdf({ path: out, format: "A4", printBackground: true, margin: { top: "18mm", bottom: "18mm", left: "16mm", right: "16mm" } });
  console.log("✔", out.replace(root + "/", ""));
}
await browser.close();

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const clean = async (dir) => {
  try {
    await fs.rm(path.join(root, dir), { recursive: true, force: true });
  } catch (err) {
    console.error(err);
  }
};

// Helper: Copies a folder from A to B
const copy = async (src, dest) => {
  try {
    await fs.mkdir(path.join(root, dest), { recursive: true });
    const entries = await fs.readdir(path.join(root, src), { withFileTypes: true });

    await Promise.all(
      entries.map(async (entry) => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        return entry.isDirectory()
          ? copy(srcPath, destPath)
          : fs.copyFile(path.join(root, srcPath), path.join(root, destPath));
      })
    );
  } catch (err) {
    if (err.code !== 'ENOENT') console.error(`Failed to copy ${src}:`, err);
  }
};

(async () => {
  await Promise.all([
    clean('docs/dist/js'),
    clean('docs/dist/css')
  ]);
  await Promise.all([
    copy('dist/js', 'docs/cc-dist/js'),
    copy('dist/css', 'docs/cc-dist/css')
  ]);

  const pkg = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf-8'));
  await fs.writeFile(path.join(root, 'docs/demo/version.js'), `
    const version = '${pkg.version}';
    const webV = document.getElementById("v");
    if(webV) webV.innerHTML = version;
  `);
  console.log(`✅ Version ${pkg.version} /dist/ files have been synced to /docs/`);
})();
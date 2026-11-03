import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'dist', 'firefox');
await mkdir(path.dirname(target), { recursive: true });
await cp(path.join(root, 'extension'), target, { recursive: true, force: true });
await cp(path.join(root, 'firefox', 'manifest.json'), path.join(target, 'manifest.json'));
console.log(target);

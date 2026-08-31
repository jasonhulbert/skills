#!/usr/bin/env node

import { cp, mkdir, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const outputArgument = process.argv[2];
if (!outputArgument) {
  console.error('Usage: node scripts/create-diagram.mjs <new-output-directory>');
  process.exit(2);
}

const source = resolve(import.meta.dirname, '../assets/starter');
const destination = resolve(process.cwd(), outputArgument);

await mkdir(destination, { recursive: true });
const existing = await readdir(destination);
if (existing.length > 0) {
  console.error(`Refusing to overwrite non-empty directory: ${destination}`);
  process.exit(1);
}

const entries = await readdir(source);
for (const entry of entries) {
  await cp(resolve(source, entry), resolve(destination, entry), { recursive: true, force: false, errorOnExist: true });
}
console.log(`Created independent diagram bundle at ${destination}`);

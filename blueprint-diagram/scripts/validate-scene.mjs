#!/usr/bin/env node

import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import process from 'node:process';

const require = createRequire(import.meta.url);
const sceneArgument = process.argv[2];
if (!sceneArgument) {
  console.error('Usage: node scripts/validate-scene.mjs <path-to-scene.js>');
  process.exit(2);
}

const runtimePath = resolve(import.meta.dirname, '../assets/starter/blueprint-runtime.js');
const scenePath = resolve(process.cwd(), sceneArgument);

delete globalThis.IsometricBlueprint;
delete globalThis.BLUEPRINT_SCENE;
delete require.cache[runtimePath];
delete require.cache[scenePath];

try {
  require(runtimePath);
  require(scenePath);
} catch (error) {
  console.error(`Unable to load scene: ${error.message}`);
  process.exit(1);
}

if (!globalThis.BLUEPRINT_SCENE) {
  console.error('Scene file must assign globalThis.BLUEPRINT_SCENE.');
  process.exit(1);
}

const result = globalThis.IsometricBlueprint.validateScene(globalThis.BLUEPRINT_SCENE);
result.warnings.forEach((warning) => console.warn(`warning: ${warning}`));
if (!result.ok) {
  result.errors.forEach((error) => console.error(`error: ${error}`));
  process.exit(1);
}

console.log(`Scene is valid: ${globalThis.BLUEPRINT_SCENE.entities.length} entities, ${globalThis.BLUEPRINT_SCENE.connectors.length} connectors.`);

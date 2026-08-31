#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const runtimePath = resolve(import.meta.dirname, '../assets/starter/blueprint-runtime.js');
const scenePath = resolve(import.meta.dirname, '../assets/starter/scene.js');
require(runtimePath);
require(scenePath);

const api = globalThis.IsometricBlueprint;
assert.equal(api.version, '1.5.0');
assert.deepEqual(Object.keys(api.entityTypes), ['unit', 'stack', 'cluster', 'checkpoint', 'channel', 'store', 'surface']);
assert.deepEqual(Object.keys(api.connectorTypes), ['flow', 'event', 'association', 'feedback']);
assert.deepEqual(Object.keys(api.themes), ['blueprint', 'vellum', 'plotter']);

const origin = api.project([0, 0, 0], 10);
const x = api.project([1, 0, 0], 10);
const y = api.project([0, 1, 0], 10);
const z = api.project([0, 0, 1], 10);
assert.deepEqual(origin, { x: 0, y: 0 });
assert.ok(Math.abs(x.x - Math.sqrt(3) * 5) < 0.000001);
assert.ok(Math.abs(x.y - 5) < 0.000001);
assert.ok(Math.abs(y.x + Math.sqrt(3) * 5) < 0.000001);
assert.ok(Math.abs(y.y - 5) < 0.000001);
assert.deepEqual(z, { x: 0, y: -10 });
assert.ok(Math.abs(Math.hypot(x.x, x.y) - 10) < 0.000001);
assert.ok(Math.abs(Math.hypot(y.x, y.y) - 10) < 0.000001);
assert.ok(Math.abs(Math.hypot(z.x, z.y) - 10) < 0.000001);

const valid = api.validateScene(globalThis.BLUEPRINT_SCENE);
assert.equal(valid.ok, true, valid.errors.join('\n'));

const diagonal = structuredClone(globalThis.BLUEPRINT_SCENE);
diagonal.connectors[0].points = [[0, 0, 0], [1, 1, 0]];
const diagonalResult = api.validateScene(diagonal);
assert.equal(diagonalResult.ok, false);
assert.ok(diagonalResult.errors.some((error) => error.includes('exactly one is allowed')));

const overlapping = structuredClone(globalThis.BLUEPRINT_SCENE);
overlapping.entities[1].x = overlapping.entities[0].x + 0.5;
overlapping.entities[1].y = overlapping.entities[0].y + 0.5;
const overlapResult = api.validateScene(overlapping);
assert.equal(overlapResult.ok, false);
assert.ok(overlapResult.errors.some((error) => error.includes('footprints')));

const unknownType = structuredClone(globalThis.BLUEPRINT_SCENE);
unknownType.entities[0].type = 'server';
const unknownResult = api.validateScene(unknownType);
assert.equal(unknownResult.ok, false);
assert.ok(unknownResult.errors.some((error) => error.includes('not predefined')));

const themedScene = structuredClone(globalThis.BLUEPRINT_SCENE);
themedScene.theme = 'vellum';
assert.equal(api.validateScene(themedScene).ok, true);

const unknownTheme = structuredClone(globalThis.BLUEPRINT_SCENE);
unknownTheme.theme = 'sepia';
const unknownThemeResult = api.validateScene(unknownTheme);
assert.equal(unknownThemeResult.ok, false);
assert.ok(unknownThemeResult.errors.some((error) => error.includes('Scene theme')));

const workflowScene = {
  title: 'Workflow',
  description: 'A checkpoint connects a unit to a straight stack.',
  plane: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
  entities: [
    { id: 'request', type: 'unit', label: 'REQUEST', x: 0, y: 0, w: 2, d: 2 },
    { id: 'decision', type: 'checkpoint', label: 'DECISION', x: 4, y: 0, w: 2, d: 2 },
    { id: 'outcomes', type: 'stack', label: 'OUTCOMES', x: 8, y: 3, w: 2, d: 2, count: 3 }
  ],
  connectors: [{ id: 'proceed', type: 'flow', from: 'request', to: 'decision', points: [[2, 1, 0.5], [4, 1, 0.5]] }]
};
assert.equal(api.validateScene(workflowScene).ok, true);

const eventScene = {
  title: 'Event flow',
  description: 'A source cluster emits an event into a channel and store.',
  plane: { xMin: 0, xMax: 15, yMin: 0, yMax: 10 },
  entities: [
    { id: 'sources', type: 'cluster', label: 'SOURCES', x: 0, y: 0, w: 3, d: 3, count: 4 },
    { id: 'timeline', type: 'channel', label: 'TIMELINE', x: 5, y: 0, w: 5, d: 2.5, count: 5 },
    { id: 'history', type: 'store', label: 'HISTORY', x: 11, y: 5, w: 3, d: 3, count: 4 }
  ],
  connectors: [{ id: 'emit', type: 'event', from: 'sources', to: 'timeline', points: [[3, 1.5, 0.5], [5, 1.5, 0.5]] }]
};
assert.equal(api.validateScene(eventScene).ok, true);

const operatingModelScene = {
  title: 'Operating model',
  description: 'Two groups sit on a common operating surface.',
  plane: { xMin: 0, xMax: 15, yMin: 0, yMax: 12 },
  entities: [
    { id: 'commons', type: 'surface', label: 'COMMONS', x: 0, y: 0, w: 14, d: 10 },
    { id: 'north', type: 'cluster', label: 'NORTH', parent: 'commons', x: 1, y: 1, z: 0.7, w: 3, d: 3, count: 3 },
    { id: 'south', type: 'cluster', label: 'SOUTH', parent: 'commons', x: 9, y: 5, z: 0.7, w: 3, d: 3, count: 3 }
  ],
  connectors: [{ id: 'shared-context', type: 'association', from: 'north', to: 'south', points: [[4, 2.5, 1.4], [10.5, 2.5, 1.4], [10.5, 5, 1.4]] }]
};
assert.equal(api.validateScene(operatingModelScene).ok, true);

const missingEndpoint = structuredClone(workflowScene);
delete missingEndpoint.connectors[0].from;
const missingEndpointResult = api.validateScene(missingEndpoint);
assert.equal(missingEndpointResult.ok, false);
assert.ok(missingEndpointResult.errors.some((error) => error.includes('.from must be a valid entity id')));

const detachedRoute = structuredClone(workflowScene);
detachedRoute.connectors[0].points[0] = [3, 1, 0.5];
const detachedRouteResult = api.validateScene(detachedRoute);
assert.equal(detachedRouteResult.ok, false);
assert.ok(detachedRouteResult.errors.some((error) => error.includes('must touch the footprint')));

const excessiveLabelOffset = structuredClone(workflowScene);
excessiveLabelOffset.connectors[0].label = 'proceed';
excessiveLabelOffset.connectors[0].labelOffset = [40, 0];
const excessiveLabelOffsetResult = api.validateScene(excessiveLabelOffset);
assert.equal(excessiveLabelOffsetResult.ok, false);
assert.ok(excessiveLabelOffsetResult.errors.some((error) => error.includes('labelOffset')));

const lowSurfaceChild = structuredClone(operatingModelScene);
lowSurfaceChild.entities[1].z = 0.4;
const lowSurfaceChildResult = api.validateScene(lowSurfaceChild);
assert.equal(lowSurfaceChildResult.ok, false);
assert.ok(lowSurfaceChildResult.errors.some((error) => error.includes('to sit above parent surface')));

const obstructedScene = {
  title: 'Obstructed route',
  description: 'A route passes through an unrelated solid.',
  plane: { xMin: 0, xMax: 12, yMin: 0, yMax: 5 },
  entities: [
    { id: 'source', type: 'unit', label: 'SOURCE', x: 0, y: 0, w: 2, d: 2, h: 2 },
    { id: 'blocker', type: 'unit', label: 'BLOCKER', x: 4, y: 0, w: 2, d: 2, h: 2 },
    { id: 'target', type: 'unit', label: 'TARGET', x: 8, y: 0, w: 2, d: 2, h: 2 }
  ],
  connectors: [{ id: 'crossing', type: 'flow', from: 'source', to: 'target', points: [[2, 1, 0.8], [8, 1, 0.8]] }]
};
const obstructedResult = api.validateScene(obstructedScene);
assert.equal(obstructedResult.ok, true);
assert.ok(obstructedResult.warnings.some((warning) => warning.includes('passes through entity "blocker"')));

console.log('Runtime contract tests passed.');

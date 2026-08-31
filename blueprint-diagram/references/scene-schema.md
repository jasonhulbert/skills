# Scene schema

Author only `globalThis.BLUEPRINT_SCENE` in `scene.js`. The runtime owns rendering and interaction.

## Top level

```js
globalThis.BLUEPRINT_SCENE = {
  title: "Required visible title",
  kicker: "Optional drafting caption",
  summary: "Optional visible reading frame",
  description: "Required screen-reader summary",
  theme: "blueprint",
  plane: { xMin: -2, xMax: 24, yMin: -2, yMax: 18, step: 1, majorEvery: 4 },
  camera: { target: [10, 8, 0], zoom: 0.8 },
  entities: [],
  connectors: []
};
```

`plane` defines the drawn world and fit-to-content bounds. Keep all entity footprints and connector points inside it.

`camera` is optional. `target` is the initial world-space focus and `zoom` is the initial scale. Use it to open at a readable working scale instead of force-fitting the whole world into the viewport. The user can always pan, zoom, or choose Fit view.

`summary` is optional. Use one concise sentence to state the governing rule or reading frame that the geometry alone cannot communicate. Keep it under 180 characters.

`theme` is optional and sets the opening treatment to `blueprint`, `vellum`, or `plotter`. Blueprint is the default. The runtime always presents all three options in an accessible theme toggle, and switching themes does not mutate scene data or camera state.

## Entity fields

Every entity requires `id`, `type`, `label`, `x`, `y`, `w`, and `d`. `code`, `meta`, `z`, `h`, and `parent` are optional. Coordinates and dimensions use world units.

```js
{
  id: "review",
  type: "checkpoint",
  code: "R",
  label: "REVIEW",
  meta: "approval gate",
  x: 8,
  y: 3,
  z: 0,
  w: 2.6,
  d: 2.6,
  h: 2.8
}
```

Type-specific fields:

- `stack`: `count` from 2 to 8, optional `blockHeight`, optional `gap`.
- `cluster`: `count` from 2 to 12, optional `columns`, optional `blockHeight`.
- `channel`: `count` from 2 to 12, optional `axis` set to `x` or `y`.
- `store`: `count` from 2 to 10, optional `slabHeight`, optional `gap`.
- `unit`, `checkpoint`, and `surface`: no count field.

The `stack` and `store` renderers enforce one X/Y footprint for every repeated layer. Never simulate a stack with multiple offset entities.

Use `parent: "surface-id"` to place a non-surface entity on a surface. The child footprint must stay at least 0.6 world units inside the surface. Give the child an explicit `z` at least 0.04 units above the surface top. A surface cannot be placed on another surface.

## Connector fields

Every connector requires `id`, `type`, `from`, `to`, and at least two 3D `points`. `label`, `animate`, `duration`, `labelSegment`, `labelPosition`, and `labelOffset` are optional.

```js
{
  id: "accepted",
  type: "flow",
  from: "review",
  to: "archive",
  label: "accepted work",
  points: [
    [4.2, 4.0, 0.7],
    [7.0, 4.0, 0.7],
    [7.0, 5.2, 0.7]
  ]
}
```

Each consecutive pair must change exactly one coordinate. A segment may run on X, Y, or Z. Diagonal changes such as `[2, 3, 0]` to `[4, 5, 0]` are invalid even though they may look convenient after projection.

`from` and `to` reference entity ids. The first route point must touch the `from` footprint and the final point must touch the `to` footprint. The validator warns when an intermediate segment passes through an unrelated solid.

`labelSegment` selects the zero-based route segment that carries the connector label. Without it, the runtime uses the longest segment. `labelPosition` places the label from `0.1` to `0.9` along that segment and defaults to `0.5`.

`labelOffset` is an optional `[x, y]` adjustment in screen pixels, with each value limited to `-36` through `36`. Use it only after choosing a clear segment and position. Its purpose is small clearance correction, not free-form annotation placement.

Use `animate: false` for static flows. `association` never animates. Use motion sparingly and honor reduced-motion preferences.

## Validation

Run:

```bash
node scripts/validate-scene.mjs assets/starter/scene.js
```

The validator checks known types, identifiers, dimensions, type-specific ranges, parent-surface containment, plane containment, footprint collisions, connector endpoints, axis routing, route obstruction, label density, animation density, and duplicate points. Warnings require visual judgment. Errors must be fixed before delivery.

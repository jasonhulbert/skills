# Visual grammar

The library is domain-neutral. Entity types describe spatial roles, not software products or workflow-specific concepts. The same scene may describe a technical system, an organizational process, a service journey, a supply chain, or an event stream.

## Projection contract

For world coordinate `[x, y, z]` and one shared unit `u`:

```text
screenX = (x - y) × cos(30°) × u
screenY = (x + y) × sin(30°) × u - z × u
```

This creates parallel projection. X and Y are equal-length 30-degree axes. Z is vertical. Never alter the projection per entity or fake depth with perspective scaling.

## Entity library

Use the smallest type whose construction communicates the entity's role.

| Type | Construction | Use when the entity means |
| --- | --- | --- |
| `unit` | One closed cuboid | One indivisible participant, stage, place, or capability |
| `stack` | Two to eight closed cuboids sharing one X/Y footprint | Repeated instances, ordered layers, capacity, versions, or accumulated states |
| `cluster` | A closed plinth with a regular array of closed blocks | A bounded collection whose members matter more than sequence |
| `checkpoint` | A closed plinth and centered vertical block | A gate, decision, control, threshold, approval, or transition point |
| `channel` | An elongated closed bed with repeated closed partitions | A stream, queue, lane, timeline, conveyor, or ordered series |
| `store` | A straight stack of thin closed slabs | Retained material, memory, inventory, evidence, records, or accumulated resources |
| `surface` | A low closed plane with one inset raised plane | A shared context, operating area, scope, environment, or workspace |

Do not encode semantics with ornamental cut lines, pseudo-controls, symbols, or icons. Labels and geometry must carry the meaning.

### Surfaces and containment

A `surface` may act as a real grouping plane for an environment, scope, operating area, or trust boundary. A contained entity declares the surface id in `parent`, stays inside the surface inset, and uses an explicit Z value above the surface top. The runtime renders surfaces below connectors and solids so the platform organizes the scene without hiding its contents.

Do not add a surface merely to fill empty space. Use one only when its label helps the reader answer “where does this live?” or “which boundary governs this?” at a glance.

## Connector library

| Type | Construction | Meaning |
| --- | --- | --- |
| `flow` | Solid axis-routed line, filled triangle end marker, optional moving packet | Directional transfer, progression, movement, or handoff |
| `event` | Dashed axis-routed line, filled triangle end marker, optional moving packet | Trigger, notification, emitted event, or asynchronous occurrence |
| `association` | Dotted axis-routed line, no arrow, no packet | Non-directional relationship, correspondence, or shared context |
| `feedback` | Solid axis-routed line with filled triangle markers at both ends | Reciprocal exchange, feedback loop, or synchronization |

Use one connector type consistently for one meaning within a diagram. Do not use line style as decoration.

Directional markers are compact solid triangles. Their world-space dimensions scale with camera zoom just like junction dots and animated packets. They inherit the connector stroke color, and entity-focus emphasis applies the same relative size increase to all three marker types. Do not replace triangles with open chevrons or oversized line arrows.

Every connector declares `from` and `to`. The first and last route points must touch those entity footprints. This keeps the visual route and the semantic relationship synchronized and improves the accessible description.

## Information hierarchy

Use four levels, each with one job:

1. The title names the subject.
2. The optional summary states the one-sentence reading frame or governing rule.
3. Entity labels name parts; entity metadata adds one short qualifier such as trust, durability, capacity, or role.
4. Connector labels name what moves, triggers, or relates. They do not restate both endpoint names.

If a connector's longest segment produces a crowded label, choose a clearer axis segment with `labelSegment` and place the label along it with `labelPosition`. Use the bounded `labelOffset` only for a small final clearance correction. Do not move the route solely to make its label look decorative.

## Layout and occlusion

- Reserve at least 0.75 world units between unrelated entity footprints. Larger entities and tall stacks need more breathing room.
- Keep connector corridors visible. Route around footprints rather than through them.
- Route on a consistent Z plane where practical. Rise or descend on Z only when crossing another route or attaching to a raised entity.
- Draw connectors below entities so endpoints appear to enter the solids. Use the connector bed to preserve legibility over the grid.
- Use surfaces below connectors and solids. Keep their inset clear enough that the boundary remains visually legible around contained entities.
- Sort entities by their far-to-near depth key. Still inspect the result because isometric bounding boxes can overlap even when footprints do not.
- Render all visible annotations after every surface, connector, packet, and solid. Geometry can pass behind a label but can never obscure it. The semantic geometry groups retain accessible labels; the visible annotation layer is hidden from assistive technology to prevent duplicate reading.
- Put labels outside the footprint when a top label would collide with stacked geometry. Keep name and metadata aligned to the entity centerline, and verify that labels do not collide with one another even though they are always painted on top.
- Inspect both the initial working view and Fit view. The initial view should establish the primary reading path; Fit view should make the overall grouping and route topology legible.

## Viewport shell

The artifact occupies the full browser viewport. The toolbar and header remain at the top, the legend footer remains at the bottom, and the diagram receives all height between them. Do not assign a fixed or viewport-width-derived height to the SVG. Pan and zoom operate within the flexible middle region without moving the legend off screen.

## Entity focus

Every rendered entity is selectable by pointer and keyboard. Selection gives the chosen entity and every connector whose `from` or `to` matches it full emphasis. The selected entity and related connector paths, packets, junctions, arrows, and labels use the theme's drafting accent. All unrelated entities, annotations, and connectors recede to a shared low opacity.

The focus state is temporary presentation state. It never mutates scene data, changes the camera, changes the active theme, or promotes neighboring endpoint entities into the selection. Select the same entity again, select empty diagram space, or press Escape to restore the full graph. Keep the footer interaction hint and focus-visible treatment intact.

## Drafting themes

Every artifact includes the same three-way theme toggle. Theme changes affect drafting stock, ink, grid, face values, shadows, and control chrome. They never change geometry, semantic line patterns, label hierarchy, or interaction.

| Theme | Treatment |
| --- | --- |
| `blueprint` | Deep navy drafting stock, pale technical ink, and restrained blue face-value shifts |
| `vellum` | Warm archival stock, sepia ink, subtle paper variation, and muted drafting faces |
| `plotter` | Cool white stock, graphite linework, restrained registration-red control accents, and nearly unfilled drafting faces |

Blueprint is the default. Set `scene.theme` only when an artifact should open in another bundled treatment. The reader can switch themes without changing the scene or camera.

Do not add gradients, rounded cards, drop shadows, colored category coding, glossy surfaces, or pictograms. Visual interest comes from proportion, rhythm, depth, and the composition of closed solids.

Keep motion subordinate to structure. In a dense scene, animate no more than four important flows. Prefer asynchronous crossings, active handoffs, or the primary lifecycle path; leave state relationships and contextual associations static.

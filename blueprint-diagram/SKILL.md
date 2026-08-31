---
name: blueprint-diagrams
description: Create or revise interactive browser-based isometric diagrams with a consistent blueprint drafting aesthetic, predefined entity and connector types, axis-routed flows, and pan-and-zoom navigation. Use for system maps, workflows, event flows, operating models, and other multi-part spatial diagrams. Do not use for ordinary charts or diagrams that do not benefit from isometric depth.
---

# Isometric Blueprint Diagrams

Build the diagram from the supplied runtime instead of drawing arbitrary SVG shapes. Keep the subject matter in the scene data and keep projection, geometry, rendering, interaction, and validation in the shared library.

## Start here

1. Read [references/visual-grammar.md](references/visual-grammar.md) before choosing entity or connector types. Write the diagram's one-sentence reading frame and identify any real boundaries before placing entities.
2. Read [references/scene-schema.md](references/scene-schema.md) while authoring scene data.
3. Run `node scripts/create-diagram.mjs <new-output-directory>` to copy the complete standalone bundle. Preserve `blueprint-runtime.js` and `blueprint.css`; edit `scene.js` for the user's content and `index.html` only for page-level integration.
4. Run `node scripts/validate-scene.mjs <path-to-scene.js>` from this skill directory.
5. Serve and inspect the result at desktop and narrow widths. Test pan, zoom, fit, entity selection and clearing, keyboard focus, all three themes, reduced motion, label clearance, connector routing, entity occlusion, and the overview at Fit view. Resolve every validation warning with either a scene correction or a deliberate visual judgment.

## Non-negotiable geometry

- Use parallel isometric projection. X and Y project at positive and negative 30 degrees from horizontal. Z remains vertical. X, Y, and Z use one shared unit scale.
- Render entities only through the predefined library. Every solid uses closed, viewer-facing top and side faces with consistent face shading.
- Stack repeated blocks only on Z. All blocks in one stack share the same X/Y footprint.
- Route every connector through 3D points where each segment changes exactly one axis. Do not use free-angle paths, curves, or screen-space routing.
- Use the renderer's compact solid triangle markers for directed connectors. Keep arrowheads, junction dots, and animated packets on the same relative scale so camera zoom and selection emphasis resize them together.
- Treat the canvas as a world larger than the viewport. Preserve drag-to-pan, wheel/button zoom, and fit-to-content.
- Preserve entity focus mode. Selecting an entity must emphasize that entity and its incident connectors while subduing unrelated graph content. Selection must not change geometry, camera state, connector semantics, or the active theme.
- Render all entity codes, names, metadata, surface labels, and connector labels in the final annotation layer. No solid, route, or animated packet may be painted above visible annotation.
- Use the full browser viewport. Keep controls and the header at the top, pin the legend footer to the bottom, and let the diagram viewport flex through all remaining height.

## Composition rules

- Choose entity geometry because its spatial behavior communicates meaning. Do not add icons, decorative internals, or fake technical detail.
- Prefer a sparse topology. Add an entity or connector only when it expresses a real part, boundary, transfer, dependency, or relationship.
- Use `surface` entities as low grouping planes only when a real environment, scope, or trust boundary improves comprehension. Place contained entities with `parent` and an explicit Z elevation; do not fake grouping with decorative boxes.
- Place first, route second, label third. Separate footprints and leave corridors for connectors. Declare every connector's `from` and `to` entity. Use depth sorting as a rendering aid, not as a substitute for a legible layout.
- Use one of the bundled `blueprint`, `vellum`, or `plotter` drafting themes. Keep the theme toggle intact. Distinguish connector semantics with line construction, arrow direction, and motion rather than unrelated colors.
- Keep labels short. Use the optional scene summary for the reading frame, entity metadata for one useful qualifier, and connector labels for the transferred thing or event. Do not repeat the same explanation at all three levels.
- Animate only the few relationships whose movement materially helps the reader. Static routes should remain the default in dense scenes.

## Output contract

The completed artifact must be an HTML/JavaScript diagram that runs in a browser without a build step, host dependency, harness dependency, or network dependency. Scene data must validate without errors. The artifact must retain the entity registry, connector registry, projection contract, camera controls, entity focus mode, three-theme toggle, top annotation layer, full-height viewport shell, and accessibility text from the starter.

Do not create a new renderer for each request. If the user's concept does not map cleanly to an existing type, compose existing types or ask whether the library itself should be extended. Add a new predefined type only when it represents a reusable spatial grammar across domains.

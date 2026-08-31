(() => {
  'use strict';

  const COS30 = Math.sqrt(3) / 2;
  const SIN30 = 0.5;
  const EPSILON = 0.0001;
  const SURFACE_INSET = 0.6;
  const DEFAULT_HEIGHTS = Object.freeze({
    unit: 1.6,
    stack: 2.4,
    cluster: 1.2,
    checkpoint: 2.8,
    channel: 1.2,
    store: 2.4,
    surface: 0.55
  });
  const ENTITY_TYPES = Object.freeze({
    unit: Object.freeze({ label: 'Unit', meaning: 'One indivisible participant, stage, place, or capability' }),
    stack: Object.freeze({ label: 'Stack', meaning: 'Repeated instances, ordered layers, capacity, versions, or accumulated states' }),
    cluster: Object.freeze({ label: 'Cluster', meaning: 'A bounded collection whose members matter more than sequence' }),
    checkpoint: Object.freeze({ label: 'Checkpoint', meaning: 'A gate, decision, control, threshold, approval, or transition point' }),
    channel: Object.freeze({ label: 'Channel', meaning: 'A stream, queue, lane, timeline, conveyor, or ordered series' }),
    store: Object.freeze({ label: 'Store', meaning: 'Retained material, memory, inventory, evidence, records, or accumulated resources' }),
    surface: Object.freeze({ label: 'Surface', meaning: 'A shared context, operating area, scope, environment, or workspace' })
  });
  const CONNECTOR_TYPES = Object.freeze({
    flow: Object.freeze({ label: 'Flow', direction: 'forward', pattern: 'solid', animated: true }),
    event: Object.freeze({ label: 'Event', direction: 'forward', pattern: 'dashed', animated: true }),
    association: Object.freeze({ label: 'Association', direction: 'none', pattern: 'dotted', animated: false }),
    feedback: Object.freeze({ label: 'Feedback', direction: 'both', pattern: 'solid', animated: true })
  });
  const THEME_TYPES = Object.freeze({
    blueprint: Object.freeze({ label: 'Blueprint', meaning: 'Deep navy drafting stock with pale technical ink' }),
    vellum: Object.freeze({ label: 'Vellum', meaning: 'Warm archival stock with sepia drafting ink' }),
    plotter: Object.freeze({ label: 'Plotter', meaning: 'Cool white stock with graphite linework and registration accents' })
  });
  let instanceCount = 0;

  function escapeText(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  function isFiniteNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
  }

  function positiveNumber(value) {
    return isFiniteNumber(value) && value > 0;
  }

  function changedAxisCount(a, b) {
    return a.reduce((count, value, axis) => count + (Math.abs(value - b[axis]) > EPSILON ? 1 : 0), 0);
  }

  function entityBaseZ(entity) {
    if (isFiniteNumber(entity.z)) return entity.z;
    return ['unit', 'stack', 'store'].includes(entity.type) ? 0.06 : 0.04;
  }

  function normalizePlane(plane = {}) {
    return {
      xMin: isFiniteNumber(plane.xMin) ? plane.xMin : -2,
      xMax: isFiniteNumber(plane.xMax) ? plane.xMax : 24,
      yMin: isFiniteNumber(plane.yMin) ? plane.yMin : -2,
      yMax: isFiniteNumber(plane.yMax) ? plane.yMax : 18,
      step: positiveNumber(plane.step) ? plane.step : 1,
      majorEvery: Number.isInteger(plane.majorEvery) && plane.majorEvery > 0 ? plane.majorEvery : 4
    };
  }

  function entityHeight(entity) {
    const baseHeight = positiveNumber(entity.h) ? entity.h : (DEFAULT_HEIGHTS[entity.type] || 1.6);
    if (entity.type === 'stack') {
      const count = Number.isInteger(entity.count) ? entity.count : 3;
      const gap = isFiniteNumber(entity.gap) ? entity.gap : 0.18;
      const blockHeight = positiveNumber(entity.blockHeight) ? entity.blockHeight : Math.max(0.28, (baseHeight - gap * (count - 1)) / count);
      return count * blockHeight + (count - 1) * gap;
    }
    if (entity.type === 'store') {
      const count = Number.isInteger(entity.count) ? entity.count : 5;
      const gap = isFiniteNumber(entity.gap) ? entity.gap : 0.12;
      const slabHeight = positiveNumber(entity.slabHeight) ? entity.slabHeight : Math.max(0.18, (baseHeight - gap * (count - 1)) / count);
      return count * slabHeight + (count - 1) * gap;
    }
    return baseHeight;
  }

  function pointTouchesFootprint(point, entity, tolerance = 0.12) {
    return point[0] >= entity.x - tolerance
      && point[0] <= entity.x + entity.w + tolerance
      && point[1] >= entity.y - tolerance
      && point[1] <= entity.y + entity.d + tolerance;
  }

  function segmentPassesThroughEntity(a, b, entity) {
    if (entity.type === 'surface') return false;
    const baseZ = entityBaseZ(entity);
    const topZ = baseZ + entityHeight(entity);
    const axis = [0, 1, 2].find((candidate) => Math.abs(a[candidate] - b[candidate]) > EPSILON);
    if (axis === undefined) return false;
    const rangeMin = Math.min(a[axis], b[axis]);
    const rangeMax = Math.max(a[axis], b[axis]);
    if (axis === 0) {
      return a[1] > entity.y + EPSILON && a[1] < entity.y + entity.d - EPSILON
        && a[2] > baseZ + EPSILON && a[2] < topZ - EPSILON
        && rangeMax > entity.x + EPSILON && rangeMin < entity.x + entity.w - EPSILON;
    }
    if (axis === 1) {
      return a[0] > entity.x + EPSILON && a[0] < entity.x + entity.w - EPSILON
        && a[2] > baseZ + EPSILON && a[2] < topZ - EPSILON
        && rangeMax > entity.y + EPSILON && rangeMin < entity.y + entity.d - EPSILON;
    }
    return a[0] > entity.x + EPSILON && a[0] < entity.x + entity.w - EPSILON
      && a[1] > entity.y + EPSILON && a[1] < entity.y + entity.d - EPSILON
      && rangeMax > baseZ + EPSILON && rangeMin < topZ - EPSILON;
  }

  function validateScene(scene) {
    const errors = [];
    const warnings = [];
    if (!scene || typeof scene !== 'object' || Array.isArray(scene)) {
      return { ok: false, errors: ['Scene must be an object.'], warnings };
    }
    if (typeof scene.title !== 'string' || !scene.title.trim()) errors.push('Scene title is required.');
    if (typeof scene.description !== 'string' || !scene.description.trim()) errors.push('Scene description is required.');
    if (scene.summary !== undefined && (typeof scene.summary !== 'string' || !scene.summary.trim())) errors.push('Scene summary must be a non-empty string when provided.');
    if (typeof scene.summary === 'string' && scene.summary.length > 180) warnings.push('Scene summary exceeds 180 characters; keep the visible reading frame concise.');
    if (scene.theme !== undefined && !THEME_TYPES[scene.theme]) errors.push(`Scene theme "${scene.theme}" is not predefined.`);
    if (!Array.isArray(scene.entities) || !scene.entities.length) errors.push('Scene must contain at least one entity.');
    if (!Array.isArray(scene.connectors)) errors.push('Scene connectors must be an array.');

    const plane = normalizePlane(scene.plane);
    if (plane.xMax <= plane.xMin) errors.push('plane.xMax must be greater than plane.xMin.');
    if (plane.yMax <= plane.yMin) errors.push('plane.yMax must be greater than plane.yMin.');
    if (scene.camera !== undefined) {
      if (!scene.camera || typeof scene.camera !== 'object' || Array.isArray(scene.camera)) errors.push('camera must be an object.');
      else {
        if (scene.camera.target !== undefined && (!Array.isArray(scene.camera.target) || scene.camera.target.length !== 3 || scene.camera.target.some((value) => !isFiniteNumber(value)))) errors.push('camera.target must be a finite [x, y, z] point.');
        if (scene.camera.zoom !== undefined && !positiveNumber(scene.camera.zoom)) errors.push('camera.zoom must be greater than zero.');
      }
    }
    const ids = new Set();
    const entitiesById = new Map();
    const entities = Array.isArray(scene.entities) ? scene.entities : [];

    entities.forEach((entity, index) => {
      const prefix = `entities[${index}]`;
      if (!entity || typeof entity !== 'object' || Array.isArray(entity)) {
        errors.push(`${prefix} must be an object.`);
        return;
      }
      if (typeof entity.id !== 'string' || !/^[a-z][a-z0-9-]*$/.test(entity.id)) errors.push(`${prefix}.id must use lowercase letters, numbers, and hyphens.`);
      else if (ids.has(entity.id)) errors.push(`Duplicate id "${entity.id}".`);
      else {
        ids.add(entity.id);
        entitiesById.set(entity.id, entity);
      }
      if (!ENTITY_TYPES[entity.type]) errors.push(`${prefix}.type "${entity.type}" is not predefined.`);
      if (typeof entity.label !== 'string' || !entity.label.trim()) errors.push(`${prefix}.label is required.`);
      else if (entity.label.length > 28) warnings.push(`${prefix}.label exceeds 28 characters; shorten it or move detail to meta.`);
      if (entity.meta !== undefined && typeof entity.meta !== 'string') errors.push(`${prefix}.meta must be a string when provided.`);
      else if (typeof entity.meta === 'string' && entity.meta.length > 48) warnings.push(`${prefix}.meta exceeds 48 characters; keep secondary annotation concise.`);
      ['x', 'y'].forEach((field) => { if (!isFiniteNumber(entity[field])) errors.push(`${prefix}.${field} must be a finite number.`); });
      ['w', 'd'].forEach((field) => {
        if (!positiveNumber(entity[field])) errors.push(`${prefix}.${field} must be greater than zero.`);
        else if (entity[field] < 0.75) errors.push(`${prefix}.${field} must be at least 0.75 world units.`);
      });
      if (entity.z !== undefined && !isFiniteNumber(entity.z)) errors.push(`${prefix}.z must be a finite number.`);
      else if (isFiniteNumber(entity.z) && entity.z < 0) errors.push(`${prefix}.z must be zero or greater.`);
      if (entity.h !== undefined && !positiveNumber(entity.h)) errors.push(`${prefix}.h must be greater than zero.`);
      if (entity.parent !== undefined && (typeof entity.parent !== 'string' || !/^[a-z][a-z0-9-]*$/.test(entity.parent))) errors.push(`${prefix}.parent must be a valid entity id.`);
      if (['stack', 'cluster', 'channel', 'store'].includes(entity.type)) {
        const limit = entity.type === 'stack' ? 8 : entity.type === 'store' ? 10 : 12;
        if (!Number.isInteger(entity.count) || entity.count < 2 || entity.count > limit) errors.push(`${prefix}.count must be an integer from 2 to ${limit} for ${entity.type}.`);
      }
      if (entity.type === 'cluster' && entity.columns !== undefined && (!Number.isInteger(entity.columns) || entity.columns < 1 || entity.columns > entity.count)) errors.push(`${prefix}.columns must be an integer from 1 to count.`);
      if (entity.type === 'channel' && entity.axis !== undefined && !['x', 'y'].includes(entity.axis)) errors.push(`${prefix}.axis must be "x" or "y".`);
      if (isFiniteNumber(entity.x) && positiveNumber(entity.w) && (entity.x < plane.xMin - EPSILON || entity.x + entity.w > plane.xMax + EPSILON)) errors.push(`${prefix} extends outside the plane on X.`);
      if (isFiniteNumber(entity.y) && positiveNumber(entity.d) && (entity.y < plane.yMin - EPSILON || entity.y + entity.d > plane.yMax + EPSILON)) errors.push(`${prefix} extends outside the plane on Y.`);
    });

    entities.forEach((entity, index) => {
      if (!entity || typeof entity.parent !== 'string') return;
      const prefix = `entities[${index}]`;
      const parent = entitiesById.get(entity.parent);
      if (!parent) {
        errors.push(`${prefix}.parent "${entity.parent}" does not match an entity.`);
        return;
      }
      if (parent.type !== 'surface') {
        errors.push(`${prefix}.parent "${entity.parent}" must reference a surface.`);
        return;
      }
      if (entity.type === 'surface') {
        errors.push(`${prefix} is a surface and cannot be placed on another surface.`);
        return;
      }
      if (isFiniteNumber(entity.x) && isFiniteNumber(entity.y) && positiveNumber(entity.w) && positiveNumber(entity.d)) {
        const inside = entity.x >= parent.x + SURFACE_INSET - EPSILON
          && entity.y >= parent.y + SURFACE_INSET - EPSILON
          && entity.x + entity.w <= parent.x + parent.w - SURFACE_INSET + EPSILON
          && entity.y + entity.d <= parent.y + parent.d - SURFACE_INSET + EPSILON;
        if (!inside) errors.push(`${prefix} must stay at least ${SURFACE_INSET} units inside parent surface "${parent.id}".`);
      }
      const minimumZ = entityBaseZ(parent) + entityHeight(parent) + 0.04;
      if (entityBaseZ(entity) < minimumZ - EPSILON) errors.push(`${prefix}.z must be at least ${minimumZ.toFixed(2)} to sit above parent surface "${parent.id}".`);
    });

    for (let leftIndex = 0; leftIndex < entities.length; leftIndex += 1) {
      const left = entities[leftIndex];
      if (!left || !isFiniteNumber(left.x) || !isFiniteNumber(left.y) || !positiveNumber(left.w) || !positiveNumber(left.d)) continue;
      for (let rightIndex = leftIndex + 1; rightIndex < entities.length; rightIndex += 1) {
        const right = entities[rightIndex];
        if (!right || !isFiniteNumber(right.x) || !isFiniteNumber(right.y) || !positiveNumber(right.w) || !positiveNumber(right.d)) continue;
        const overlapX = Math.min(left.x + left.w, right.x + right.w) - Math.max(left.x, right.x);
        const overlapY = Math.min(left.y + left.d, right.y + right.d) - Math.max(left.y, right.y);
        if (overlapX > EPSILON && overlapY > EPSILON) {
          const isDeclaredSurfacePlacement = (left.type === 'surface' && right.parent === left.id) || (right.type === 'surface' && left.parent === right.id);
          if (isDeclaredSurfacePlacement) continue;
          errors.push(`Entity footprints "${left.id || leftIndex}" and "${right.id || rightIndex}" overlap.`);
          continue;
        }
        const gapX = Math.max(0, Math.max(left.x, right.x) - Math.min(left.x + left.w, right.x + right.w));
        const gapY = Math.max(0, Math.max(left.y, right.y) - Math.min(left.y + left.d, right.y + right.d));
        if (Math.hypot(gapX, gapY) < 0.75) warnings.push(`Entities "${left.id || leftIndex}" and "${right.id || rightIndex}" have less than 0.75 units of footprint clearance.`);
      }
    }

    const connectorIds = new Set();
    const connectors = Array.isArray(scene.connectors) ? scene.connectors : [];
    connectors.forEach((connector, index) => {
      const prefix = `connectors[${index}]`;
      if (!connector || typeof connector !== 'object' || Array.isArray(connector)) {
        errors.push(`${prefix} must be an object.`);
        return;
      }
      if (typeof connector.id !== 'string' || !/^[a-z][a-z0-9-]*$/.test(connector.id)) errors.push(`${prefix}.id must use lowercase letters, numbers, and hyphens.`);
      else if (ids.has(connector.id) || connectorIds.has(connector.id)) errors.push(`Duplicate id "${connector.id}".`);
      else connectorIds.add(connector.id);
      if (!CONNECTOR_TYPES[connector.type]) errors.push(`${prefix}.type "${connector.type}" is not predefined.`);
      ['from', 'to'].forEach((field) => {
        if (typeof connector[field] !== 'string' || !/^[a-z][a-z0-9-]*$/.test(connector[field])) errors.push(`${prefix}.${field} must be a valid entity id.`);
        else if (!entitiesById.has(connector[field])) errors.push(`${prefix}.${field} "${connector[field]}" does not match an entity.`);
      });
      if (connector.from && connector.from === connector.to) errors.push(`${prefix}.from and .to must reference different entities.`);
      if (connector.label !== undefined && typeof connector.label !== 'string') errors.push(`${prefix}.label must be a string when provided.`);
      else if (typeof connector.label === 'string' && connector.label.length > 32) warnings.push(`${prefix}.label exceeds 32 characters; shorten the relationship name.`);
      if (!Array.isArray(connector.points) || connector.points.length < 2) {
        errors.push(`${prefix}.points must contain at least two 3D points.`);
        return;
      }
      connector.points.forEach((point, pointIndex) => {
        if (!Array.isArray(point) || point.length !== 3 || point.some((value) => !isFiniteNumber(value))) {
          errors.push(`${prefix}.points[${pointIndex}] must be [x, y, z] with finite numbers.`);
          return;
        }
        if (point[0] < plane.xMin - EPSILON || point[0] > plane.xMax + EPSILON || point[1] < plane.yMin - EPSILON || point[1] > plane.yMax + EPSILON) errors.push(`${prefix}.points[${pointIndex}] lies outside the plane.`);
        if (pointIndex > 0) {
          const axisCount = changedAxisCount(connector.points[pointIndex - 1], point);
          if (axisCount === 0) errors.push(`${prefix}.points[${pointIndex}] duplicates the prior point.`);
          if (axisCount > 1) errors.push(`${prefix} segment ${pointIndex} changes ${axisCount} axes; exactly one is allowed.`);
        }
      });
      if (connector.labelSegment !== undefined && (!Number.isInteger(connector.labelSegment) || connector.labelSegment < 0 || connector.labelSegment >= connector.points.length - 1)) errors.push(`${prefix}.labelSegment must identify an existing route segment.`);
      if (connector.labelPosition !== undefined && (!isFiniteNumber(connector.labelPosition) || connector.labelPosition < 0.1 || connector.labelPosition > 0.9)) errors.push(`${prefix}.labelPosition must be from 0.1 to 0.9.`);
      if (connector.labelOffset !== undefined && (!Array.isArray(connector.labelOffset) || connector.labelOffset.length !== 2 || connector.labelOffset.some((value) => !isFiniteNumber(value) || Math.abs(value) > 36))) errors.push(`${prefix}.labelOffset must be [x, y] with each value from -36 to 36 screen pixels.`);
      if ((connector.labelSegment !== undefined || connector.labelPosition !== undefined || connector.labelOffset !== undefined) && !connector.label) warnings.push(`${prefix} defines label placement without a label.`);
      const pointsAreValid = connector.points.every((point) => Array.isArray(point) && point.length === 3 && point.every((value) => isFiniteNumber(value)));
      if (pointsAreValid) {
        const source = entitiesById.get(connector.from);
        const target = entitiesById.get(connector.to);
        if (source && !pointTouchesFootprint(connector.points[0], source)) errors.push(`${prefix}.points[0] must touch the footprint of from entity "${source.id}".`);
        if (target && !pointTouchesFootprint(connector.points.at(-1), target)) errors.push(`${prefix}.points[last] must touch the footprint of to entity "${target.id}".`);
        connector.points.slice(1).forEach((point, segmentIndex) => {
          const prior = connector.points[segmentIndex];
          if (changedAxisCount(prior, point) !== 1) return;
          entities.forEach((entity) => {
            if (!entity || [connector.from, connector.to].includes(entity.id)) return;
            if (segmentPassesThroughEntity(prior, point, entity)) warnings.push(`${prefix} segment ${segmentIndex + 1} passes through entity "${entity.id}".`);
          });
        });
      }
      if (connector.type === 'association' && connector.animate === true) warnings.push(`${prefix} is an association; animation will be ignored.`);
    });

    const animatedCount = connectors.filter((connector) => CONNECTOR_TYPES[connector?.type]?.animated && connector.animate !== false).length;
    if (animatedCount > 4) warnings.push(`Scene animates ${animatedCount} connectors; keep motion focused on four or fewer important flows.`);

    return { ok: errors.length === 0, errors, warnings };
  }

  function createProjector(unit) {
    return ([x, y, z]) => ({ x: (x - y) * COS30 * unit, y: (x + y) * SIN30 * unit - z * unit });
  }

  function pointString(points, project) {
    return points.map((point) => {
      const projected = project(point);
      return `${projected.x.toFixed(2)},${projected.y.toFixed(2)}`;
    }).join(' ');
  }

  function solidMarkup(entity, box, project, hatchTop = false) {
    const { x, y, z, w, d, h } = box;
    const top = [[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]];
    const left = [[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]];
    const right = [[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]];
    const topClass = hatchTop ? 'bp-face-hatched' : 'bp-face-top';
    return `<polygon class="bp-face bp-face-left" data-solid="${escapeText(entity.id)}" points="${pointString(left, project)}"></polygon><polygon class="bp-face bp-face-right" data-solid="${escapeText(entity.id)}" points="${pointString(right, project)}"></polygon><polygon class="bp-face ${topClass}" data-solid="${escapeText(entity.id)}" points="${pointString(top, project)}"></polygon>`;
  }

  function shadowMarkup(entity, project) {
    const pad = 0.14;
    const z = entityBaseZ(entity);
    const points = [[entity.x - pad, entity.y - pad, z], [entity.x + entity.w + pad, entity.y - pad, z], [entity.x + entity.w + pad, entity.y + entity.d + pad, z], [entity.x - pad, entity.y + entity.d + pad, z]];
    return `<polygon class="bp-entity-shadow" points="${pointString(points, project)}"></polygon>`;
  }

  function unitRenderer(entity, project) {
    return solidMarkup(entity, { x: entity.x, y: entity.y, z: entityBaseZ(entity), w: entity.w, d: entity.d, h: entityHeight(entity) }, project);
  }

  function stackRenderer(entity, project) {
    const count = entity.count;
    const totalHeight = positiveNumber(entity.h) ? entity.h : DEFAULT_HEIGHTS.stack;
    const gap = isFiniteNumber(entity.gap) ? entity.gap : 0.18;
    const blockHeight = positiveNumber(entity.blockHeight) ? entity.blockHeight : Math.max(0.28, (totalHeight - gap * (count - 1)) / count);
    const baseZ = entityBaseZ(entity);
    return Array.from({ length: count }, (_, index) => solidMarkup(entity, {
      x: entity.x,
      y: entity.y,
      z: baseZ + index * (blockHeight + gap),
      w: entity.w,
      d: entity.d,
      h: blockHeight
    }, project)).join('');
  }

  function clusterRenderer(entity, project) {
    const count = entity.count;
    const columns = entity.columns || Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / columns);
    const margin = 0.24;
    const gutter = 0.16;
    const baseHeight = 0.2;
    const cellWidth = (entity.w - margin * 2 - gutter * (columns - 1)) / columns;
    const cellDepth = (entity.d - margin * 2 - gutter * (rows - 1)) / rows;
    const itemHeight = Math.max(0.38, entityHeight(entity) - baseHeight - 0.08);
    const baseZ = entityBaseZ(entity);
    let markup = solidMarkup(entity, { x: entity.x, y: entity.y, z: baseZ, w: entity.w, d: entity.d, h: baseHeight }, project);
    for (let index = 0; index < count; index += 1) {
      const column = index % columns;
      const row = Math.floor(index / columns);
      markup += solidMarkup(entity, {
        x: entity.x + margin + column * (cellWidth + gutter),
        y: entity.y + margin + row * (cellDepth + gutter),
        z: baseZ + baseHeight + 0.08,
        w: cellWidth,
        d: cellDepth,
        h: itemHeight
      }, project);
    }
    return markup;
  }

  function checkpointRenderer(entity, project) {
    const baseZ = entityBaseZ(entity);
    const plinthHeight = 0.22;
    const inset = Math.min(entity.w, entity.d) * 0.16;
    return solidMarkup(entity, { x: entity.x, y: entity.y, z: baseZ, w: entity.w, d: entity.d, h: plinthHeight }, project)
      + solidMarkup(entity, { x: entity.x + inset, y: entity.y + inset, z: baseZ + plinthHeight + 0.08, w: entity.w - inset * 2, d: entity.d - inset * 2, h: entityHeight(entity) - plinthHeight - 0.08 }, project);
  }

  function channelRenderer(entity, project) {
    const baseZ = entityBaseZ(entity);
    const baseHeight = 0.2;
    const margin = 0.24;
    const gap = 0.14;
    const axis = entity.axis || (entity.w >= entity.d ? 'x' : 'y');
    let markup = solidMarkup(entity, { x: entity.x, y: entity.y, z: baseZ, w: entity.w, d: entity.d, h: baseHeight }, project);
    if (axis === 'x') {
      const segmentWidth = (entity.w - margin * 2 - gap * (entity.count - 1)) / entity.count;
      for (let index = 0; index < entity.count; index += 1) markup += solidMarkup(entity, { x: entity.x + margin + index * (segmentWidth + gap), y: entity.y + margin, z: baseZ + baseHeight + 0.08, w: segmentWidth, d: entity.d - margin * 2, h: entityHeight(entity) - baseHeight - 0.08 }, project);
    } else {
      const segmentDepth = (entity.d - margin * 2 - gap * (entity.count - 1)) / entity.count;
      for (let index = 0; index < entity.count; index += 1) markup += solidMarkup(entity, { x: entity.x + margin, y: entity.y + margin + index * (segmentDepth + gap), z: baseZ + baseHeight + 0.08, w: entity.w - margin * 2, d: segmentDepth, h: entityHeight(entity) - baseHeight - 0.08 }, project);
    }
    return markup;
  }

  function storeRenderer(entity, project) {
    const count = entity.count;
    const totalHeight = positiveNumber(entity.h) ? entity.h : DEFAULT_HEIGHTS.store;
    const gap = isFiniteNumber(entity.gap) ? entity.gap : 0.12;
    const slabHeight = positiveNumber(entity.slabHeight) ? entity.slabHeight : Math.max(0.18, (totalHeight - gap * (count - 1)) / count);
    const baseZ = entityBaseZ(entity);
    return Array.from({ length: count }, (_, index) => solidMarkup(entity, {
      x: entity.x,
      y: entity.y,
      z: baseZ + index * (slabHeight + gap),
      w: entity.w,
      d: entity.d,
      h: slabHeight
    }, project, index === count - 1)).join('');
  }

  function surfaceRenderer(entity, project) {
    const baseZ = entityBaseZ(entity);
    const baseHeight = 0.14;
    const separation = 0.04;
    const inset = 0.28;
    return solidMarkup(entity, { x: entity.x, y: entity.y, z: baseZ, w: entity.w, d: entity.d, h: baseHeight }, project)
      + solidMarkup(entity, { x: entity.x + inset, y: entity.y + inset, z: baseZ + baseHeight + separation, w: entity.w - inset * 2, d: entity.d - inset * 2, h: Math.max(0.14, entityHeight(entity) - baseHeight - separation) }, project);
  }

  const ENTITY_RENDERERS = Object.freeze({
    unit: unitRenderer,
    stack: stackRenderer,
    cluster: clusterRenderer,
    checkpoint: checkpointRenderer,
    channel: channelRenderer,
    store: storeRenderer,
    surface: surfaceRenderer
  });

  function entityGeometryMarkup(entity, project) {
    const body = shadowMarkup(entity, project) + ENTITY_RENDERERS[entity.type](entity, project);
    const accessibleLabel = entity.meta ? `${entity.label}: ${entity.meta}` : entity.label;
    return `<g class="bp-entity" data-entity-id="${escapeText(entity.id)}" data-entity-type="${escapeText(entity.type)}" role="button" tabindex="0" aria-pressed="false" aria-label="${escapeText(`Focus ${accessibleLabel}`)}">${body}</g>`;
  }

  function entityAnnotationMarkup(entity, project) {
    const z = entityBaseZ(entity);
    const visualHeight = entityHeight(entity);
    const isSurface = entity.type === 'surface';
    const top = project(isSurface
      ? [entity.x + 0.75, entity.y + 0.75, z + visualHeight + 0.14]
      : [entity.x + entity.w / 2, entity.y + entity.d / 2, z + visualHeight + 0.22]);
    const base = project(isSurface
      ? [entity.x + entity.w / 2, entity.y + entity.d, z]
      : [entity.x + entity.w / 2, entity.y + entity.d / 2, z]);
    const code = entity.code ? `<text class="bp-entity-code" x="${top.x.toFixed(2)}" y="${(top.y + 5).toFixed(2)}">${escapeText(entity.code)}</text>` : '';
    const meta = entity.meta ? `<text class="bp-entity-meta" x="${base.x.toFixed(2)}" y="${(base.y + 42).toFixed(2)}">${escapeText(entity.meta)}</text>` : '';
    return `<g class="bp-entity-annotation" data-entity-id="${escapeText(entity.id)}" data-entity-type="${escapeText(entity.type)}">${code}<text class="bp-entity-name" x="${base.x.toFixed(2)}" y="${(base.y + 25).toFixed(2)}">${escapeText(entity.label)}</text>${meta}</g>`;
  }

  function routePath(connector, project) {
    return connector.points.map((point, index) => {
      const projected = project(point);
      return `${index === 0 ? 'M' : 'L'} ${projected.x.toFixed(2)} ${projected.y.toFixed(2)}`;
    }).join(' ');
  }

  function connectorLabelPosition(connector, project) {
    let selectedIndex = Number.isInteger(connector.labelSegment) ? connector.labelSegment : 0;
    if (!Number.isInteger(connector.labelSegment)) {
      let longestLength = -1;
      for (let index = 1; index < connector.points.length; index += 1) {
        const a = connector.points[index - 1];
        const b = connector.points[index];
        const length = Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]) + Math.abs(b[2] - a[2]);
        if (length > longestLength) {
          longestLength = length;
          selectedIndex = index - 1;
        }
      }
    }
    const a = connector.points[selectedIndex];
    const b = connector.points[selectedIndex + 1];
    const position = isFiniteNumber(connector.labelPosition) ? connector.labelPosition : 0.5;
    return project(a.map((value, axis) => value + (b[axis] - value) * position));
  }

  function connectorGeometryMarkup(connector, index, project, namespace, entitiesById) {
    const type = CONNECTOR_TYPES[connector.type];
    const path = routePath(connector, project);
    const pathId = `${namespace}-${connector.id}`;
    const markerStart = type.direction === 'both' ? ` marker-start="url(#${namespace}-arrow-start)"` : '';
    const markerEnd = ['forward', 'both'].includes(type.direction) ? ` marker-end="url(#${namespace}-arrow-end)"` : '';
    const junctions = connector.points.slice(1, -1).map((point) => {
      const projected = project(point);
      return `<circle class="bp-junction" cx="${projected.x.toFixed(2)}" cy="${projected.y.toFixed(2)}" r="3"></circle>`;
    }).join('');
    const shouldAnimate = type.animated && connector.animate !== false;
    const duration = positiveNumber(connector.duration) ? connector.duration : 3.4 + index * 0.16;
    const packet = shouldAnimate ? `<circle class="bp-packet" r="5"><animateMotion dur="${duration.toFixed(2)}s" begin="-${(index * 0.47).toFixed(2)}s" repeatCount="indefinite"><mpath href="#${pathId}"></mpath></animateMotion></circle>` : '';
    const sourceLabel = entitiesById.get(connector.from)?.label || connector.from;
    const targetLabel = entitiesById.get(connector.to)?.label || connector.to;
    const accessibleLabel = connector.label ? `${connector.label}: ${sourceLabel} to ${targetLabel}` : `${type.label}: ${sourceLabel} to ${targetLabel}`;
    return `<g class="bp-connector-group" data-connector-id="${escapeText(connector.id)}" data-from="${escapeText(connector.from)}" data-to="${escapeText(connector.to)}" role="group" aria-label="${escapeText(accessibleLabel)}"><path class="bp-connector-bed" d="${path}"></path><path id="${pathId}" class="bp-connector" data-connector-type="${escapeText(connector.type)}" d="${path}"${markerStart}${markerEnd}></path>${junctions}${packet}</g>`;
  }

  function connectorAnnotationMarkup(connector, project) {
    if (!connector.label) return '';
    const labelPosition = connectorLabelPosition(connector, project);
    const labelOffset = Array.isArray(connector.labelOffset) ? connector.labelOffset : [0, -10];
    return `<text class="bp-connector-label" data-connector-id="${escapeText(connector.id)}" data-from="${escapeText(connector.from)}" data-to="${escapeText(connector.to)}" x="${(labelPosition.x + labelOffset[0]).toFixed(2)}" y="${(labelPosition.y + labelOffset[1]).toFixed(2)}">${escapeText(connector.label)}</text>`;
  }

  function projectedBounds(scene, project) {
    const plane = normalizePlane(scene.plane);
    const points = [
      [plane.xMin, plane.yMin, 0],
      [plane.xMax, plane.yMin, 0],
      [plane.xMax, plane.yMax, 0],
      [plane.xMin, plane.yMax, 0]
    ];
    scene.entities.forEach((entity) => {
      const z = entityBaseZ(entity);
      const h = entityHeight(entity);
      [entity.x, entity.x + entity.w].forEach((x) => [entity.y, entity.y + entity.d].forEach((y) => {
        points.push([x, y, z]);
        points.push([x, y, z + h]);
      }));
    });
    scene.connectors.forEach((connector) => connector.points.forEach((point) => points.push(point)));
    const projected = points.map(project);
    const xs = projected.map((point) => point.x);
    const ys = projected.map((point) => point.y);
    const margin = 90;
    const minX = Math.min(...xs) - margin;
    const maxX = Math.max(...xs) + margin;
    const minY = Math.min(...ys) - margin;
    const maxY = Math.max(...ys) + margin;
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }

  function gridMarkup(scene, project) {
    const plane = normalizePlane(scene.plane);
    const lines = [];
    let index = 0;
    for (let x = plane.xMin; x <= plane.xMax + EPSILON; x += plane.step, index += 1) {
      const a = project([x, plane.yMin, 0]);
      const b = project([x, plane.yMax, 0]);
      lines.push(`<line class="bp-grid-line${index % plane.majorEvery === 0 ? ' is-major' : ''}" x1="${a.x.toFixed(2)}" y1="${a.y.toFixed(2)}" x2="${b.x.toFixed(2)}" y2="${b.y.toFixed(2)}"></line>`);
    }
    index = 0;
    for (let y = plane.yMin; y <= plane.yMax + EPSILON; y += plane.step, index += 1) {
      const a = project([plane.xMin, y, 0]);
      const b = project([plane.xMax, y, 0]);
      lines.push(`<line class="bp-grid-line${index % plane.majorEvery === 0 ? ' is-major' : ''}" x1="${a.x.toFixed(2)}" y1="${a.y.toFixed(2)}" x2="${b.x.toFixed(2)}" y2="${b.y.toFixed(2)}"></line>`);
    }
    const boundary = pointString([[plane.xMin, plane.yMin, 0], [plane.xMax, plane.yMin, 0], [plane.xMax, plane.yMax, 0], [plane.xMin, plane.yMax, 0], [plane.xMin, plane.yMin, 0]], project);
    return `${lines.join('')}<polyline class="bp-boundary" points="${boundary}"></polyline>`;
  }

  function defsMarkup(namespace) {
    return `<defs><pattern id="bp-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><rect width="7" height="7" fill="var(--bp-top)"></rect><line x1="0" y1="0" x2="0" y2="7" stroke="var(--bp-muted)" stroke-width="1"></line></pattern><marker id="${namespace}-arrow-end" markerWidth="4" markerHeight="4" refX="5.4" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 6 6"><path d="M 0.6 0.6 L 5.4 3 L 0.6 5.4 Z" fill="context-stroke"></path></marker><marker id="${namespace}-arrow-start" markerWidth="4" markerHeight="4" refX="5.4" refY="3" orient="auto-start-reverse" markerUnits="strokeWidth" viewBox="0 0 6 6"><path d="M 0.6 0.6 L 5.4 3 L 0.6 5.4 Z" fill="context-stroke"></path></marker></defs>`;
  }

  function axisMarkup(bounds) {
    const x = bounds.x + bounds.width - 72;
    const y = bounds.y + bounds.height - 62;
    return `<g aria-label="Isometric axis guide"><line class="bp-axis-line" x1="${x}" y1="${y}" x2="${x + 42}" y2="${y + 24}"></line><line class="bp-axis-line" x1="${x}" y1="${y}" x2="${x - 42}" y2="${y + 24}"></line><line class="bp-axis-line" x1="${x}" y1="${y}" x2="${x}" y2="${y - 48}"></line><text class="bp-axis-label" x="${x + 54}" y="${y + 31}">X</text><text class="bp-axis-label" x="${x - 54}" y="${y + 31}">Y</text><text class="bp-axis-label" x="${x}" y="${y - 58}">Z</text></g>`;
  }

  function legendMarkup(scene) {
    const usedTypes = new Set(scene.connectors.map((connector) => connector.type));
    const types = Object.keys(CONNECTOR_TYPES).filter((type) => usedTypes.has(type));
    const items = types.map((type) => `<span><i class="is-${type}"></i>${escapeText(CONNECTOR_TYPES[type].label)}</span>`).join('');
    return `${items}<span class="bp-gesture">Select an entity to focus · Escape to clear · Drag to pan · Scroll to zoom</span>`;
  }

  function themePickerMarkup() {
    return Object.entries(THEME_TYPES).map(([id, theme]) => `<button class="bp-theme-button" type="button" data-bp-theme-value="${id}" aria-pressed="false" title="${escapeText(theme.meaning)}">${escapeText(theme.label)}</button>`).join('');
  }

  function mount(root, scene, options = {}) {
    if (!(root instanceof Element)) return { ok: false, errors: ['Mount root must be a DOM element.'], warnings: [] };
    const validation = validateScene(scene);
    if (!validation.ok) return validation;
    const namespace = `bp-${++instanceCount}`;
    const unit = positiveNumber(options.unit) ? options.unit : 54;
    const project = createProjector(unit);
    const bounds = projectedBounds(scene, project);
    const entitiesById = new Map(scene.entities.map((entity) => [entity.id, entity]));
    const summary = scene.summary ? `<p class="bp-summary">${escapeText(scene.summary)}</p>` : '';
    root.classList.add('iso-blueprint', 'is-running');
    root.innerHTML = `<div class="bp-toolbar" aria-label="Diagram controls"><div class="bp-toolbar-cluster"><label class="bp-switch"><input type="checkbox" data-bp-action="motion" checked><span>Run the flow</span></label><div class="bp-theme-picker" role="group" aria-label="Diagram theme">${themePickerMarkup()}</div></div><div class="bp-toolbar-group"><button class="bp-button" type="button" data-bp-action="zoom-in">Zoom in</button><button class="bp-button" type="button" data-bp-action="zoom-out">Zoom out</button><button class="bp-button" type="button" data-bp-action="fit">Fit view</button></div></div><header class="bp-header"><div class="bp-heading"><div class="bp-kicker">${escapeText(scene.kicker || 'ISOMETRIC BLUEPRINT')}</div><h1 class="bp-title">${escapeText(scene.title)}</h1>${summary}</div><div class="bp-standards" aria-label="Projection standards"><span>30° ISOMETRIC</span><span>X:Y:Z 1:1:1</span><span>AXIS-ROUTED</span></div></header><div class="bp-viewport"><svg class="bp-diagram" role="img" aria-labelledby="${namespace}-title ${namespace}-desc"><title id="${namespace}-title">${escapeText(scene.title)}</title><desc id="${namespace}-desc">${escapeText(scene.description)}</desc></svg></div><footer class="bp-footer"><div class="bp-legend" aria-label="Relationship legend">${legendMarkup(scene)}</div></footer>`;
    const svg = root.querySelector('.bp-diagram');
    const orderedEntities = [...scene.entities].sort((a, b) => (a.x + a.y + (a.w + a.d) / 2 + (a.z || 0) * 0.001) - (b.x + b.y + (b.w + b.d) / 2 + (b.z || 0) * 0.001));
    const surfaces = orderedEntities.filter((entity) => entity.type === 'surface');
    const solids = orderedEntities.filter((entity) => entity.type !== 'surface');
    svg.innerHTML = `<title id="${namespace}-title">${escapeText(scene.title)}</title><desc id="${namespace}-desc">${escapeText(scene.description)}</desc>${defsMarkup(namespace)}${gridMarkup(scene, project)}<g class="bp-surfaces">${surfaces.map((entity) => entityGeometryMarkup(entity, project)).join('')}</g><g class="bp-connectors">${scene.connectors.map((connector, index) => connectorGeometryMarkup(connector, index, project, namespace, entitiesById)).join('')}</g><g class="bp-entities">${solids.map((entity) => entityGeometryMarkup(entity, project)).join('')}</g><g class="bp-annotations" aria-hidden="true"><g class="bp-connector-annotations">${scene.connectors.map((connector) => connectorAnnotationMarkup(connector, project)).join('')}</g><g class="bp-entity-annotations">${orderedEntities.map((entity) => entityAnnotationMarkup(entity, project)).join('')}</g></g>${axisMarkup(bounds)}`;

    const initialTarget = Array.isArray(scene.camera?.target) ? project(scene.camera.target) : { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
    const camera = { cx: initialTarget.x, cy: initialTarget.y, zoom: positiveNumber(scene.camera?.zoom) ? Math.max(0.25, Math.min(4, scene.camera.zoom)) : 0.8 };
    let activeTheme = THEME_TYPES[options.theme] ? options.theme : THEME_TYPES[scene.theme] ? scene.theme : 'blueprint';
    let selectedEntityId = null;
    let drag = null;
    let suppressSelectionClick = false;
    function setTheme(theme) {
      if (!THEME_TYPES[theme]) return false;
      activeTheme = theme;
      root.dataset.bpTheme = theme;
      root.querySelectorAll('[data-bp-theme-value]').forEach((control) => control.setAttribute('aria-pressed', String(control.dataset.bpThemeValue === theme)));
      return true;
    }
    function selectEntity(entityId) {
      if (entityId !== null && !entitiesById.has(entityId)) return false;
      selectedEntityId = entityId;
      root.classList.toggle('has-selection', entityId !== null);
      if (entityId === null) delete root.dataset.bpSelectedEntity;
      else root.dataset.bpSelectedEntity = entityId;
      root.querySelectorAll('.bp-entity, .bp-entity-annotation').forEach((element) => {
        const isSelected = entityId !== null && element.dataset.entityId === entityId;
        if (isSelected) element.dataset.bpEmphasis = 'selected';
        else delete element.dataset.bpEmphasis;
        if (element.classList.contains('bp-entity')) element.setAttribute('aria-pressed', String(isSelected));
      });
      root.querySelectorAll('.bp-connector-group, .bp-connector-label').forEach((element) => {
        const isRelated = entityId !== null && [element.dataset.from, element.dataset.to].includes(entityId);
        if (isRelated) element.dataset.bpEmphasis = 'related';
        else delete element.dataset.bpEmphasis;
      });
      return true;
    }
    function clearSelection() {
      return selectEntity(null);
    }
    function applyCamera() {
      const rect = svg.getBoundingClientRect();
      const width = rect.width || 960;
      const height = rect.height || 680;
      const viewWidth = width / camera.zoom;
      const viewHeight = height / camera.zoom;
      svg.setAttribute('viewBox', `${(camera.cx - viewWidth / 2).toFixed(2)} ${(camera.cy - viewHeight / 2).toFixed(2)} ${viewWidth.toFixed(2)} ${viewHeight.toFixed(2)}`);
    }
    function zoomBy(factor, anchorX, anchorY) {
      const rect = svg.getBoundingClientRect();
      const prior = camera.zoom;
      const next = Math.max(0.25, Math.min(4, prior * factor));
      const px = anchorX === undefined ? rect.width / 2 : anchorX;
      const py = anchorY === undefined ? rect.height / 2 : anchorY;
      const worldX = camera.cx + (px - rect.width / 2) / prior;
      const worldY = camera.cy + (py - rect.height / 2) / prior;
      camera.zoom = next;
      camera.cx = worldX - (px - rect.width / 2) / next;
      camera.cy = worldY - (py - rect.height / 2) / next;
      applyCamera();
    }
    function fitView() {
      const rect = svg.getBoundingClientRect();
      camera.cx = bounds.x + bounds.width / 2;
      camera.cy = bounds.y + bounds.height / 2;
      camera.zoom = Math.max(0.25, Math.min(2, Math.min(rect.width / bounds.width, rect.height / bounds.height)));
      applyCamera();
    }
    function pointerDown(event) {
      if (event.button !== 0) return;
      const entityTarget = event.target.closest('[data-entity-id]');
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, cx: camera.cx, cy: camera.cy, moved: false, entityId: entityTarget?.dataset.entityId || null };
      svg.setPointerCapture(event.pointerId);
      svg.classList.add('is-panning');
    }
    function pointerMove(event) {
      if (!drag || event.pointerId !== drag.id) return;
      if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 4) drag.moved = true;
      camera.cx = drag.cx - (event.clientX - drag.x) / camera.zoom;
      camera.cy = drag.cy - (event.clientY - drag.y) / camera.zoom;
      applyCamera();
    }
    function pointerEnd(event) {
      if (!drag || event.pointerId !== drag.id) return;
      const completedDrag = drag;
      suppressSelectionClick = event.type === 'pointerup';
      drag = null;
      svg.classList.remove('is-panning');
      if (event.type !== 'pointerup' || completedDrag.moved) return;
      selectEntity(completedDrag.entityId === selectedEntityId ? null : completedDrag.entityId);
    }
    function wheel(event) {
      event.preventDefault();
      const rect = svg.getBoundingClientRect();
      zoomBy(Math.exp(-event.deltaY * 0.0015), event.clientX - rect.left, event.clientY - rect.top);
    }
    function motion(event) {
      root.classList.toggle('is-running', event.currentTarget.checked);
    }
    function selectionClick(event) {
      if (suppressSelectionClick) {
        suppressSelectionClick = false;
        return;
      }
      const target = event.target.closest('[data-entity-id]');
      if (!target || !svg.contains(target)) {
        clearSelection();
        return;
      }
      const entityId = target.dataset.entityId;
      selectEntity(entityId === selectedEntityId ? null : entityId);
    }
    function selectionKeydown(event) {
      if (event.key === 'Escape') {
        clearSelection();
        return;
      }
      if (!['Enter', ' '].includes(event.key)) return;
      const target = event.target.closest('.bp-entity[data-entity-id]');
      if (!target) return;
      event.preventDefault();
      const entityId = target.dataset.entityId;
      selectEntity(entityId === selectedEntityId ? null : entityId);
    }
    const motionControl = root.querySelector('[data-bp-action="motion"]');
    const zoomIn = root.querySelector('[data-bp-action="zoom-in"]');
    const zoomOut = root.querySelector('[data-bp-action="zoom-out"]');
    const fit = root.querySelector('[data-bp-action="fit"]');
    const themeControls = root.querySelectorAll('[data-bp-theme-value]');
    motionControl.addEventListener('change', motion);
    themeControls.forEach((control) => control.addEventListener('click', () => setTheme(control.dataset.bpThemeValue)));
    zoomIn.addEventListener('click', () => zoomBy(1.25));
    zoomOut.addEventListener('click', () => zoomBy(0.8));
    fit.addEventListener('click', fitView);
    svg.addEventListener('pointerdown', pointerDown);
    svg.addEventListener('pointermove', pointerMove);
    svg.addEventListener('pointerup', pointerEnd);
    svg.addEventListener('pointercancel', pointerEnd);
    svg.addEventListener('wheel', wheel, { passive: false });
    svg.addEventListener('click', selectionClick);
    svg.addEventListener('keydown', selectionKeydown);
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(applyCamera) : null;
    if (observer) observer.observe(svg);
    setTheme(activeTheme);
    applyCamera();
    validation.warnings.forEach((warning) => console.warn(`[IsometricBlueprint] ${warning}`));
    return {
      ok: true,
      errors: [],
      warnings: validation.warnings,
      fit: fitView,
      zoomBy,
      setTheme,
      get theme() { return activeTheme; },
      selectEntity,
      clearSelection,
      get selectedEntityId() { return selectedEntityId; },
      project,
      destroy() {
        if (observer) observer.disconnect();
        root.replaceChildren();
        root.classList.remove('iso-blueprint', 'is-running', 'has-selection');
        delete root.dataset.bpTheme;
        delete root.dataset.bpSelectedEntity;
      }
    };
  }

  globalThis.IsometricBlueprint = Object.freeze({
    version: '1.5.0',
    entityTypes: ENTITY_TYPES,
    connectorTypes: CONNECTOR_TYPES,
    themes: THEME_TYPES,
    project: (point, unit = 54) => createProjector(unit)(point),
    validateScene,
    mount
  });
})();

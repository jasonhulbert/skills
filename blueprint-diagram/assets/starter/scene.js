globalThis.BLUEPRINT_SCENE = {
  title: 'Shared work lifecycle',
  kicker: 'REFERENCE SCENE / DOMAIN-NEUTRAL GRAMMAR',
  summary: 'Work moves through a controlled path while retained output and shared context remain visible around it.',
  description: 'An interactive isometric blueprint showing work entering through several sources, passing a checkpoint, moving along a channel, branching into a stacked work group on a shared context surface, and ending in retained output.',
  plane: { xMin: -3, xMax: 27, yMin: -2, yMax: 21, step: 1, majorEvery: 4 },
  camera: { target: [12, 9, 0], zoom: 0.82 },
  entities: [
    { id: 'sources', type: 'cluster', code: '01', label: 'SOURCES', meta: '4 participants', x: 0, y: 1, w: 4, d: 3, h: 1.15, count: 4, columns: 2 },
    { id: 'checkpoint', type: 'checkpoint', code: '02', label: 'CHECKPOINT', meta: 'entry criteria', x: 7, y: 2, w: 2.7, d: 2.7, h: 3.2 },
    { id: 'channel', type: 'channel', code: '03', label: 'ACTIVE CHANNEL', meta: '6 ordered stages', x: 13, y: 1.4, w: 6.2, d: 2.8, h: 1.25, count: 6, axis: 'x' },
    { id: 'review', type: 'unit', code: '04', label: 'REVIEW', meta: 'one bounded stage', x: 22.5, y: 2.1, w: 3, d: 2.7, h: 2.1 },
    { id: 'context', type: 'surface', code: '06', label: 'SHARED CONTEXT', meta: 'common operating plane', x: 9, y: 7, w: 13, d: 8, h: 0.55 },
    { id: 'work', type: 'stack', code: '05', label: 'WORK SET', meta: '3 aligned layers', parent: 'context', x: 17, y: 9, z: 0.7, w: 3.5, d: 2.8, h: 2.35, count: 3 },
    { id: 'retained', type: 'store', code: '07', label: 'RETAINED OUTPUT', meta: '5 accumulated slabs', x: 1.5, y: 14, w: 4, d: 3, h: 2.5, count: 5 }
  ],
  connectors: [
    { id: 'intake', type: 'flow', from: 'sources', to: 'checkpoint', label: 'intake', animate: false, points: [[4, 2.5, 0.68], [7, 2.5, 0.68]] },
    { id: 'admit', type: 'event', from: 'checkpoint', to: 'channel', label: 'admitted', points: [[9.7, 3.35, 0.8], [13, 3.35, 0.8]] },
    { id: 'advance', type: 'flow', from: 'channel', to: 'review', label: 'advance', animate: false, points: [[19.2, 2.8, 0.72], [22.5, 2.8, 0.72]] },
    { id: 'assign', type: 'flow', from: 'review', to: 'work', label: 'assigned work', labelSegment: 0, labelPosition: 0.42, points: [[24, 4.8, 1.1], [24, 10.4, 1.1], [20.5, 10.4, 1.1]] },
    { id: 'observe', type: 'association', from: 'work', to: 'context', label: 'shared context', points: [[17, 10.4, 1.2], [12.5, 10.4, 1.2], [12.5, 15, 1.2]] },
    { id: 'retain', type: 'flow', from: 'context', to: 'retained', label: 'retained', labelSegment: 0, points: [[9, 13.5, 0.72], [5.5, 13.5, 0.72], [5.5, 14, 0.72]] },
    { id: 'feedback', type: 'feedback', from: 'retained', to: 'sources', label: 'feedback', animate: false, labelSegment: 1, labelPosition: 0.38, points: [[1.5, 15.5, 0.76], [-1, 15.5, 0.76], [-1, 3.5, 0.76], [0, 3.5, 0.76]] },
    { id: 'signal', type: 'event', from: 'channel', to: 'work', label: 'stage signal', animate: false, labelSegment: 0, labelPosition: 0.58, points: [[15.6, 4.2, 1.1], [15.6, 9, 1.1], [17, 9, 1.1]] }
  ]
};

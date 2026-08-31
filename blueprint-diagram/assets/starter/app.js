(() => {
  const root = document.getElementById('blueprint-diagram');
  const result = globalThis.IsometricBlueprint.mount(root, globalThis.BLUEPRINT_SCENE);
  if (!result.ok) {
    const message = document.createElement('pre');
    message.className = 'bp-error';
    message.setAttribute('role', 'alert');
    message.textContent = result.errors.join('\n');
    root.replaceChildren(message);
  }
})();

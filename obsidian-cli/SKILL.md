---
name: obsidian-cli
description: Use the Obsidian CLI when the Obsidian MCP server is unavailable or lacks the needed operation.
x-anthropic:
  disable-model-invocation: true
---

# Obsidian CLI Fallback

Prefer the Obsidian MCP tools. Use this guide only when direct CLI access is needed.

- Discover commands with `obsidian help` and `obsidian help <command>`. Never run bare `obsidian`; it launches the GUI. Consult [official documentation](https://help.obsidian.md/cli) for further detail.
- Syntax is `obsidian <command> key=value flag`. Quote values containing spaces.
- Use exact vault-relative `path=` for writes. `file=` resolves by name and can be ambiguous.
- When vault targeting is unclear, use `obsidian vaults` and pass `vault="<name>"` explicitly.
- Before task updates, list tasks with `obsidian tasks verbose` to obtain a fresh `ref="<path>:<line>"`.

For generated or multiline content, write a temporary UTF-8 file and pass its contents using quoted command substitution. Run under `/bin/bash` with `login:false`:

```bash
obsidian append vault="Notes" path="inbox/log.md" content="$(cat /tmp/obsidian-content.txt)"
```

Substitute the intended vault, note, and temporary file. Shell syntax inside the file is not re-executed. Avoid manually adding backslashes before quotes.

Obsidian must be running. For connection errors, check that the app is open. Invoke the CLI directly through the shell; Node-spawned Obsidian has aborted with `SIGABRT` in this environment.

If reads work but a write fails, check whether it took effect before retrying. An exit code of `-1` can indicate sandbox restrictions. When evidence points to a sandbox denial, use the available escalation mechanism for that command.

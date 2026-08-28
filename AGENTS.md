# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

ELARA photography should avoid visible faces. Prefer hand-only or hand-and-forearm compositions, keep the ring clearly readable, and exclude faces, heads, and reflected faces unless the user explicitly asks otherwise.

The ELARA hero uses one full-width image. The header and desktop hero copy/action group must float directly above that image with fully transparent backgrounds; do not reserve a separate header row or opaque/translucent left panel. Ritual-card images must remain in normal flow and never cover their title, index, English label, or description.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## 开发任务工作流

- 任何代码、配置或正式文档的新增、修改或删除前，必须先写明本次任务的范围、方案、依赖和验收标准。
- 计划必须先写入对应的 GitHub Issue；没有对应 Issue，不得开始实施。
- Agent 必须同时通过 GitHub Issue 的 assignee 和领取评论认领任务：将自己设为 assignee，并在 Issue 中明确评论领取及确认范围。只有完成这两项才算已领取。
- 未领取前只能进行只读调查和回答问题，不得开发、修改文件或提交；领取后也不得直接在 `main` 开发，必须从最新 `main` 创建与该 Issue 对应的分支和隔离 worktree。
- 分支、worktree、提交和 PR 必须全部对应同一个 Issue；创建或推进其中任何一项时，都要核对 Issue 编号和任务范围，禁止把其他 Issue 的工作混入其中。
- 如果范围、方案、依赖或验收标准发生变化，必须先更新对应 Issue，再继续开发；无法在原 Issue 范围内完成时，应先暂停并处理任务拆分或重新确认。
- 完成后必须在对应 Issue 回写测试结果、提交和推送信息、PR 状态、部署状态以及遗留风险；没有 PR 或部署时也要明确记录为未创建或不适用。
- 只读调查和回答问题不强制创建 Issue；一旦要进行代码、配置或正式文档改动，就必须回到上述流程。

## Durable Chinese landing direction

- The Chinese page is the primary redesign surface. Keep the English and Japanese landing experiences unchanged unless explicitly requested.
- The Chinese narrative follows six blocks: desire-led hero, ring-first design, quiet technology, daily understanding, credible people and validation, then purchase plus a separate Gift path.
- The technology chapter is the brand differentiator: explain that advanced sensing adapts to the wearer instead of asking the wearer to adapt to technology. Use quiet, sparse PPG/vibration references rather than a circuit-board showcase.
- Public copy may show the supplied design targets `6 mm`, `US 6+`, titanium inner ring, and `¥59,500 起` as concept/target information. Do not publish a `世界最细` claim until claim clearance is complete.
- Trust content should introduce specific roles and responsibilities (including the supplied Tokyo University female-health-design participation) and mark names, credentials, validation results, and final specifications as pending disclosure when evidence is not yet available.
- Purchase UI must show Standard / design options, finishes, engraving, and a distinct Gift entry with an NFC message-card path. The prototype purchase/waitlist flow remains local-only and must not imply a live order or reservation service.

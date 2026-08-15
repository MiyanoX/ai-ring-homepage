# ELARA One 中日英多语言设计

## 状态

已由用户确认，待实现。

## 背景

当前 ELARA One landing page 是 Vite + React 单页原型，页面文案集中在 `src/content.js`，部分导航、表单、辅助功能文案仍直接写在 `src/App.jsx` 中。页面目前以中文渲染，没有稳定的语言 URL，也没有语言切换能力。

产品面向全球用户，因此语言选择不仅要改变可见文案，还要支持可分享、可收藏、可回退和可扩展的语言页面地址，同时保持现有 ELARA 的编辑型视觉系统、页面结构、概念产品边界和 Sites 部署契约。

## 目标

- 支持中文、日文、英文三种完整页面语言。
- 使用稳定的语言路径：`/zh/`、`/ja/`、`/en/`。
- 根路径 `/` 默认英文，并在首次访问时可根据已保存偏好或浏览器语言选择语言。
- 在桌面端提供可发现的顶部语言切换器，在移动端保留可用的语言入口。
- 切换语言时保留当前页面锚点，例如从 `/zh/#rituals` 切换到 `/ja/#rituals`。
- 将所有可见文案、表单状态文案、辅助标签和图片替代文本纳入统一的 locale 内容源。
- 动态同步 `html lang`、页面标题、描述、canonical 和 `hreflang` 元信息。
- 保持现有图片、布局、表单本地演示行为、无横向滚动和 Sites Worker 回退逻辑不变。
- 遵循当前原型视觉约束：Hero 使用一张全幅图片，Header 与桌面 Hero 文案/行动组直接透明叠加在图片上，不保留独立 Header 行或不透明/半透明左侧面板；Ritual 卡片图片保持正常文档流，不覆盖标题、编号、英文标签或描述。

## 非目标

- 不引入后端用户账户、远程翻译服务或邮箱提交服务。
- 不修改 ELARA 的品牌、产品定位、摄影资产或页面信息架构。
- 不通过 IP 地址强制重定向用户。
- 不把 `localStorage` 当作语言页面的唯一依据。
- 不在本次工作中引入完整的 SSR/SSG 框架；当前 Vite SPA 通过稳定路径、客户端页面元信息和 Worker HTML fallback 支持原型验证。

## 语言与 URL 模型

支持的语言固定为：

```js
const SUPPORTED_LOCALES = ["en", "zh", "ja"];
const DEFAULT_LOCALE = "en";
```

语言工具模块负责以下纯行为：

- 从 pathname 读取第一个路径段并验证是否为受支持语言。
- 生成带尾斜杠的语言路径。
- 保留当前 hash，生成语言切换链接。
- 将 `navigator.language` 的 `zh-*` 映射为 `zh`、`ja-*` 映射为 `ja`，其他语言回退为 `en`。
- 安全读取和写入 `localStorage`，存储键固定为 `elara-locale`。

语言优先级如下：

1. 明确的 `/en/`、`/zh/` 或 `/ja/` 路径。
2. 根路径下已经保存的用户选择。
3. 根路径下浏览器语言偏好。
4. 英文默认值。

显式语言路径永远不会被本地存储或浏览器语言覆盖。用户通过切换器选择语言后，应用写入偏好并导航到对应语言路径。根路径的语言判断只在客户端进行，避免为用户做基于 IP 的不可预测跳转。

## 内容架构

`src/content.js` 改为按语言导出的内容集合：

```js
export const pageContentByLocale = {
  en: { ... },
  zh: { ... },
  ja: { ... },
};
```

每种语言必须提供相同的数据结构：

- `seo`
- `ui`
- `nav`
- `hero`
- `statement`
- `rituals`
- `insight`
- `finishes`
- `preview`
- `footer`

`ui` 集中存放跨组件的可访问性和状态文案，例如跳转到主要内容、返回顶部、语言选择器标签、预约完成状态、本地演示说明和表单错误。图片记录继续包含相同的 `src` 与 `position`，但 `alt` 根据语言翻译。

三种语言必须保持相同的 section id 和导航 href，从而保证切换语言后页面锚点稳定。英文和日文版本翻译现有概念文案，不新增医疗、准确率、上市、销量或其他未经证实的产品承诺。

## 组件与交互

`App` 在渲染时从 locale 工具得到当前语言，并将对应的内容对象传递给现有页面组件。所有组件改为消费传入的内容，不再直接读取单一中文 `pageContent` 或硬编码用户可见文字。

Header 保持现有三列编辑型布局，在右侧工具区放置：

- 语言切换器：`中文`、`日本語`、`English`。
- 现有主要预约 CTA。

当前语言使用 `aria-current="page"` 和视觉状态。切换器链接使用真实 `<a>` 元素，支持键盘、复制链接、浏览器前进后退和新标签页打开。切换链接保留当前 hash；没有 hash 时回到目标语言页面顶部。

移动端继续隐藏次级 section 导航，但语言切换器与预约 CTA 保持可见，控件最小触摸高度为 44px。语言名称使用各语言原生名称，以减少全球用户的识别成本。

## 页面元信息

默认 `index.html` 元信息改为英文，因为 `/` 的默认语言是英文。应用启动或语言变化时更新：

- `document.documentElement.lang`
- `document.title`
- `meta[name="description"]`
- `link[rel="canonical"]`
- 一组指向 `/en/`、`/zh/`、`/ja/` 的 `link[rel="alternate"][hreflang]`

canonical 使用当前语言的绝对路径，默认英文根路径在客户端标准化到 `/en/` 后使用 `/en/` 作为 canonical。`x-default` 指向 `/en/`。元信息更新不改变页面视觉渲染。

## 错误与回退

- 不支持的 locale 路径在客户端规范化到 `/en/`，避免展示错误语言。
- `localStorage` 不可用、被禁用或抛出异常时，继续使用浏览器语言或英文默认值。
- 缺少语言内容时不静默拼接其他语言；内容测试必须在构建前发现结构缺失。
- Worker 继续只对 HTML GET/HEAD 请求做 `index.html` fallback，不把缺失 API 或写请求变成应用页面。
- 现有 waitlist 本地演示不发送、不保存邮箱；其状态文案按当前语言显示。

## 测试与验收

新增纯函数测试，覆盖：

- 各语言 pathname 识别和未知路径回退。
- 根路径默认英文、保存偏好优先级和浏览器语言映射。
- 语言路径生成及 hash 保留。
- `localStorage` 读取失败时的安全回退。

新增内容契约测试，覆盖：

- 三个 locale 拥有相同的内容 key 结构。
- 必填文本不为空。
- 三种语言使用相同的 section id、导航 href 和图片 src。
- 所有页面状态文案都来自 locale 内容，而不是 `App.jsx` 中的硬编码文本。

验证命令：

```bash
npm test
npm run build
npm run test:sites
```

浏览器验收覆盖 `/en/`、`/zh/`、`/ja/`：

- 页面文案、`lang`、标题和描述正确切换。
- 顶部语言链接正确标记当前语言，并保留 section hash。
- 桌面和 390px 移动视口没有横向溢出。
- 三种语言下预约 CTA、邮箱错误、成功和重置流程均可用。
- 浏览器控制台无错误或警告。

## 保留的项目约束

- 页面 UI 和 locale 逻辑只在 `src/` 中实现；`index.html` 仅允许更新默认英文的基础元信息。
- 保持 `.openai/hosting.json`、`worker/index.js`、`scripts/prepare-sites-build.mjs` 和 `tests/sites-worker.test.mjs` 的既有职责与契约。
- 不删除或覆盖用户已有的图片、参考设计、文档和未相关文件。
- ELARA 摄影继续使用无可见面部的手部或前臂构图。

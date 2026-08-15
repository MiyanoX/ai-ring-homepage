import assert from "node:assert/strict";
import test from "node:test";

import {
  createPreviewConfirmation,
  validateWaitlistEmail,
} from "../src/lib/waitlist.js";

test("rejects an empty preview email with an actionable message", () => {
  assert.deepEqual(validateWaitlistEmail("   "), {
    valid: false,
    email: "",
    message: "请输入邮箱地址。",
  });
});

test("rejects an address without a mail domain", () => {
  assert.deepEqual(validateWaitlistEmail("hello@elara"), {
    valid: false,
    email: "hello@elara",
    message: "请输入有效的邮箱地址。",
  });
});

test("normalizes a plausible preview email", () => {
  assert.deepEqual(validateWaitlistEmail("  HELLO@EXAMPLE.COM "), {
    valid: true,
    email: "hello@example.com",
    message: "",
  });
});

test("creates an explicitly local preview confirmation", () => {
  assert.deepEqual(createPreviewConfirmation("hello@example.com"), {
    email: "hello@example.com",
    message:
      "已记录在当前预览中。ELARA 正式开放体验时，我们会在接入真实服务后再邀请你确认。",
  });
});

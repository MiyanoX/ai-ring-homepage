const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateWaitlistEmail(value) {
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";

  if (!email) {
    return { valid: false, email, message: "请输入邮箱地址。" };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { valid: false, email, message: "请输入有效的邮箱地址。" };
  }

  return { valid: true, email, message: "" };
}

export function createPreviewConfirmation(email) {
  return {
    email,
    message:
      "已记录在当前预览中。ELARA 正式开放体验时，我们会在接入真实服务后再邀请你确认。",
  };
}

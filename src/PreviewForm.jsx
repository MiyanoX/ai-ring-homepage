import { useEffect, useRef, useState } from "react";

import { validateWaitlistEmail } from "./lib/waitlist.js";

export function PreviewForm({ content, inputRef, variant = "default" }) {
  const timerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(
    () => () => {
      if (timerRef.current && typeof window !== "undefined") {
        window.clearTimeout(timerRef.current);
      }
    },
    [],
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (timerRef.current && typeof window !== "undefined") {
      window.clearTimeout(timerRef.current);
    }

    const result = validateWaitlistEmail(email);

    if (!result.valid) {
      setEmail(result.email);
      setError(result.email ? content.preview.invalidEmailError : content.preview.emptyEmailError);
      setConfirmation(null);
      setSubmitting(false);
      return;
    }

    setError("");
    setEmail(result.email);
    setSubmitting(true);
    timerRef.current = window.setTimeout(() => {
      setConfirmation({ email: result.email });
      setSubmitting(false);
    }, 320);
  }

  function resetForm() {
    setEmail("");
    setError("");
    setConfirmation(null);

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  return (
    <section
      id="preview"
      className={`preview${variant === "zh" ? " zh-preview" : variant === "p1" ? " p1-preview" : ""}`}
      aria-labelledby="preview-title"
    >
      <div className="preview-inner">
        <p className="eyebrow">{content.preview.eyebrow}</p>
        <h2 id="preview-title">{content.preview.title}</h2>
        <p className="preview-copy">{content.preview.body}</p>

        {confirmation ? (
          <div className="preview-success" role="status" aria-live="polite">
            <span>{content.ui.previewSuccessLabel}</span>
            <strong>{confirmation.email}</strong>
            <p>{content.preview.confirmationMessage}</p>
            <button className="text-link" type="button" onClick={resetForm}>
              {content.preview.resetLabel}
            </button>
          </div>
        ) : (
          <form
            className="preview-form"
            noValidate
            aria-label={content.ui.previewAriaLabel}
            onSubmit={handleSubmit}
          >
            <label htmlFor="preview-email">{content.preview.inputLabel}</label>
            <div className="preview-row">
              <input
                ref={inputRef}
                id="preview-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={content.preview.inputPlaceholder}
                value={email}
                aria-describedby={error ? "preview-error" : "preview-note"}
                aria-invalid={Boolean(error)}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError("");
                }}
              />
              <button className="button button-primary" type="submit" disabled={submitting}>
                {submitting ? content.preview.submittingLabel : content.preview.submitLabel}
              </button>
            </div>
            <p id="preview-note" className="form-note">
              {content.ui.localPreviewNote}
            </p>
            <p id="preview-error" className="form-error" role="alert" aria-live="assertive">
              {error}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

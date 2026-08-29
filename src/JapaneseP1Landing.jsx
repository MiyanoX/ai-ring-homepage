import { useMemo, useState } from "react";

import { PreviewForm } from "./PreviewForm.jsx";
import { getLocaleNavigationLinks } from "./i18n/locale.js";
import { buildP1PurchaseSummary } from "./lib/p1-product.js";

function P1Header({ content, currentHash, locale, onLocaleSelect, onPreview }) {
  const p1 = content.p1;
  const localeLinks = getLocaleNavigationLinks({ locale, hash: currentHash });

  return (
    <header className="p1-header">
      <a className="p1-wordmark" href="#top" aria-label={content.ui.homeAriaLabel}>
        ELARA
      </a>
      <nav className="p1-nav" aria-label={content.ui.primaryNavLabel}>
        {p1.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="p1-header-tools">
        <nav className="p1-locale" aria-label={content.ui.languageLabel}>
          {localeLinks.map(({ locale: targetLocale, href, current }) => {
            const option = content.ui.localeOptions[targetLocale];

            return (
              <a
                key={targetLocale}
                href={href}
                aria-current={current ? "page" : undefined}
                aria-label={option.ariaLabel}
                onClick={() => onLocaleSelect(targetLocale)}
              >
                {option.shortLabel}
              </a>
            );
          })}
        </nav>
        <button className="p1-header-cta" type="button" onClick={onPreview}>
          {p1.purchase.submitLabel}
        </button>
      </div>
    </header>
  );
}

function P1Eyebrow({ children, light = false }) {
  return <p className={`p1-eyebrow${light ? " p1-eyebrow-light" : ""}`}>{children}</p>;
}

function P1Button({ children, onClick, variant = "dark", type = "button", dataEvent }) {
  return (
    <button
      className={`p1-button p1-button-${variant}`}
      type={type}
      onClick={onClick}
      data-funnel-event={dataEvent}
    >
      {children}
    </button>
  );
}

function FinishButtons({ options, selectedFinish, onSelect, compact = false }) {
  return (
    <div className={`p1-finish-options${compact ? " p1-finish-options-compact" : ""}`}>
      {options.map((option) => {
        const selected = option.id === selectedFinish;

        return (
          <button
            className={`p1-finish-option p1-finish-${option.id}${selected ? " is-selected" : ""}`}
            type="button"
            key={option.id}
            aria-pressed={selected}
            onClick={() => onSelect(option.id)}
          >
            <span className="p1-finish-swatch" aria-hidden="true" />
            <span>
              <strong>{option.name}</strong>
              <small>{option.englishName}</small>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function P1Hero({ p1, onPreview }) {
  return (
    <section className="p1-hero" aria-labelledby="p1-hero-title">
      <figure className="p1-hero-media">
        <img
          src={p1.hero.image.src}
          alt={p1.hero.image.alt}
          style={{ objectPosition: p1.hero.image.position }}
          fetchPriority="high"
        />
      </figure>
      <div className="p1-hero-copy">
        <P1Eyebrow>{p1.hero.eyebrow}</P1Eyebrow>
        <h1 id="p1-hero-title">{p1.hero.title}</h1>
        <p className="p1-hero-english">{p1.hero.englishTitle}</p>
        <p className="p1-hero-description">{p1.hero.description}</p>
        <div className="p1-hero-facts" aria-label={p1.hero.factLabels.ariaLabel}>
          <span>
            <strong>{p1.hero.width}</strong>
            <small>{p1.hero.factLabels.width}</small>
          </span>
          <span>
            <strong>{p1.hero.innerRing}</strong>
            <small>{p1.hero.factLabels.innerRing}</small>
          </span>
          <span>
            <strong>{p1.hero.price}</strong>
            <small>{p1.hero.factLabels.price}</small>
          </span>
        </div>
        <p className="p1-edition-chip">{p1.hero.edition}</p>
        <div className="p1-hero-actions">
          <P1Button onClick={onPreview} dataEvent="reserve_click">
            {p1.hero.primaryAction}
          </P1Button>
          <a className="p1-text-link" href="#proof">
            {p1.hero.secondaryAction}
          </a>
        </div>
        <p className="p1-local-note">{p1.hero.localOnlyNote}</p>
      </div>
    </section>
  );
}

function P1Proof({ p1 }) {
  return (
    <section id="proof" className="p1-section p1-proof" aria-labelledby="p1-proof-title">
      <div className="p1-section-heading">
        <div>
          <P1Eyebrow>{p1.proof.eyebrow}</P1Eyebrow>
          <h2 id="p1-proof-title">{p1.proof.title}</h2>
        </div>
        <p>{p1.proof.body}</p>
      </div>
      <div className="p1-proof-layout">
        <figure className="p1-proof-media">
          <img
            src={p1.proof.image.src}
            alt={p1.proof.image.alt}
            style={{ objectPosition: p1.proof.image.position }}
            loading="lazy"
          />
        </figure>
        <div className="p1-proof-list">
          {p1.proof.items.map((item, index) => (
            <article className="p1-proof-item" key={item.label}>
              <span className="p1-index">0{index + 1}</span>
              <div>
                <p>{item.label}</p>
                <h3>{item.title}</h3>
                <span>{item.copy}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function P1Health({ p1 }) {
  return (
    <section id="health" className="p1-section p1-health" aria-labelledby="p1-health-title">
      <div className="p1-health-heading">
        <P1Eyebrow light>{p1.health.eyebrow}</P1Eyebrow>
        <h2 id="p1-health-title">{p1.health.title}</h2>
        <p>{p1.health.body}</p>
      </div>
      <div className="p1-health-layout">
        <figure className="p1-health-media">
          <img
            src={p1.health.image.src}
            alt={p1.health.image.alt}
            style={{ objectPosition: p1.health.image.position }}
            loading="lazy"
          />
        </figure>
        <div className="p1-capabilities">
          {p1.health.capabilities.map((item, index) => (
            <article className="p1-capability" key={item.label}>
              <span className="p1-index">0{index + 1}</span>
              <p>{item.label}</p>
              <h3>{item.title}</h3>
              <span>{item.copy}</span>
            </article>
          ))}
        </div>
      </div>
      <p className="p1-disclosure">{p1.health.disclosure}</p>
    </section>
  );
}

function P1Edition({ p1 }) {
  return (
    <section id="edition" className="p1-section p1-edition" aria-labelledby="p1-edition-title">
      <div className="p1-edition-copy">
        <P1Eyebrow>{p1.edition.eyebrow}</P1Eyebrow>
        <h2 id="p1-edition-title">{p1.edition.title}</h2>
        <p>{p1.edition.body}</p>
        <ul className="p1-edition-examples">
          {p1.edition.examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
        <p className="p1-disclosure">{p1.edition.disclosure}</p>
      </div>
      <figure className="p1-edition-media">
        <img
          src={p1.edition.image.src}
          alt={p1.edition.image.alt}
          style={{ objectPosition: p1.edition.image.position }}
          loading="lazy"
        />
      </figure>
    </section>
  );
}

function P1Finishes({ p1, selectedFinish, setSelectedFinish }) {
  return (
    <section id="finishes" className="p1-section p1-finishes" aria-labelledby="p1-finishes-title">
      <div className="p1-finishes-copy">
        <P1Eyebrow>{p1.finishes.eyebrow}</P1Eyebrow>
        <h2 id="p1-finishes-title">{p1.finishes.title}</h2>
        <p>{p1.finishes.body}</p>
        <p className="p1-finish-note">{p1.finishes.selectionNote}</p>
      </div>
      <div className="p1-finishes-visual">
        <figure className="p1-finishes-media">
          <img
            src={p1.finishes.image.src}
            alt={p1.finishes.image.alt}
            style={{ objectPosition: p1.finishes.image.position }}
            loading="lazy"
          />
        </figure>
        <FinishButtons
          options={p1.finishes.options}
          selectedFinish={selectedFinish}
          onSelect={setSelectedFinish}
        />
      </div>
    </section>
  );
}

function P1Risk({ p1 }) {
  return (
    <section id="risk" className="p1-section p1-risk" aria-labelledby="p1-risk-title">
      <div className="p1-risk-copy">
        <P1Eyebrow>{p1.risk.eyebrow}</P1Eyebrow>
        <h2 id="p1-risk-title">{p1.risk.title}</h2>
        <p>{p1.risk.body}</p>
        <div className="p1-risk-flags">
          <span>
            <strong>{p1.risk.sizeRange}</strong>
            <small>{p1.risk.flagLabels.size}</small>
          </span>
          <span className={p1.risk.depositPending ? "is-pending" : ""}>
            <strong>{p1.risk.depositLabel}</strong>
            <small>{p1.risk.flagLabels.deposit}</small>
          </span>
          <span className={p1.risk.deliveryPending ? "is-pending" : ""}>
            <strong>{p1.risk.deliveryLabel}</strong>
            <small>{p1.risk.flagLabels.delivery}</small>
          </span>
        </div>
        <ol className="p1-risk-steps">
          {p1.risk.steps.map((step, index) => (
            <li key={step}>
              <span>0{index + 1}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
        <p className="p1-refund-note">{p1.risk.refund}</p>
        <p className="p1-disclosure">{p1.risk.disclosure}</p>
        <div className="p1-risk-legal">
          <strong>{p1.risk.operator}</strong>
          <p>{p1.risk.privacy}</p>
          <p>{p1.risk.productionGate}</p>
        </div>
      </div>
      <figure className="p1-risk-media">
        <img
          src={p1.risk.image.src}
          alt={p1.risk.image.alt}
          style={{ objectPosition: p1.risk.image.position }}
          loading="lazy"
        />
      </figure>
    </section>
  );
}

function P1Specs({ p1 }) {
  return (
    <section id="specs" className="p1-section p1-specs" aria-labelledby="p1-specs-title">
      <div className="p1-specs-heading">
        <P1Eyebrow>{p1.specs.eyebrow}</P1Eyebrow>
        <h2 id="p1-specs-title">{p1.specs.title}</h2>
      </div>
      <div className="p1-specs-grid">
        <dl className="p1-spec-list">
          {p1.specs.items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        <div className="p1-faq-list">
          {p1.specs.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function P1Purchase({ p1, selectedFinish, setSelectedFinish, engraving, setEngraving, onPreview }) {
  const summary = buildP1PurchaseSummary({ p1, selectedFinish, engraving });

  return (
    <section id="purchase" className="p1-section p1-purchase" aria-labelledby="p1-purchase-title">
      <div className="p1-purchase-heading">
        <P1Eyebrow>{p1.purchase.eyebrow}</P1Eyebrow>
        <h2 id="p1-purchase-title">{p1.purchase.title}</h2>
        <p>{p1.purchase.body}</p>
      </div>
      <div className="p1-purchase-card">
        <div className="p1-purchase-summary">
          <div>
            <span>{summary.productName}</span>
            <strong>{summary.finish}</strong>
          </div>
          <div className="p1-purchase-price">
            <span>{p1.purchase.priceNote}</span>
            <strong>{summary.price}</strong>
          </div>
        </div>
        <div className="p1-purchase-field">
          <span className="p1-field-label">{p1.purchase.finishLabel}</span>
          <FinishButtons
            options={p1.finishes.options}
            selectedFinish={selectedFinish}
            onSelect={setSelectedFinish}
            compact
          />
        </div>
        <div className="p1-purchase-field p1-size-field">
          <span className="p1-field-label">{p1.purchase.sizeLabel}</span>
          <strong>{summary.sizeRange}</strong>
          <small>{p1.purchase.sizeNote}</small>
        </div>
        <label className="p1-engraving-field" htmlFor="p1-engraving">
          <span className="p1-field-label">{p1.purchase.engravingLabel}</span>
          <input
            id="p1-engraving"
            name="engraving"
            type="text"
            maxLength={18}
            placeholder={p1.purchase.engravingPlaceholder}
            value={engraving}
            onChange={(event) => setEngraving(event.target.value)}
          />
          <small>{p1.purchase.engravingHint}</small>
          <span className="p1-engraving-status">
            {summary.engraving
              ? `${p1.purchase.engravingStatus.withValuePrefix}${summary.engraving}${p1.purchase.engravingStatus.withValueSuffix}`
              : p1.purchase.engravingStatus.empty}
          </span>
        </label>
        <div className="p1-purchase-actions">
          <P1Button onClick={onPreview} dataEvent="reserve_click">
            {p1.purchase.submitLabel}
          </P1Button>
          <span>{p1.purchase.localOnlyNote}</span>
        </div>
      </div>
    </section>
  );
}

function P1Footer({ content }) {
  return (
    <footer className="p1-footer">
      <a className="p1-wordmark" href="#top" aria-label={content.ui.homeAriaLabel}>
        ELARA
      </a>
      <p>{content.footer.note}</p>
      <span>{content.footer.legal}</span>
    </footer>
  );
}

export function P1Landing({
  content,
  currentHash,
  locale,
  onLocaleSelect,
  onPreview,
  previewInputRef,
}) {
  const p1 = content.p1;
  const [selectedFinish, setSelectedFinish] = useState(p1.finishes.options[0].id);
  const [engraving, setEngraving] = useState("");
  const previewContent = useMemo(
    () => ({
      ...content,
      preview: {
        ...content.preview,
        eyebrow: p1.purchase.eyebrow,
        title: p1.purchase.title,
        body: p1.purchase.body,
        submitLabel: p1.purchase.submitLabel,
        confirmationMessage: p1.purchase.localOnlyNote,
      },
    }),
    [content, p1.purchase],
  );

  return (
    <div className="p1-shell">
      <P1Header
        content={content}
        currentHash={currentHash}
        locale={locale}
        onLocaleSelect={onLocaleSelect}
        onPreview={onPreview}
      />
      <main id="main-content" className="p1-page" data-funnel-event="landing_view">
        <P1Hero p1={p1} onPreview={onPreview} />
        <P1Proof p1={p1} />
        <P1Health p1={p1} />
        <P1Edition p1={p1} />
        <P1Finishes p1={p1} selectedFinish={selectedFinish} setSelectedFinish={setSelectedFinish} />
        <P1Risk p1={p1} />
        <P1Specs p1={p1} />
        <P1Purchase
          p1={p1}
          selectedFinish={selectedFinish}
          setSelectedFinish={setSelectedFinish}
          engraving={engraving}
          setEngraving={setEngraving}
          onPreview={onPreview}
        />
        <PreviewForm content={previewContent} inputRef={previewInputRef} variant="p1" />
      </main>
      <div className="p1-sticky-cta">
        <span>{p1.purchase.stickyCta}</span>
        <P1Button onClick={onPreview} dataEvent="reserve_click">
          {p1.purchase.submitLabel}
        </P1Button>
      </div>
      <P1Footer content={content} />
    </div>
  );
}

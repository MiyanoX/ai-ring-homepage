import { useState } from "react";

import { PreviewForm } from "./PreviewForm.jsx";
import { getLocaleNavigationLinks } from "./i18n/locale.js";

function ChineseHeader({ content, currentHash, locale, onLocaleSelect, onPreview }) {
  const landing = content.landing;
  const localeLinks = getLocaleNavigationLinks({ locale, hash: currentHash });

  return (
    <header className="zh-header">
      <a className="zh-wordmark" href="#top" aria-label={content.ui.homeAriaLabel}>
        ELARA
      </a>

      <nav className="zh-header-links" aria-label="页面导航">
        {landing.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="zh-header-tools">
        <div className="zh-language" aria-label={content.ui.languageLabel}>
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
        </div>

        <details className="zh-mobile-menu">
          <summary>目录</summary>
          <div className="zh-mobile-menu-panel">
            {landing.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </details>

        <button className="zh-header-cta" type="button" onClick={onPreview}>
          {content.ui.headerPreviewAction}
        </button>
      </div>
    </header>
  );
}

function ChineseHero({ content, onPreview }) {
  const hero = content.landing.hero;

  return (
    <section className="zh-hero" aria-labelledby="zh-hero-title">
      <div className="zh-hero-media">
        <img
          src={hero.image.src}
          alt={hero.image.alt}
          style={{ objectPosition: hero.image.position }}
          fetchPriority="high"
        />
      </div>
      <div className="zh-hero-copy">
        <p className="zh-eyebrow">{hero.eyebrow}</p>
        <h1 id="zh-hero-title">{hero.title}</h1>
        <p className="zh-hero-english">{hero.englishTitle}</p>
        <p className="zh-hero-description">{hero.description}</p>
        <div className="zh-hero-actions">
          <button className="zh-button zh-button-dark" type="button" onClick={onPreview}>
            {hero.primaryAction}
          </button>
          <a className="zh-text-link" href="#design">
            {hero.secondaryAction}
          </a>
        </div>
      </div>
      <p className="zh-hero-footnote">{hero.ownershipLine}</p>
    </section>
  );
}

function ChineseDesign({ content, selectedLine, setSelectedLine, selectedFinish, setSelectedFinish }) {
  const design = content.landing.design;

  return (
    <section id="design" className="zh-design zh-section" aria-labelledby="zh-design-title">
      <div className="zh-design-intro">
        <p className="zh-eyebrow">{design.eyebrow}</p>
        <h2 id="zh-design-title">{design.title}</h2>
        <p className="zh-section-body">{design.body}</p>

        <div className="zh-product-lines" aria-label="产品线">
          {design.productLines.map((line) => {
            const selected = line.id === selectedLine;

            return (
              <button
                className={`zh-product-line${selected ? " is-selected" : ""}`}
                type="button"
                key={line.id}
                aria-pressed={selected}
                onClick={() => setSelectedLine(line.id)}
              >
                <span className="zh-product-line-label">{line.label}</span>
                <strong>{line.name}</strong>
                <span>{line.copy}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="zh-design-visual">
        <figure className="zh-wide-image">
          <img
            src={design.image.src}
            alt={design.image.alt}
            style={{ objectPosition: design.image.position }}
            loading="lazy"
          />
        </figure>
        <div className="zh-spec-grid">
          {design.specs.map((spec) => (
            <div className="zh-spec" key={spec.label}>
              <span>{spec.label}</span>
              <strong>{spec.value}</strong>
            </div>
          ))}
        </div>
        <div className="zh-finish-row" aria-label="颜色选择">
          {design.finishOptions.map((finish) => {
            const selected = finish.id === selectedFinish;

            return (
              <button
                className={`zh-finish-chip zh-finish-${finish.id}${selected ? " is-selected" : ""}`}
                type="button"
                key={finish.id}
                aria-pressed={selected}
                onClick={() => setSelectedFinish(finish.id)}
              >
                <span className="zh-finish-dot" aria-hidden="true" />
                <span>
                  <strong>{finish.name}</strong>
                  <small>{finish.englishName}</small>
                </span>
              </button>
            );
          })}
        </div>
        <div className="zh-price-callout">
          <span>{design.priceNote}</span>
          <strong>{design.price}</strong>
        </div>
      </div>
    </section>
  );
}

function ChineseTechnology({ content }) {
  const technology = content.landing.technology;

  return (
    <section
      id="technology"
      className="zh-technology zh-section"
      aria-labelledby="zh-technology-title"
    >
      <div className="zh-tech-heading">
        <p className="zh-eyebrow zh-eyebrow-light">{technology.eyebrow}</p>
        <h2 id="zh-technology-title">{technology.title}</h2>
        <p>{technology.body}</p>
      </div>

      <div className="zh-tech-stage">
        <figure className="zh-tech-image">
          <img
            src={technology.image.src}
            alt={technology.image.alt}
            style={{ objectPosition: technology.image.position }}
            loading="lazy"
          />
        </figure>
        <div className="zh-tech-object" aria-label={technology.ringLabel}>
          <span className="zh-tech-object-ring zh-tech-object-ring-outer" />
          <span className="zh-tech-object-ring zh-tech-object-ring-inner" />
          <span className="zh-tech-object-sensor zh-tech-object-sensor-one" />
          <span className="zh-tech-object-sensor zh-tech-object-sensor-two" />
          <span className="zh-tech-object-label">{technology.ringLabel}</span>
          <small>{technology.ringNote}</small>
        </div>
      </div>

      <div className="zh-capability-grid">
        {technology.capabilities.map((capability) => (
          <article className="zh-capability" key={capability.index}>
            <span className="zh-capability-index">{capability.index}</span>
            <p>{capability.label}</p>
            <h3>{capability.title}</h3>
            <span>{capability.copy}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ChineseDaily({ content }) {
  const daily = content.landing.daily;

  return (
    <section id="daily" className="zh-daily zh-section" aria-labelledby="zh-daily-title">
      <div className="zh-daily-image-column">
        <figure className="zh-daily-image">
          <img
            src={daily.image.src}
            alt={daily.image.alt}
            style={{ objectPosition: daily.image.position }}
            loading="lazy"
          />
        </figure>
        <div className="zh-daily-note">
          <span>{daily.noteLabel}</span>
          <p>{daily.note}</p>
        </div>
      </div>

      <div className="zh-daily-copy">
        <p className="zh-eyebrow">{daily.eyebrow}</p>
        <h2 id="zh-daily-title">{daily.title}</h2>
        <p className="zh-section-body">{daily.body}</p>
        <div className="zh-daily-grid">
          {daily.items.map((item) => (
            <article className="zh-daily-card" key={item.label}>
              <span>{item.label}</span>
              <h3>{item.question}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChineseTrust({ content }) {
  const trust = content.landing.trust;

  return (
    <section id="trust" className="zh-trust zh-section" aria-labelledby="zh-trust-title">
      <div className="zh-trust-head">
        <div>
          <p className="zh-eyebrow">{trust.eyebrow}</p>
          <h2 id="zh-trust-title">{trust.title}</h2>
        </div>
        <p className="zh-section-body">{trust.body}</p>
      </div>

      <div className="zh-trust-layout">
        <figure className="zh-trust-image">
          <img
            src={trust.image.src}
            alt={trust.image.alt}
            style={{ objectPosition: trust.image.position }}
            loading="lazy"
          />
          <figcaption>真实样机 · 设计与验证现场</figcaption>
        </figure>
        <div className="zh-trust-cards">
          {trust.cards.map((card) => (
            <article className="zh-trust-card" key={card.index}>
              <span>{card.index}</span>
              <div>
                <p>{card.label}</p>
                <h3>{card.title}</h3>
                <span>{card.copy}</span>
              </div>
            </article>
          ))}
          <p className="zh-disclosure">{trust.disclosure}</p>
        </div>
      </div>
    </section>
  );
}

function ChinesePurchase({
  content,
  selectedLine,
  setSelectedLine,
  selectedFinish,
  setSelectedFinish,
  engraving,
  setEngraving,
  giftOpen,
  setGiftOpen,
  onPreview,
}) {
  const { purchase, gift } = content.landing;
  const design = content.landing.design;

  return (
    <section id="buy" className="zh-buy zh-section" aria-labelledby="zh-buy-title">
      <div className="zh-buy-head">
        <div>
          <p className="zh-eyebrow">{purchase.eyebrow}</p>
          <h2 id="zh-buy-title">{purchase.title}</h2>
        </div>
        <p className="zh-section-body">{purchase.body}</p>
      </div>

      <div className="zh-buy-layout">
        <div className="zh-buy-card">
          <div className="zh-buy-card-top">
            <div>
              <span className="zh-buy-label">{purchase.lineLabel}</span>
              <strong>{selectedLine === "standard" ? "Standard · 素圈" : "Design · 设计款"}</strong>
            </div>
            <div className="zh-buy-price">
              <span>{purchase.priceNote}</span>
              <strong>{purchase.price}</strong>
            </div>
          </div>

          <div className="zh-buy-options">
            {design.productLines.map((line) => (
              <button
                className={`zh-buy-option${selectedLine === line.id ? " is-selected" : ""}`}
                type="button"
                key={line.id}
                aria-pressed={selectedLine === line.id}
                onClick={() => setSelectedLine(line.id)}
              >
                <span>{line.label}</span>
                <strong>{line.name}</strong>
                <small>{line.copy}</small>
              </button>
            ))}
          </div>

          <div className="zh-buy-fieldset">
            <span className="zh-buy-label">{purchase.finishLabel}</span>
            <div className="zh-buy-finishes">
              {design.finishOptions.map((finish) => (
                <button
                  className={`zh-buy-finish zh-finish-${finish.id}${selectedFinish === finish.id ? " is-selected" : ""}`}
                  type="button"
                  key={finish.id}
                  aria-pressed={selectedFinish === finish.id}
                  onClick={() => setSelectedFinish(finish.id)}
                >
                  <span className="zh-finish-dot" aria-hidden="true" />
                  {finish.name}
                </button>
              ))}
            </div>
          </div>

          <label className="zh-engraving-field" htmlFor="zh-engraving">
            <span className="zh-buy-label">{purchase.engravingLabel}</span>
            <input
              id="zh-engraving"
              type="text"
              maxLength={18}
              value={engraving}
              placeholder={purchase.engravingPlaceholder}
              onChange={(event) => setEngraving(event.target.value)}
            />
            <small>{purchase.engravingHint}</small>
          </label>

          <div className="zh-buy-actions">
            <button className="zh-button zh-button-dark" type="button" onClick={onPreview}>
              {purchase.submitLabel}
            </button>
            <button
              className="zh-button zh-button-line"
              type="button"
              aria-expanded={giftOpen}
              aria-controls="zh-gift-panel"
              onClick={() => setGiftOpen((open) => !open)}
            >
              {giftOpen ? gift.closeLabel : purchase.giftLabel}
            </button>
          </div>
        </div>

        <aside className="zh-gift-card" aria-labelledby="zh-gift-title">
          <div className="zh-gift-image-wrap">
            <img
              src={gift.image.src}
              alt={gift.image.alt}
              style={{ objectPosition: gift.image.position }}
              loading="lazy"
            />
            <span className="zh-gift-tag">NFC / GIFT</span>
          </div>
          <div className="zh-gift-copy">
            <p className="zh-eyebrow">{gift.eyebrow}</p>
            <h3 id="zh-gift-title">{gift.title}</h3>
            <p>{gift.body}</p>
            <button
              className="zh-text-link"
              type="button"
              aria-expanded={giftOpen}
              aria-controls="zh-gift-panel"
              onClick={() => setGiftOpen((open) => !open)}
            >
              {giftOpen ? gift.closeLabel : gift.openLabel}
            </button>
          </div>
        </aside>
      </div>

      <div id="zh-gift-panel" className={`zh-gift-panel${giftOpen ? " is-open" : ""}`} hidden={!giftOpen}>
        <div className="zh-gift-panel-copy">
          <span className="zh-buy-label">Gift path</span>
          <h3>{gift.nfcTitle}</h3>
          <p>{gift.nfcBody}</p>
          <button className="zh-button zh-button-dark" type="button" onClick={() => setGiftOpen(true)}>
            {gift.previewLabel}
          </button>
        </div>
        <ol className="zh-gift-steps">
          {gift.steps.map((step, index) => (
            <li key={step}>
              <span>0{index + 1}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
        <p className="zh-disclosure">{gift.note}</p>
      </div>
    </section>
  );
}

function ChineseFooter({ content }) {
  return (
    <footer className="zh-footer">
      <a className="zh-wordmark" href="#top" aria-label={content.ui.homeAriaLabel}>
        ELARA
      </a>
      <p>{content.footer.note}</p>
      <span>{content.footer.legal}</span>
    </footer>
  );
}

export function ChineseLanding({
  content,
  currentHash,
  locale,
  onLocaleSelect,
  onPreview,
  previewInputRef,
}) {
  const design = content.landing.design;
  const [selectedLine, setSelectedLine] = useState(design.productLines[0].id);
  const [selectedFinish, setSelectedFinish] = useState(design.finishOptions[0].id);
  const [engraving, setEngraving] = useState("");
  const [giftOpen, setGiftOpen] = useState(false);

  return (
    <div className="zh-shell">
      <ChineseHeader
        content={content}
        currentHash={currentHash}
        locale={locale}
        onLocaleSelect={onLocaleSelect}
        onPreview={onPreview}
      />
      <main id="main-content" className="zh-page">
        <ChineseHero content={content} onPreview={onPreview} />
        <ChineseDesign
          content={content}
          selectedLine={selectedLine}
          setSelectedLine={setSelectedLine}
          selectedFinish={selectedFinish}
          setSelectedFinish={setSelectedFinish}
        />
        <ChineseTechnology content={content} />
        <ChineseDaily content={content} />
        <ChineseTrust content={content} />
        <ChinesePurchase
          content={content}
          selectedLine={selectedLine}
          setSelectedLine={setSelectedLine}
          selectedFinish={selectedFinish}
          setSelectedFinish={setSelectedFinish}
          engraving={engraving}
          setEngraving={setEngraving}
          giftOpen={giftOpen}
          setGiftOpen={setGiftOpen}
          onPreview={onPreview}
        />
        <PreviewForm content={content} inputRef={previewInputRef} variant="zh" />
      </main>
      <ChineseFooter content={content} />
    </div>
  );
}

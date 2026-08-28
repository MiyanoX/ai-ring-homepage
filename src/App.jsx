import { useEffect, useRef, useState } from "react";

import { ChineseLanding } from "./ChineseLanding.jsx";
import { pageContentByLocale } from "./content.js";
import { JapaneseP1Landing } from "./JapaneseP1Landing.jsx";
import { PreviewForm } from "./PreviewForm.jsx";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  buildLocalePath,
  getLocaleFromPath,
  getLocaleNavigationLinks,
  resolveInitialLocale,
  writeStoredLocale,
} from "./i18n/locale.js";

function getSafeBrowserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getInitialAppLocale() {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const pathname = window.location.pathname;
  const explicitLocale = getLocaleFromPath(pathname);
  const isRootPath = pathname === "/" || pathname === "";
  const resolved = resolveInitialLocale({
    pathname,
    storage: getSafeBrowserStorage(),
    browserLanguage: window.navigator.language,
  });
  const locale = explicitLocale ?? (isRootPath ? resolved : DEFAULT_LOCALE);
  const targetPath = buildLocalePath(locale, window.location.hash);

  if (window.location.pathname !== targetPath.split("#")[0]) {
    window.history.replaceState({}, "", targetPath);
  }

  return locale;
}

function upsertDescriptionMeta(content) {
  let node = document.head.querySelector('meta[name="description"]');

  if (!node) {
    node = document.createElement("meta");
    node.setAttribute("name", "description");
    document.head.append(node);
  }

  node.setAttribute("content", content.seo.description);
  node.setAttribute("data-elara-meta", "description");
}

function upsertCanonicalLink(locale) {
  let node =
    document.head.querySelector('link[rel="canonical"][data-elara-meta="canonical"]') ??
    document.head.querySelector('link[rel="canonical"]');

  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", "canonical");
    document.head.append(node);
  }

  node.setAttribute("href", new URL(buildLocalePath(locale), window.location.origin).toString());
  node.setAttribute("data-elara-meta", "canonical");
}

function replaceAlternateLinks() {
  document.head
    .querySelectorAll('link[rel="alternate"][data-elara-meta="alternate"]')
    .forEach((node) => node.remove());

  const alternateLinks = [
    ...SUPPORTED_LOCALES.map((locale) => ({
      hreflang: pageContentByLocale[locale].seo.hreflang,
      href: new URL(buildLocalePath(locale), window.location.origin).toString(),
    })),
    {
      hreflang: "x-default",
      href: new URL(buildLocalePath(DEFAULT_LOCALE), window.location.origin).toString(),
    },
  ];

  alternateLinks.forEach(({ hreflang, href }) => {
    const node = document.createElement("link");
    node.setAttribute("rel", "alternate");
    node.setAttribute("hreflang", hreflang);
    node.setAttribute("href", href);
    node.setAttribute("data-elara-meta", "alternate");
    document.head.append(node);
  });
}

function Header({ content, currentHash, locale, onLocaleSelect, onPreview }) {
  const localeLinks = getLocaleNavigationLinks({ locale, hash: currentHash });

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={content.ui.homeAriaLabel}>
        ELARA
      </a>
      <nav className="site-nav" aria-label={content.ui.primaryNavLabel}>
        {content.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-tools">
        <nav className="locale-switcher" aria-label={content.ui.languageLabel}>
          {localeLinks.map(({ locale: targetLocale, href, current }) => {
            const option = content.ui.localeOptions[targetLocale];

            return (
              <a
                key={targetLocale}
                className="locale-link"
                href={href}
                aria-current={current ? "page" : undefined}
                aria-label={option.ariaLabel}
                onClick={() => onLocaleSelect(targetLocale)}
              >
                <span className="locale-name-full">{option.label}</span>
                <span className="locale-name-short" aria-hidden="true">
                  {option.shortLabel}
                </span>
              </a>
            );
          })}
        </nav>
        <button
          className="header-action"
          type="button"
          aria-label={content.ui.previewAriaLabel}
          onClick={onPreview}
        >
          {content.ui.headerPreviewAction}
        </button>
      </div>
    </header>
  );
}

function Hero({ content, onPreview }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">{content.hero.eyebrow}</p>
        <h1 id="hero-title">{content.hero.title}</h1>
        <p className="hero-english">{content.hero.englishTitle}</p>
        <p className="hero-description">{content.hero.description}</p>
        <div className="hero-actions">
          <button className="button button-primary" type="button" onClick={onPreview}>
            {content.hero.primaryAction}
          </button>
          <a className="text-link" href="#rituals">
            {content.hero.secondaryAction}
          </a>
        </div>
      </div>
      <figure className="hero-media">
        <img
          src={content.hero.image.src}
          alt={content.hero.image.alt}
          style={{ objectPosition: content.hero.image.position }}
          fetchPriority="high"
        />
      </figure>
    </section>
  );
}

function EditorialStatement({ content }) {
  return (
    <section className="statement section-shell" aria-labelledby="statement-title">
      <div className="statement-copy">
        <p className="eyebrow">{content.statement.eyebrow}</p>
        <h2 id="statement-title">{content.statement.title}</h2>
        <p>{content.statement.body}</p>
      </div>
      <figure className="statement-media">
        <img
          src={content.statement.image.src}
          alt={content.statement.image.alt}
          style={{ objectPosition: content.statement.image.position }}
          loading="lazy"
        />
      </figure>
    </section>
  );
}

function Rituals({ content }) {
  return (
    <section id="rituals" className="rituals section-shell" aria-labelledby="rituals-title">
      <div className="section-heading">
        <p className="eyebrow">{content.rituals.eyebrow}</p>
        <h2 id="rituals-title">{content.rituals.title}</h2>
      </div>
      <div className="ritual-grid">
        {content.rituals.items.map((ritual) => (
          <article className="ritual" key={ritual.index}>
            <img
              src={ritual.image.src}
              alt={ritual.image.alt}
              style={{ objectPosition: ritual.image.position }}
              loading="lazy"
            />
            <div className="ritual-heading">
              <span>{ritual.index}</span>
              <div>
                <h3>{ritual.title}</h3>
                <p>{ritual.englishTitle}</p>
              </div>
            </div>
            <p className="ritual-copy">{ritual.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DailyInsight({ content }) {
  return (
    <section id="insight" className="insight" aria-labelledby="insight-title">
      <figure className="insight-media">
        <img
          src={content.insight.image.src}
          alt={content.insight.image.alt}
          style={{ objectPosition: content.insight.image.position }}
          loading="lazy"
        />
      </figure>
      <div className="insight-copy">
        <p className="eyebrow">{content.insight.eyebrow}</p>
        <h2 id="insight-title">
          {content.insight.title.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p>{content.insight.body}</p>
        <blockquote>
          <span>{content.insight.sampleLabel}</span>
          <p>{content.insight.sample}</p>
        </blockquote>
      </div>
    </section>
  );
}

function Finishes({ content }) {
  return (
    <section id="finishes" className="finishes section-shell" aria-labelledby="finishes-title">
      <div className="finishes-copy">
        <p className="eyebrow">{content.finishes.eyebrow}</p>
        <h2 id="finishes-title">{content.finishes.title}</h2>
        <p>{content.finishes.body}</p>
      </div>
      <div className="finishes-visual">
        <img
          src={content.finishes.image.src}
          alt={content.finishes.image.alt}
          style={{ objectPosition: content.finishes.image.position }}
          loading="lazy"
        />
        <div className="finish-labels" aria-hidden="true">
          {content.finishes.options.map((option) => (
            <div key={option.englishName}>
              <strong>{option.name}</strong>
              <span>{option.englishName}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ content }) {
  return (
    <footer className="site-footer">
      <a className="wordmark" href="#top" aria-label={content.ui.homeAriaLabel}>
        ELARA
      </a>
      <p>{content.footer.note}</p>
      <span>{content.footer.legal}</span>
    </footer>
  );
}

export function App() {
  const previewInputRef = useRef(null);
  const [locale, setLocale] = useState(() =>
    typeof window === "undefined" ? DEFAULT_LOCALE : getInitialAppLocale(),
  );
  const [currentHash, setCurrentHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash,
  );
  const content = pageContentByLocale[locale] ?? pageContentByLocale[DEFAULT_LOCALE];

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    function syncHash() {
      setCurrentHash(window.location.hash);
    }

    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    document.documentElement.lang = content.seo.htmlLang;
    document.title = content.seo.title;
    upsertDescriptionMeta(content);
    upsertCanonicalLink(locale);
    replaceAlternateLinks();
  }, [content, locale]);

  function focusPreview() {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    document.querySelector("#preview")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => previewInputRef.current?.focus(), 360);
  }

  function handleLocaleSelect(targetLocale) {
    setLocale(targetLocale);
    writeStoredLocale(getSafeBrowserStorage(), targetLocale);
  }

  return (
    <div id="top" className="site-page">
      <a className="skip-link" href="#main-content">
        {content.ui.skipToContent}
      </a>
      {locale === "ja" ? (
        <JapaneseP1Landing
          content={content}
          currentHash={currentHash}
          locale={locale}
          onLocaleSelect={handleLocaleSelect}
          onPreview={focusPreview}
          previewInputRef={previewInputRef}
        />
      ) : locale === "zh" ? (
        <ChineseLanding
          content={content}
          currentHash={currentHash}
          locale={locale}
          onLocaleSelect={handleLocaleSelect}
          onPreview={focusPreview}
          previewInputRef={previewInputRef}
        />
      ) : (
        <>
          <div className="hero-stage">
            <Header
              content={content}
              currentHash={currentHash}
              locale={locale}
              onLocaleSelect={handleLocaleSelect}
              onPreview={focusPreview}
            />
            <Hero content={content} onPreview={focusPreview} />
          </div>
          <main id="main-content">
            <EditorialStatement content={content} />
            <Rituals content={content} />
            <DailyInsight content={content} />
            <Finishes content={content} />
            <PreviewForm content={content} inputRef={previewInputRef} />
          </main>
          <Footer content={content} />
        </>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

import { pageContentByLocale } from "./content.js";
import { P1Landing } from "./JapaneseP1Landing.jsx";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  buildLocalePath,
  getLocaleFromPath,
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
      <P1Landing
        content={content}
        currentHash={currentHash}
        locale={locale}
        onLocaleSelect={handleLocaleSelect}
        onPreview={focusPreview}
        previewInputRef={previewInputRef}
      />
    </div>
  );
}

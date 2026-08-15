export const SUPPORTED_LOCALES = ["en", "zh", "ja"];

export const DEFAULT_LOCALE = "en";

export const LOCALE_STORAGE_KEY = "elara-locale";

export function isSupportedLocale(value) {
  return SUPPORTED_LOCALES.includes(value);
}

function normalizeLocale(value) {
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE;
}

function normalizeHash(hash) {
  if (!hash) {
    return "";
  }

  return hash.startsWith("#") ? hash : `#${hash}`;
}

function firstPathSegment(pathname) {
  const cleanPath = String(pathname ?? "")
    .split(/[?#]/, 1)[0]
    .trim();

  if (!cleanPath) {
    return "";
  }

  const segments = cleanPath.split("/").filter(Boolean);
  return segments[0] ?? "";
}

export function getLocaleFromPath(pathname) {
  const segment = firstPathSegment(pathname);
  return isSupportedLocale(segment) ? segment : null;
}

export function getLocaleFromBrowserLanguage(language) {
  const normalized = String(language ?? "").toLowerCase();

  if (normalized.startsWith("zh")) {
    return "zh";
  }

  if (normalized.startsWith("ja")) {
    return "ja";
  }

  return DEFAULT_LOCALE;
}

export function buildLocalePath(locale, hash = "") {
  const resolvedLocale = normalizeLocale(locale);
  return `/${resolvedLocale}/${normalizeHash(hash)}`;
}

export function getLocaleNavigationLinks({ locale, hash = "" }) {
  return SUPPORTED_LOCALES.map((supportedLocale) => ({
    locale: supportedLocale,
    href: buildLocalePath(supportedLocale, hash),
    current: supportedLocale === locale,
  }));
}

export function readStoredLocale(storage) {
  try {
    const value = storage?.getItem?.(LOCALE_STORAGE_KEY);
    return isSupportedLocale(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeStoredLocale(storage, locale) {
  if (!isSupportedLocale(locale)) {
    return false;
  }

  try {
    if (typeof storage?.setItem !== "function") {
      return false;
    }

    storage?.setItem?.(LOCALE_STORAGE_KEY, locale);
    return true;
  } catch {
    return false;
  }
}

export function resolveInitialLocale({ pathname, storage, browserLanguage }) {
  return (
    getLocaleFromPath(pathname) ??
    readStoredLocale(storage) ??
    getLocaleFromBrowserLanguage(browserLanguage) ??
    DEFAULT_LOCALE
  );
}

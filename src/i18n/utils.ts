import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    // Strip existing language prefix if any
    const pathParts = path.split('/');
    if (pathParts[1] && pathParts[1] in ui) {
      pathParts.splice(1, 1);
    }
    const cleanPath = pathParts.join('/') || '/';
    
    return !['es'].includes(l) ? `/${l}${cleanPath}`.replace(/\/+/g, '/') : cleanPath.replace(/\/+/g, '/') || '/';
  }
}

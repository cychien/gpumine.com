function getLocalizedPathname(pathname: string, language: string) {
  const languageInUrl = language === "zh-TW" ? "tw" : language;

  if (pathname) {
    return pathname.startsWith("/")
      ? languageInUrl + pathname
      : languageInUrl + "/" + pathname;
  }

  return "/" + languageInUrl;
}

export default getLocalizedPathname;

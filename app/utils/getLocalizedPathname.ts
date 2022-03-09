function getLocalizedPathname(pathname: string, language: string) {
  const languageInUrl = language === "zh-TW" ? "tw" : language;
  return languageInUrl + pathname;
}

export default getLocalizedPathname;

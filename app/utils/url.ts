function getSearchObj(search: string | undefined) {
  if (!search) {
    return {};
  }

  const cleanSearchStr = search.slice(1);
  const searchParams = {} as Record<string, string>;
  cleanSearchStr.split("&").forEach((str) => {
    const key = str.split("=")[0];
    const value = str.split("=")[1];
    searchParams[key] = value;
  });

  return searchParams;
}

function appendSearchObj(
  pathname: string | undefined,
  searchObj: Record<string, string> | undefined
) {
  if (!pathname) {
    return "";
  }
  if (!searchObj) {
    return pathname;
  }
  const str = Object.entries(searchObj)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return pathname + "?" + str;
}

export { getSearchObj, appendSearchObj };

import { useTranslation } from "react-i18next";
import getLocalizedPathname from "~/utils/getLocalizedPathname";

function usePages() {
  const { t, i18n } = useTranslation();

  return [
    {
      name: t("home"),
      link: getLocalizedPathname("", i18n.language),
      id: "home",
    },
    {
      name: t("tools"),
      link: getLocalizedPathname("/tools", i18n.language),
      id: "tools",
    },
    {
      name: t("support"),
      link: `https://gpumine.zendesk.com/hc/${i18n.language}`,
      id: "support",
    },
  ];
}

export default usePages;

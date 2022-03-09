import { useTranslation } from "react-i18next";
import desktopLogoEN from "~/assets/images/logo-desktop-en.png";
import desktopLogoTW from "~/assets/images/logo-desktop-tw.png";
import mobileLogo from "~/assets/images/logo-mobile.png";
import getLocalizedPathname from "~/utils/getLocalizedPathname";

const DESKTOP_LOGOS: Record<string, string> = {
  en: desktopLogoEN,
  "zh-TW": desktopLogoTW,
};

function Logo() {
  const { i18n } = useTranslation();

  return (
    <a href={getLocalizedPathname("", i18n.language)}>
      <img
        src={DESKTOP_LOGOS[i18n.language]}
        alt="GPUMINE logo"
        className="h-[32px] hidden lg:block"
      />
      <img
        src={mobileLogo}
        alt="GPUMINE logo"
        className="h-[32px] block lg:hidden"
      />
    </a>
  );
}

export default Logo;

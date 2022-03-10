import { useTranslation } from "react-i18next";
import desktopLogoEN from "~/assets/images/logo-header-en.png";
import desktopLogoTW from "~/assets/images/logo-header-tw.png";
import mobileLogo from "~/assets/images/logo-mobile.png";
import desktopLogoDarkEN from "~/assets/images/logo-header-dark-en.png";
import desktopLogoDarkTW from "~/assets/images/logo-header-dark-tw.png";
import mobileLogoDark from "~/assets/images/logo-mobile-dark.png";
import getLocalizedPathname from "~/utils/getLocalizedPathname";

type DesktopLogos = Record<string, Record<string, string>>;

const DESKTOP_LOGOS: DesktopLogos = {
  light: {
    en: desktopLogoEN,
    "zh-TW": desktopLogoTW,
  },
  dark: {
    en: desktopLogoDarkEN,
    "zh-TW": desktopLogoDarkTW,
  },
};

const MOBILE_LOGOS: Record<string, string> = {
  light: mobileLogo,
  dark: mobileLogoDark,
};

function Logo() {
  const { i18n } = useTranslation();

  return (
    <a href={getLocalizedPathname("", i18n.language)}>
      <img
        src={DESKTOP_LOGOS.light[i18n.language]}
        alt="GPUMINE logo"
        className="h-[32px] hidden lg:block dark:lg:hidden"
      />
      <img
        src={DESKTOP_LOGOS.dark[i18n.language]}
        alt="GPUMINE logo"
        className="h-[32px] hidden dark:lg:block"
      />
      <img
        src={MOBILE_LOGOS.light}
        alt="GPUMINE logo"
        className="h-[32px] block dark:hidden lg:hidden"
      />
      <img
        src={MOBILE_LOGOS.dark}
        alt="GPUMINE logo"
        className="h-[32px] hidden dark:block lg:hidden dark:lg:hidden"
      />
    </a>
  );
}

export default Logo;

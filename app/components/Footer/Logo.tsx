import { useTranslation } from "react-i18next";
import desktopLogoEN from "~/assets/images/logo-footer-en.png";
import desktopLogoTW from "~/assets/images/logo-footer-tw.png";
import mobileLogo from "~/assets/images/logo-mobile.png";
import desktopLogoDarkEN from "~/assets/images/logo-footer-dark-en.png";
import desktopLogoDarkTW from "~/assets/images/logo-footer-dark-tw.png";
import mobileLogoDark from "~/assets/images/logo-mobile-dark.png";

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
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div className="min-w-[338px]">
        <img
          src={DESKTOP_LOGOS.light[i18n.language]}
          alt="GPUMINE logo"
          className="h-[45px] hidden lg:block dark:lg:hidden"
        />
        <img
          src={DESKTOP_LOGOS.dark[i18n.language]}
          alt="GPUMINE logo"
          className="h-[45px] hidden dark:lg:block"
        />
      </div>
      <div className="flex items-center justify-between lg:hidden">
        <img
          src={MOBILE_LOGOS.light}
          alt="GPUMINE logo"
          className="h-[30px] block dark:hidden lg:hidden"
        />
        <img
          src={MOBILE_LOGOS.dark}
          alt="GPUMINE logo"
          className="h-[30px] hidden dark:block lg:hidden dark:lg:hidden"
        />
        <div>
          <div
            className="text-xs font-bold text-primary-700 dark:text-white w-[120px]"
            style={{ textAlignLast: "justify" }}
          >
            {t("brand-full-name")}
          </div>
          <div
            className="text-xs font-bold text-primary-700 dark:text-white w-[120px]"
            style={{ textAlignLast: "justify" }}
          >
            ALWAYS BE THERE
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logo;

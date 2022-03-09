import { useTranslation } from "react-i18next";
import desktopLogoEN from "~/assets/images/logo-footer-en.png";
import desktopLogoTW from "~/assets/images/logo-footer-tw.png";
import mobileLogo from "~/assets/images/logo-mobile.png";

const DESKTOP_LOGOS: Record<string, string> = {
  en: desktopLogoEN,
  "zh-TW": desktopLogoTW,
};

function Logo() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div className="hidden lg:block">
        <img
          src={DESKTOP_LOGOS[i18n.language]}
          alt="GPUMINE logo"
          className="h-[45px] hidden lg:block"
        />
      </div>
      <div className="flex items-center justify-between lg:hidden">
        <img
          src={mobileLogo}
          alt="GPUMINE logo"
          className="h-[30px] block lg:hidden"
        />
        <div>
          <div
            className="text-xs font-bold text-primary-700 w-[120px]"
            style={{ textAlignLast: "justify" }}
          >
            {t("brand-full-name")}
          </div>
          <div
            className="text-xs font-bold text-primary-700 w-[120px]"
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

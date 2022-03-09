import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import svgSprites from "~/assets/icons/sprites.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from "../Menu";
import { Link, useLocation } from "remix";
import getLocalizedPathname from "~/utils/getLocalizedPathname";
import useCookie from "react-use/lib/useCookie";

const linkStyle =
  "text-gray-old-text-default text-sm font-medium hover:opacity-60";
const socialLinkStyle =
  "min-w-[30px] min-h-[30px] w-[30px] h-[30px] rounded-full bg-[#2c272b] flex justify-center items-center hover:opacity-60";

const LANGUAGES: Record<string, string> = {
  en: "English",
  "zh-TW": "繁體中文",
};

const CURRENCIES = ["USD", "TWD", "CNY", "HKD", "GBP"];

type Props = {
  currency: string;
};

function Footer({ currency }: Props) {
  return (
    <footer
      className="bg-white"
      style={{ boxShadow: "-1px -1px 6px rgba(0, 0, 0, 0.16)" }}
    >
      {/* Desktop */}
      <div className="hidden max-w-[1280px] mx-auto lg:p-12 lg:flex lg:justify-between lg:items-center">
        <Logo />
        <Controls currency={currency} />
        <Navs />
        <SocialLinksAndDarkMode />
      </div>

      {/* Mobile */}
      <div className="block max-w-[1280px] mx-auto p-[30px] lg:hidden">
        <Logo />
        <div className="w-full h-[1px] my-[20px] bg-primary-700 block lg:hidden" />
        <div className="flex items-center justify-between">
          <div>
            <Navs />
            <Controls currency={currency} />
          </div>
          <div>
            <SocialLinksAndDarkMode />
          </div>
        </div>
      </div>

      <div className="pb-[24px] text-xs text-center text-gray-old-text-default">
        © SUPPORT JOHN@GPUMINE.ORG
      </div>
    </footer>
  );
}

function Navs() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-around items-center h-[36px] lg:justify-start lg:space-x-4 lg:h-auto">
      <a
        href="https://gpumine.zendesk.com/hc/zh-tw"
        rel="noreferrer"
        target="_blank"
        className={linkStyle}
      >
        {t("help-center")}
      </a>
      <a
        href="mailto:john@gpumine.org"
        rel="noreferrer"
        target="_blank"
        className={linkStyle}
      >
        {t("contact-us")}
      </a>
    </div>
  );
}

type ControlsProps = {
  currency: string;
};

function Controls({ currency }: ControlsProps) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [_, updateCookieCurrency] = useCookie("gm-fiat");

  const pathnameWithoutLocale = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex space-x-[10px] lg:space-x-4">
      <Menu className="relative">
        <MenuButton
          ariaLabel={t("select-language")}
          className="flex items-center px-[6px] h-[36px] rounded-[5px] border border-gray-old-input-border"
        >
          <svg className="min-w-[30px] min-h-[30px] w-[30px] h-[30px] text-gray-old-text-default">
            <use href={`${svgSprites}#globe`} />
          </svg>
          <span className="text-sm">{LANGUAGES[i18n.language]}</span>
          <svg className="min-w-[30px] min-h-[30px] w-[30px] h-[30px] text-gray-old-text-default">
            <use href={`${svgSprites}#chevron-down`} />
          </svg>
        </MenuButton>
        <MenuItems className="absolute top-0 inset-x-0 -translate-y-[calc(100%+4px)] p-[6px] rounded-[5px] bg-white border border-gray-old-input-border">
          {Object.entries(LANGUAGES).map(([lang, name]) => (
            <MenuItem key={lang}>
              <Link
                className="h-[28px] flex justify-center items-center rounded-[5px] text-gray-old-text-default text-sm hover:bg-[#f2f2f2]"
                to={getLocalizedPathname(pathnameWithoutLocale, lang)}
                onClick={() => {
                  i18n.changeLanguage(lang);
                }}
              >
                {name}
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      <Menu className="relative">
        <MenuButton
          ariaLabel={t("select-currency")}
          className="flex items-center px-[6px] h-[36px] rounded-[5px] border border-gray-old-input-border"
        >
          <span className="text-sm">{currency}</span>
          <svg className="min-w-[30px] min-h-[30px] w-[30px] h-[30px] text-gray-old-text-default">
            <use href={`${svgSprites}#chevron-down`} />
          </svg>
        </MenuButton>
        <MenuItems className="absolute top-0 inset-x-0 -translate-y-[calc(100%+4px)] p-[6px] rounded-[5px] bg-white border border-gray-old-input-border">
          {CURRENCIES.map((currency) => (
            <MenuItem key={currency}>
              <Link
                className="h-[28px] flex justify-center items-center rounded-[5px] text-gray-old-text-default text-sm hover:bg-[#f2f2f2]"
                to={pathname + `?currency=${currency}`}
                onClick={() => {
                  updateCookieCurrency(currency);
                }}
              >
                {currency}
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}

function SocialLinksAndDarkMode() {
  return (
    <div className="grid grid-cols-2 gap-[10px] sm:grid-cols-4">
      <a
        href="mailto:john@gpumine.org"
        rel="noreferrer"
        target="_blank"
        className={socialLinkStyle}
      >
        <div className="sr-only">Email</div>
        <svg className="w-[20px] h-[20px] text-white">
          <use href={`${svgSprites}#email`} />
        </svg>
      </a>
      <a
        href="https://gpumine.link/gpuminegroup"
        rel="noreferrer"
        target="_blank"
        className={socialLinkStyle}
      >
        <div className="sr-only">Line</div>
        <svg className="w-[20px] h-[20px] text-white">
          <use href={`${svgSprites}#line`} />
        </svg>
      </a>
      <a
        href="https://www.facebook.com/gpumine.org"
        rel="noreferrer"
        target="_blank"
        className={socialLinkStyle}
      >
        <div className="sr-only">Facebook</div>
        <svg className="w-[20px] h-[20px] text-white">
          <use href={`${svgSprites}#facebook`} />
        </svg>
      </a>
      <a href="/" rel="noreferrer" target="_blank" className={socialLinkStyle}>
        <div className="sr-only">Facebook</div>
        <svg className="w-[20px] h-[20px] text-white">
          <use href={`${svgSprites}#dark-mode`} />
        </svg>
      </a>
    </div>
  );
}

export default Footer;

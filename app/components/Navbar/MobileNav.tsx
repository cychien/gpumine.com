import * as React from "react";
import svgSprites from "~/assets/icons/sprites.svg";
import { Menu, MenuButton, MenuItems, MenuItem } from "../Menu";
import Link from "./Link";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import usePages from "./usePages";
import useClickAway from "react-use/lib/useClickAway";
import {
  JSSelect,
  JSSelectButton,
  JSSelectOption,
  JSSelectOptions,
  NativeSelect,
  NativeSelectOption,
  Select,
  SelectLabel,
  useSelectContext,
} from "../Select";
import SUPPORTED_COINS from "~/constants/supported-coins";
import { Form } from "remix";
import getLocalizedPathname from "~/utils/getLocalizedPathname";
import { useHydrated } from "remix-utils";

type MobileNavProps = {
  isMenuOpen: boolean;
  toggleMenu: (nextValue?: any) => void;
  isSearchOpen: boolean;
  toggleSearch: (nextValue?: any) => void;
};

function MobileNav({
  isMenuOpen,
  toggleMenu,
  isSearchOpen,
  toggleSearch,
}: MobileNavProps) {
  const { t, i18n } = useTranslation();
  const pages = usePages();
  const isHydrated = useHydrated();

  const menuRef = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLDivElement>(null);

  useClickAway(
    menuRef,
    () => {
      if (isMenuOpen) {
        toggleMenu();
      }
    },
    // Follow headless implementation to avoid time gap
    ["mouseup", "touchend"]
  );

  useClickAway(
    searchRef,
    () => {
      if (isSearchOpen) {
        toggleSearch();
      }
    },
    // Follow headless implementation to avoid time gap
    ["mouseup", "touchend"]
  );

  return (
    <div className="flex items-center space-x-2">
      <div ref={searchRef}>
        {/* Overwrite daisyui's default styles */}
        <Menu className="!block">
          <MenuButton ariaLabel={t("search-account")}>
            <span className="block" onClick={toggleSearch}>
              <svg
                className={cx(
                  "min-w-[30px] min-h-[30px] w-[30px] h-[30px]",
                  isSearchOpen
                    ? "text-primary-500 dark:text-primary-200"
                    : "text-default"
                )}
              >
                <use href={`${svgSprites}#search`} />
              </svg>
            </span>
          </MenuButton>
          {(!isHydrated || isSearchOpen) && (
            <MenuItems
              isStatic
              // Overwrite daisyui's default styles
              className="!fixed top-[86px] left-[16px] right-[16px] rounded-[10px] bg-primary p-4 border-[0.5px] border-gray-300"
            >
              <Form
                method="get"
                action={getLocalizedPathname("/workers", i18n.language)}
                autoComplete="off"
                className="w-full flex flex-col items-center space-y-4"
              >
                <Select
                  label={t("address-type")}
                  name="address_type"
                  defaultValue={SUPPORTED_COINS[0].value}
                >
                  <SelectLabel className="sr-only" />
                  <NativeSelect className="w-[150px] h-[36px] text-sm font-bold px-2 border border-input-border rounded-[5px] bg-card-bg">
                    {SUPPORTED_COINS.map((type) => (
                      <NativeSelectOption key={type.value} value={type.value}>
                        {type.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <CustomJSSelect />
                </Select>
                <input
                  name="address"
                  placeholder={t("account-address")}
                  className="w-full h-[36px] px-[20px] border border-input-border rounded-[10px] text-default text-xs focus:outline-none focus:border-primary-500 dark:focus:border-primary-200 bg-card-bg"
                />
                <div className="flex space-x-[20px] justify-center">
                  {isHydrated && (
                    <button
                      type="button"
                      className="min-w-[110px] h-[36px] px-[20px] border-[0.5px] border-input-border text-default text-sm flex justify-center items-center rounded-full bg-card-bg"
                      onClick={toggleSearch}
                    >
                      {t("close")}
                    </button>
                  )}
                  <button
                    type="submit"
                    className="min-w-[110px] h-[36px] px-[20px] border-[0.5px] border-input-border text-default text-sm flex justify-center items-center rounded-full bg-card-bg"
                  >
                    {t("confirm")}
                  </button>
                </div>
              </Form>
            </MenuItems>
          )}
        </Menu>
      </div>
      <div ref={menuRef}>
        <Menu className="!block">
          <MenuButton ariaLabel={t("open-menu")}>
            <span className="block" onClick={toggleMenu}>
              <svg
                className={cx(
                  "min-w-[30px] min-h-[30px] w-[30px] h-[30px]",
                  isMenuOpen
                    ? "text-primary-500 dark:text-primary-200"
                    : "text-default"
                )}
              >
                <use href={`${svgSprites}#menu`} />
              </svg>
            </span>
          </MenuButton>
          <MenuItems className="!fixed !flex-row top-[86px] left-[16px] right-[16px] h-[80px] rounded-[10px] flex justify-evenly items-center bg-primary border-[0.5px] border-gray-300">
            {pages.map((page) => (
              <MenuItem key={page.id}>
                <Link to={page.link} onClick={toggleMenu}>
                  {page.name}
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}

function CustomJSSelect() {
  const { state } = useSelectContext();

  const selectedAddressType = SUPPORTED_COINS.find(
    (type) => type.value === state.selected
  ) as typeof SUPPORTED_COINS[number];

  return (
    <JSSelect className="relative">
      <JSSelectButton className="relative px-2 flex items-center w-[150px] h-[36px] border border-input-border bg-card-bg rounded-[5px] justify-between">
        <span className="flex items-center">
          <svg className="min-w-[25px] min-h-[25px] w-[25px] h-[25px] text-default">
            <use href={`${svgSprites}#${selectedAddressType.iconId}`} />
          </svg>
          <span className="text-default text-sm font-bold">
            {selectedAddressType.name}
          </span>
        </span>
        <svg className="min-w-[30px] min-h-[30px] w-[30px] h-[30px] text-default">
          <use href={`${svgSprites}#chevron-down`} />
        </svg>
      </JSSelectButton>
      <JSSelectOptions className="absolute inset-x-0 translate-y-2 bg-white dark:bg-[#2f2f2f] border border-input-border p-[6px] rounded-[5px]">
        {SUPPORTED_COINS.map((type) => (
          <JSSelectOption
            key={type.value}
            value={type.value}
            className="flex justify-center items-center group cursor-pointer h-[30px]"
          >
            <svg className="min-w-[25px] min-h-[25px] w-[25px] h-[25px] text-default group-hover:text-primary-500 dark:group-hover:text-primary-200">
              <use href={`${svgSprites}#${type.iconId}`} />
            </svg>
            <span className="text-default text-sm group-hover:text-primary-500 dark:group-hover:text-primary-200 font-bold">
              {type.name}
            </span>
          </JSSelectOption>
        ))}
      </JSSelectOptions>
    </JSSelect>
  );
}

export default MobileNav;

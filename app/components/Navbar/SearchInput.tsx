import * as React from "react";
import { Form } from "remix";
import { useTranslation } from "react-i18next";
import {
  Select,
  NativeSelect,
  NativeSelectOption,
  JSSelect,
  JSSelectButton,
  JSSelectOptions,
  JSSelectOption,
  SelectLabel,
  useSelectContext,
} from "../Select";
import svgSprites from "~/assets/icons/sprites.svg";
import cx from "classnames";
import useLocalStorage from "react-use/lib/useLocalStorage";
import getLocalizedPathname from "~/utils/getLocalizedPathname";
import useClickAway from "react-use/lib/useClickAway";
import SUPPORTED_COINS from "~/constants/supported-coins";

type Account = {
  currency: string;
  account: string;
};

function SearchInput() {
  const { t, i18n } = useTranslation();
  const [searchHistory, setSearchHistory] =
    useLocalStorage<Account[]>("searchHistory");
  const [shouldShowHistory, setShouldShowHistory] = React.useState(false);
  const inputAreaRef = React.useRef(null);

  useClickAway(inputAreaRef, () => {
    if (shouldShowHistory) {
      setShouldShowHistory(false);
    }
  });

  return (
    <Form
      method="get"
      action={getLocalizedPathname("/workers", i18n.language)}
      autoComplete="off"
      onSubmit={(e) => {
        const target = e.target as HTMLFormElement;
        // Need to use JSSelect value here
        const addressType = target.address_type[1].value;
        const address = target.address.value;
        if (addressType && address) {
          if (
            !searchHistory?.find(
              (history) =>
                history.currency === addressType && history.account === address
            ) &&
            /^(0x){0,1}[0-9a-fA-F]{40}$|(sp_[a-zA-Z0-9]{0,20})$|(gm_[a-zA-Z0-9]{0,20})$/.test(
              address
            )
          ) {
            setSearchHistory([
              ...(searchHistory ?? []),
              { currency: addressType, account: address },
            ]);
          }
        }
      }}
    >
      <div className="flex items-center border border-input-border rounded-[10px] px-2 w-[400px] h-[32px]">
        <Select
          label={t("address-type")}
          name="address_type"
          defaultValue={SUPPORTED_COINS[0].value}
        >
          <SelectLabel className="sr-only" />
          <NativeSelect className="w-[90px] text-sm bg-primary text-default">
            {SUPPORTED_COINS.map((type) => (
              <NativeSelectOption key={type.value} value={type.value}>
                {type.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <CustomJSSelect />
        </Select>
        <div className="w-[1px] h-[20px] bg-input-border-light dark:bg-input-border-dark" />
        <div
          className="relative flex-1 h-full flex items-center"
          ref={inputAreaRef}
        >
          <input
            name="address"
            className="block w-full px-[10px] text-xs focus:outline-none placeholder:text-input-border-light dark:text-white bg-primary transition-colors"
            placeholder={t("fill-out-account")}
            onClick={() => {
              setShouldShowHistory(true);
            }}
          />
          {searchHistory && shouldShowHistory && (
            <div className="absolute top-[40px] bg-primary border border-input-border w-[265px] px-4 py-2 rounded-[10px] before:content-[''] before:absolute before:top-0 before:left-0 before:w-[8px] before:h-[8px] before:border-t before:border-l before:bg-primary before:translate-x-[25px] before:translate-y-[-5px] before:block before:border-input-border before:rotate-[45deg]">
              <div className="text-gray-300 dark:text-[#9d9d9d] text-xs mb-1">
                {t("last-search")}
              </div>
              <ul className="space-y-2">
                {searchHistory.map((history) => (
                  <li key={history.account} className="group cursor-pointer">
                    <a
                      href={getLocalizedPathname(
                        `/workers/${history.currency.toLowerCase()}/${
                          history.account
                        }`,
                        i18n.language
                      )}
                      className="flex items-center"
                    >
                      <svg className="min-w-[25px] min-h-[25px] w-[25px] h-[25px] text-default group-hover:text-primary-500 dark:group-hover:text-primary-200">
                        <use
                          href={`${svgSprites}#${history.currency.toLowerCase()}`}
                        />
                      </svg>
                      <span className="ml-2 flex-1 text-default text-sm group-hover:text-primary-500 dark:group-hover:text-primary-200 overflow-hidden text-ellipsis">
                        {history.account}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          type="submit"
          aria-label={t("search-account")}
          className="group"
        >
          <svg className="w-[24px] h-[24px] text-default group-hover:text-primary-500 dark:group-hover:text-primary-200">
            <use href={`${svgSprites}#search`} />
          </svg>
        </button>
      </div>
    </Form>
  );
}

function CustomJSSelect() {
  const { state } = useSelectContext();

  const selectedAddressType = SUPPORTED_COINS.find(
    (type) => type.value === state.selected
  ) as typeof SUPPORTED_COINS[number];

  return (
    <JSSelect className="relative">
      <JSSelectButton className="relative flex items-center space-x-1">
        <svg className="min-w-[25px] min-h-[25px] w-[25px] h-[25px] text-default">
          <use href={`${svgSprites}#${selectedAddressType.iconId}`} />
        </svg>
        <span className="text-default text-sm">{selectedAddressType.name}</span>
        <svg className="min-w-[30px] min-h-[30px] w-[30px] h-[30px] text-default">
          <use href={`${svgSprites}#chevron-down`} />
        </svg>
      </JSSelectButton>
      <JSSelectOptions className="absolute top-[40px] left-[-8px] bg-primary border border-input-border w-[320px] p-1 rounded-[10px] before:content-[''] before:absolute before:top-0 before:left-0 before:w-[8px] before:h-[8px] before:border-t before:border-l before:bg-primary before:translate-x-[25px] before:translate-y-[-5px] before:block before:border-input-border before:rotate-[45deg]">
        {SUPPORTED_COINS.map((type) => (
          <JSSelectOption
            key={type.value}
            value={type.value}
            className={({ active }) =>
              cx(
                "flex items-center space-x-1 p-1 group cursor-pointer rounded-[8px]",
                {
                  "bg-primary-500/10 dark:bg-white/20": active,
                }
              )
            }
          >
            <svg className="min-w-[25px] min-h-[25px] w-[25px] h-[25px] text-default group-hover:text-primary-500 dark:group-hover:text-primary-200">
              <use href={`${svgSprites}#${type.iconId}`} />
            </svg>
            <span className="text-default text-sm group-hover:text-primary-500 dark:group-hover:text-primary-200">
              {type.name}
            </span>
          </JSSelectOption>
        ))}
      </JSSelectOptions>
    </JSSelect>
  );
}

export default SearchInput;

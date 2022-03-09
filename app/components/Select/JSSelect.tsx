import * as React from "react";
import { Listbox } from "@headlessui/react";
import { useSelectContext } from "./Select";
import cx from "classnames";
import { useHydrated } from "remix-utils";

type JSSelectProps = {
  className?: string;
  children: React.ReactNode;
};

function JSSelect({ className, children }: JSSelectProps) {
  const { state, setState } = useSelectContext();
  const isHydrated = useHydrated();
  const nativeSelectId = state.nativeSelectId;

  React.useEffect(() => {
    if (isHydrated) {
      const select = document.getElementById(
        nativeSelectId
      ) as HTMLSelectElement;

      setState((prev) => ({
        ...prev,
        selected: select.value,
      }));
    }
  }, [isHydrated, setState, nativeSelectId]);

  return (
    <div className={cx(className, { hidden: !isHydrated })}>
      <Listbox
        as="div"
        value={state.selected}
        onChange={(v) => {
          setState((prev) => ({
            ...prev,
            selected: v,
          }));
        }}
        aria-labelledby={state.labelId}
      >
        {children}
      </Listbox>
      <input
        name={state.name}
        value={state.selected}
        readOnly
        hidden
        disabled={!isHydrated}
      />
    </div>
  );
}

const JSSelectButton = Listbox.Button;
const JSSelectOptions = Listbox.Options;
const JSSelectOption = Listbox.Option;

export { JSSelect, JSSelectButton, JSSelectOptions, JSSelectOption };

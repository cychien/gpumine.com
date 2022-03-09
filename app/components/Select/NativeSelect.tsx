import { useSelectContext } from "./Select";
import cx from "classnames";
import { useHydrated } from "remix-utils";

type NativeSelectProps = {
  className?: string;
  children: React.ReactNode;
};

type NativeSelectOptionProps = {
  children: React.ReactNode;
  value: string;
};

function NativeSelect({ className, children }: NativeSelectProps) {
  const { state } = useSelectContext();
  const isHydrated = useHydrated();

  return (
    <select
      id={state.nativeSelectId}
      name={state.name}
      defaultValue={state.selected}
      className={cx(className, { hidden: isHydrated })}
      aria-labelledby={state.labelId}
      disabled={isHydrated}
    >
      {children}
    </select>
  );
}

function NativeSelectOption({ children, value }: NativeSelectOptionProps) {
  return <option value={value}>{children}</option>;
}

export { NativeSelect, NativeSelectOption };

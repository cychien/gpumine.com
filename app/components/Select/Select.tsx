import * as React from "react";

type SelectProps = {
  label: string;
  name: string;
  defaultValue: string;
  children: React.ReactNode;
};

type SelectState = {
  label: string;
  name: string;
  selected: string;
  labelId: string;
  nativeSelectId: string;
};

type SelectContext = {
  state: SelectState;
  setState: React.Dispatch<React.SetStateAction<SelectState>>;
};

type SelectLabelProps = {
  className?: string;
};

const SelectCtx = React.createContext<SelectContext | null>(null);

function Select({ label, name, defaultValue, children }: SelectProps) {
  const [selectState, setSelectState] = React.useState<SelectState>({
    label,
    name,
    selected: defaultValue,
    labelId: name + "_label",
    nativeSelectId: name + "_native-select",
  });

  return (
    <SelectCtx.Provider
      value={{ state: selectState, setState: setSelectState }}
    >
      <div>{children}</div>
    </SelectCtx.Provider>
  );
}

function SelectLabel({ className }: SelectLabelProps) {
  const { state } = useSelectContext();

  return (
    <label id={state.labelId} className={className}>
      {state.label}
    </label>
  );
}

function useSelectContext() {
  const context = React.useContext(SelectCtx);
  if (!context) {
    throw new Error(
      "useSelectContext must be used within a SelectContextProvider"
    );
  }
  return context;
}

export { Select, SelectLabel, useSelectContext };

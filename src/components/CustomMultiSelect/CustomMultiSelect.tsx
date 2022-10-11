import { SelectOptionT } from "common/types";
import Select, { components } from "react-select";

type Props = {
  values: SelectOptionT[];
  onChange: (value: any) => void;
  placeholder: string;
  options: SelectOptionT[];
};

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: state.selectProps.isActive
      ? "1px solid var(--primaryDarkColor)"
      : "",
    background: state.selectProps.isActive ? "#f7f7f7" : "",
    cursor: "pointer",
  }),
  container: (provided: any, state: any) => ({
    ...provided,
    width: "fit-content",
    cursor: "pointer",
  }),
  menu: (provided: any) => ({
    ...provided,
    width: 200,
  }),
  menuList: (provided: any) => ({
    ...provided,
    width: 200,
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: state.selectProps.isActive
      ? "var(--primaryDarkColor)"
      : "var(--accentColor)",
    fontWeight: 600,
  }),
};

function CustomMultiSelect({ values, onChange, placeholder, options }: Props) {
  const placeholderText = `${placeholder}${
    values && values?.length > 0 ? `: (${values?.length})` : ""
  }`;

  function handleValueChange(selected: any) {
    onChange(selected);
  }

  return (
    <Select
      options={options || []}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{
        Option,
        IndicatorSeparator: () => null,
        ClearIndicator: () => null,
      }}
      onChange={handleValueChange}
      value={values}
      controlShouldRenderValue={false}
      placeholder={placeholderText}
      isSearchable={false}
      styles={customStyles}
      aria-label={placeholder}
      // BUG: https://github.com/JedWatson/react-select/issues/5274
      // @ts-ignore
      isActive={values && values?.length > 0}
    />
  );
}

export default CustomMultiSelect;

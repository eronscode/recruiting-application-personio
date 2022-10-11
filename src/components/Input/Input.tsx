import React from "react";
import styles from "./Input.module.css";

type Props = {
  onValueChange: (value: string) => void;
  value: string;
  placeholder: string;
  name?: string;
  label?: string;
};

function Input(props: Props) {
  const {
    onValueChange,
    value = "",
    placeholder = "",
    name,
    label,
  } = props;

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    onValueChange(ev.target.value);
  }

  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={placeholder}>{label}</label>}
      <input
        id={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;

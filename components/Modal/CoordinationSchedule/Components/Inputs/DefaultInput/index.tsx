import { InputHTMLAttributes } from "react";

import classNames from "classnames/bind";
import { useFormContext } from "react-hook-form";

import styles from "./DefaultInput.module.scss";

const cn = classNames.bind(styles);

interface DefaultInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldName: string;
  fontSize: number;
}

function DefaultInput({ fieldName, fontSize, ...restProps }: DefaultInputProps) {
  const { register } = useFormContext();

  return (
    <input
      style={{ fontSize }}
      className={cn("input")}
      type="text"
      {...restProps}
      {...register(fieldName)}
    />
  );
}

export default DefaultInput;

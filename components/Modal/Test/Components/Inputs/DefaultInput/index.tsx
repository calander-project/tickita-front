import { InputHTMLAttributes } from "react";

import classNames from "classnames/bind";

import styles from "./DefaultInput.module.scss";

const cn = classNames.bind(styles);

interface DefaultInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fontSize: number;
}

function DefaultInput({ fontSize, ...restProps }: DefaultInputProps) {
  return <input style={{ fontSize }} className={cn("input")} type="text" {...restProps} />;
}

export default DefaultInput;

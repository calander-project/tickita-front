import { InputHTMLAttributes, forwardRef } from "react";

import classNames from "classnames/bind";

import styles from "./DefaultInput.module.scss";

const cn = classNames.bind(styles);

interface DefaultInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fontSize: number;
}

const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(
  ({ fontSize, ...restProps }, ref) => {
    return (
      <input ref={ref} style={{ fontSize }} className={cn("input")} type="text" {...restProps} />
    );
  },
);

DefaultInput.displayName = "DefaultInput";

export default DefaultInput;

import { TextareaHTMLAttributes } from "react";

import classNames from "classnames/bind";

import styles from "./DescriptionInput.module.scss";

const cn = classNames.bind(styles);

interface DescriptionInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

function DescriptionInput({ ...restProps }: DescriptionInputProps) {
  return (
    <div className={cn("container")}>
      <textarea className={cn("textArea")} {...restProps} />
      <p className={cn("textCountBox")}>
        <span className={cn("currentTextCount")}>0</span> / 80
      </p>
    </div>
  );
}

export default DescriptionInput;

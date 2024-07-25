import { TextareaHTMLAttributes } from "react";

import classNames from "classnames/bind";
import { useFormContext } from "react-hook-form";

import styles from "./DescriptionInput.module.scss";

const cn = classNames.bind(styles);

interface DescriptionInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fieldName: string;
}

function DescriptionInput({ fieldName, ...restProps }: DescriptionInputProps) {
  const { register, watch } = useFormContext();
  const contentTextCount = watch("content");

  return (
    <div className={cn("container")}>
      <textarea className={cn("textArea")} {...restProps} {...register(fieldName)} />
      <p className={cn("textCountBox")}>
        <span className={cn("currentTextCount")}>{`${contentTextCount?.length}`}</span> / 80
      </p>
    </div>
  );
}

export default DescriptionInput;

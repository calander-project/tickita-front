import { TextareaHTMLAttributes, forwardRef } from "react";

import classNames from "classnames/bind";
import { UseFormWatch } from "react-hook-form";

import { CoordinateScheduleDefaultInformationType } from "@/types/type";

import styles from "./DescriptionInput.module.scss";

const cn = classNames.bind(styles);

interface DescriptionInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  watch: UseFormWatch<CoordinateScheduleDefaultInformationType>;
}

const DescriptionInput = forwardRef<HTMLTextAreaElement, DescriptionInputProps>(
  ({ watch, ...restProps }, ref) => {
    const contentTextCount = watch("content");

    return (
      <div className={cn("container")}>
        <textarea ref={ref} className={cn("textArea")} {...restProps} />
        <p className={cn("textCountBox")}>
          <span className={cn("currentTextCount")}>{`${contentTextCount?.length}`}</span> / 80
        </p>
      </div>
    );
  },
);

DescriptionInput.displayName = "DescriptionInput";

export default DescriptionInput;

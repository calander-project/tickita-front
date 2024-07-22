import { TextareaHTMLAttributes, forwardRef } from "react";

import classNames from "classnames/bind";
import { UseFormWatch } from "react-hook-form";

import { CoordinateScheduleDefaultInformationType } from "@/types/type";

import styles from "./Description.module.scss";
import DescriptionInput from "../../Inputs/DescriptionInput";
import Label from "../../Label";

const cn = classNames.bind(styles);

interface DescriptionProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  watch: UseFormWatch<CoordinateScheduleDefaultInformationType>;
}

const Description = forwardRef<HTMLTextAreaElement, DescriptionProps>(
  ({ watch, ...restProps }, ref) => {
    return (
      <div className={cn("descriptionBox")}>
        <Label htmlFor={restProps.name} text="일정 설명" />
        <DescriptionInput
          ref={ref}
          placeholder="일정에 필요한 설명을 적어주세요. (선택)"
          {...restProps}
          watch={watch}
        />
      </div>
    );
  },
);

Description.displayName = "Description";

export default Description;

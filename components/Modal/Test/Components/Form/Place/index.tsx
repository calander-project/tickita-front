import { InputHTMLAttributes, forwardRef } from "react";

import classNames from "classnames/bind";

import styles from "./Place.module.scss";
import DefaultInput from "../../Inputs/DefaultInput";
import Label from "../../Label";

const cn = classNames.bind(styles);

interface PlaceProps extends InputHTMLAttributes<HTMLInputElement> {}

const Place = forwardRef<HTMLInputElement, PlaceProps>(({ ...restProps }, ref) => {
  return (
    <div className={cn("placeBox")}>
      <Label htmlFor={restProps.name} text="장소" />
      <DefaultInput
        ref={ref}
        fontSize={14}
        placeholder="장소를 추가해 보세요. (선택)"
        {...restProps}
      />
    </div>
  );
});

Place.displayName = "Place";

export default Place;

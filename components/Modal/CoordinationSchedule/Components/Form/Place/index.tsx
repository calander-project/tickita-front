import classNames from "classnames/bind";

import styles from "./Place.module.scss";
import DefaultInput from "../../Inputs/DefaultInput";
import Label from "../../Label";

const cn = classNames.bind(styles);

interface PlaceProps {
  fieldName: string;
}

function Place({ fieldName }: PlaceProps) {
  return (
    <div className={cn("placeBox")}>
      <Label htmlFor={fieldName} text="장소" />
      <DefaultInput
        fontSize={14}
        placeholder="장소를 추가해 보세요. (선택)"
        fieldName={fieldName}
      />
    </div>
  );
}

export default Place;

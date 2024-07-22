import classNames from "classnames/bind";

import styles from "./Description.module.scss";
import DescriptionInput from "../../Inputs/DescriptionInput";
import Label from "../../Label";

const cn = classNames.bind(styles);

function Description() {
  return (
    <div className={cn("descriptionBox")}>
      <Label htmlFor="" text="일정 설명" />
      <DescriptionInput placeholder="일정에 필요한 설명을 적어주세요. (선택)" />
    </div>
  );
}

export default Description;

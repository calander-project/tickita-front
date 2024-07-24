import classNames from "classnames/bind";

import styles from "./SubTitle.module.scss";

const cn = classNames.bind(styles);

interface SubTitleProps {
  title: string;
  backgroundColor: string;
  color: string;
}

function SubTitle({ title, backgroundColor, color }: SubTitleProps) {
  return (
    <p style={{ color, backgroundColor }} className={cn("container")}>
      {title}
    </p>
  );
}

export default SubTitle;

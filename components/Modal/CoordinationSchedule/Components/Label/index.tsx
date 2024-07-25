import classNames from "classnames/bind";

import styles from "./Label.module.scss";

const cn = classNames.bind(styles);

interface LabelProps {
  isHidden?: boolean;
  text: string;
  htmlFor?: string;
}

function Label({ text, htmlFor, isHidden = false }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn("label", { hiddenLabel: isHidden })}>
      {text}
    </label>
  );
}

export default Label;

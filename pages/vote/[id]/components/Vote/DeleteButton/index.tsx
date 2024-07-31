import Image from "next/image";

import classNames from "classnames/bind";

import styles from "./DeleteButton.module.scss";

const cn = classNames.bind(styles);

function DeleteButton() {
  return (
    <button type="button" className={cn("button")}>
      <Image
        className={cn("icon")}
        src="/icons/garbage.svg"
        width={24}
        height={24}
        alt="쓰레기통 아이콘"
      />
      투표 삭제
    </button>
  );
}

export default DeleteButton;

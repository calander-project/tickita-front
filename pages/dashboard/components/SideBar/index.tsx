import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import classNames from "classnames/bind";

import { MODAL_TYPE } from "@/constants/modalType";
import { useGetGroupList } from "@/hooks/useGetGroupList";
import { useModalStore } from "@/store/useModalStore";

import styles from "./SideBar.module.scss";

const cn = classNames.bind(styles);

export default function SideBar() {
  const { query } = useRouter();
  const { data: groupList } = useGetGroupList();
  const { openModal } = useModalStore();

  const selectId = Number(query.id);

  return (
    <section className={cn("container")}>
      <div className={cn("button-box")}>
        <button
          type="button"
          className={cn("button")}
          onClick={() => openModal(MODAL_TYPE.CREATE_GROUP)}
        >
          <Image src="/icons/plus-icon.svg" width={20} height={20} alt="그룹 생성 아이콘" />
          그룹 새로 만들기
        </button>
      </div>
      <span className={cn("group-guide-text")}>현재 가입된 그룹</span>
      <ul className={cn("group-box")}>
        {groupList?.map((data) => (
          <li key={data.crewId}>
            <Link
              href={`/group/${data.crewId}`}
              className={cn("group-list", { selected: selectId === data.crewId })}
            >
              <div className={cn("group-color")} style={{ backgroundColor: data.labelColor }} />
              <span className={cn("group-title")}>{data.crewName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

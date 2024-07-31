import Image from "next/image";

import classNames from "classnames/bind";

import TitleBox from "@/components/TitleBox";

import { VoteInfoType } from "@/types/type";

import styles from "./Detail.module.scss";

const cn = classNames.bind(styles);

interface DetailProps {
  voteInfo: VoteInfoType;
}

function Detail({ voteInfo }: DetailProps) {
  const { title, content, place, crewId, crewName, crewLabelColor, creatorNickName } = voteInfo;

  return (
    <div className={cn("container")}>
      <div className={cn("titleBox")}>
        <TitleBox title="상세 정보" />
      </div>
      <h2 className={cn("title")}>{title}</h2>
      <div className={cn("box")}>
        <div className={cn("label")}>일정 요청자</div>
        <div>
          <p className={cn("crewName")}>
            <span className={cn("colorBox")} style={{ backgroundColor: crewLabelColor }} />{" "}
            {crewName}
          </p>
          <p className={cn("creatorName")}>{creatorNickName}</p>
        </div>
      </div>

      <div className={cn("placeBox")}>
        <div className={cn("label")}>장소</div>
        <Image src="/icons/place.svg" alt="장소" width={20} height={20} />
        {place ?? "입력된 장소가 없습니다."}
      </div>

      <div className={cn("contentBox")}>
        <div className={cn("label")}>추가 내용</div>
        <p className={cn("content")}>{content}</p>
      </div>
    </div>
  );
}

export default Detail;

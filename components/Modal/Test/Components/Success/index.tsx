import Image from "next/image";

import classNames from "classnames/bind";

import { useModalStore } from "@/store/useModalStore";

import styles from "./Success.module.scss";

const cn = classNames.bind(styles);

function Success() {
  const { closeModal } = useModalStore();

  return (
    <div className={cn("container")}>
      <div className={cn("wrap")}>
        <div className={cn("header")}>
          <h2 className={cn("title")}>투표가 생성되었습니다.</h2>
          <p className={cn("subTitle")}>
            생성된 투표 현황은
            <span className={cn("subTitleEffect")}> 마이페이지 - 일정 조율 현황</span>
            에서 확인하실 수 있습니다.
          </p>
        </div>
        <div className={cn("main")}>
          <h3 className={cn("mainTitle")}>투표 마감 후 진행 안내</h3>
          <div className={cn("box")}>
            <div className={cn("imageBox")}>
              <Image src="./icons/vote.svg" alt="투표" width={60} height={70} />
              <Image
                className={cn("imageEffect")}
                src="/images/heart.png"
                alt="하트"
                width={38}
                height={25}
              />
            </div>
            <div>
              <p className={cn("text")}>
                하나의 일정이 <span className={cn("textEffect")}>과반수 </span> 받은 경우
              </p>
              <p className={cn("subText")}>자동적으로 과반수 받은 날짜로 캘린더에 등록돼요</p>
            </div>
          </div>
          <div className={cn("box")}>
            <div className={cn("imageBox")}>
              <Image src="./icons/vote.svg" alt="투표" width={60} height={70} />
              <Image
                className={cn("imageEffect")}
                src="/images/x.png"
                alt="x"
                width={38}
                height={25}
              />
            </div>
            <div>
              <p className={cn("text")}>
                두 개 이상 일정이 <span className={cn("textEffect")}>같은 득표를</span> 받은 경우
              </p>
              <p className={cn("subText")}>두 개의 일정 중 더 빠른 일정의 시간으로 반영됩니다.</p>
            </div>
          </div>
          <div>
            <p className={cn("guide")}>
              모두가 투표에 참여하지 않는 경우에는 일정이 생성되지 않습니다.
            </p>
            <p className={cn("guide")}>
              투표에 참여하지 않은 인원은 자동으로 참석자에서 제외됩니다.
            </p>
          </div>
        </div>
        <div className={cn("footer")}>
          <button type="button" className={cn("button")} onClick={closeModal}>
            네, 확인했어요
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;

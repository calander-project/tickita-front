import Image from "next/image";

import classNames from "classnames/bind";

import styles from "./Guide.module.scss";

const cn = classNames.bind(styles);

interface GuideProps {
  isCreator: boolean;
}

function Guide({ isCreator }: GuideProps) {
  if (isCreator) {
    return (
      <div className={cn("container")}>
        <div className={cn("box")}>
          <Image src="/icons/stop.svg" width={80} height={80} alt="일정 생성자 가이드" />
          <div className={cn("textBox", "textWhite")}>
            <p>잠깐! 혹시 일정 조율을 만드셨나요?</p>
            <p>주최자는 투표 단계를 진행하지 않아요</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("container")}>
      <div className={cn("box", "redBox")}>
        <Image src="/icons/siren.svg" width={80} height={80} alt="일정 참여자 가이드" />
        <div className={cn("textBox")}>
          <p>투표에 참여하지 않은 사람은</p>
          <p>자동으로 일정에서 제외됩니다.</p>
        </div>
      </div>
    </div>
  );
}

export default Guide;

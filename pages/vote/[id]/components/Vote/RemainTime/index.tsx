import Image from "next/image";

import classNames from "classnames/bind";
import dayjs from "dayjs";

import { formatDurationTime } from "@/utils/calculateCalendarDates";

import styles from "./RemainTime.module.scss";

const cn = classNames.bind(styles);

interface RemainTimeProps {
  remainTime: number;
  endTime: string;
  endDate: string;
}

function RemainTime({ remainTime, endTime, endDate }: RemainTimeProps) {
  return (
    <div className={cn("container")}>
      <p className={cn("label")}>가능한 일정을</p>
      <p className={cn("label")}>모두 투표해 주세요</p>
      <p className={cn("title")}>
        <span className={cn("skyBlueTitle")}>{formatDurationTime(remainTime)}</span> 남음
      </p>
      <p
        className={cn("text")}
      >{`${dayjs(endDate).format("MM월 DD일")} ${endTime.slice(0, -3)}까지 투표 가능해요`}</p>
      <Image src="/images/doodoo.png" width={120} height={121} alt="총을 쏘는 모션을 하는 두더지" />
    </div>
  );
}

export default RemainTime;

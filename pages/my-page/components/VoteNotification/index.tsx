import Image from "next/image";
import Link from "next/link";

import classNames from "classnames/bind";
import dayjs from "dayjs";

import { VoteNotificationType } from "@/types/type";

import styles from "./VoteNotification.module.scss";

dayjs.locale("ko");

const cn = classNames.bind(styles);

interface VoteNotificationProps {
  notification: VoteNotificationType;
}

export default function VoteNotification({ notification }: VoteNotificationProps) {
  const endDate = dayjs(notification.localDateTime).format("YY.MM.DD (ddd)");

  return (
    <Link
      href={`vote/${notification.voteId}?crewId=${notification.crewId}`}
      className={cn("container", { isVoted: notification.voteParticipateType })}
    >
      <div className={cn("label-container")}>
        <div className={cn("left-labels")}>
          <div className={cn("group-label")}>{notification.crewName}</div>
          {notification.isChecked || <div className={cn("new-label")}>NEW</div>}
        </div>
        {notification.voteParticipateType && (
          <div className={cn("vote-done-label")}>
            <Image src="/icons/vote-done-icon.svg" alt="투표 완료" width={20} height={20} />
            투표 완료
          </div>
        )}
      </div>
      <p className={cn("vote-title")}>{notification.voteTitle}</p>
      <div className={cn("end-date")}>{endDate}</div>
    </Link>
  );
}

import classNames from "classnames/bind";

import TitleBox from "@/components/TitleBox";

import { ParticipantListType } from "@/types/type";

import styles from "./Participant.module.scss";

const cn = classNames.bind(styles);

interface ParticipantProps {
  participantList: ParticipantListType[];
}

function Participant({ participantList }: ParticipantProps) {
  return (
    <div className={cn("container")}>
      <div className={cn("titleBox")}>
        <TitleBox title="참석 인원" />
      </div>
      <ul className={cn("listBox")}>
        {participantList?.map((info) => {
          const { accountId, nickName, voteParticipateType } = info;

          return (
            <li key={accountId} className={cn("list")}>
              <p className={cn("name")}>{nickName}</p>
              {voteParticipateType ? (
                <p className={cn("successState")}>투표 완료</p>
              ) : (
                <p className={cn("defaultState")}>미투표</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Participant;

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import dayjs from "dayjs";

import { getScheduleDetail } from "@/apis/apis";
import { scheduleKey } from "@/constants/queryKey";
import useDeleteSchedule from "@/hooks/useDeleteSchedule";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import useToast from "@/hooks/useToast";
import { useModalStore } from "@/store/useModalStore";

import styles from "./ScheduleDetailModal.module.scss";

const cn = classNames.bind(styles);

export default function ScheduleDetailModal() {
  const { closeModal, data: scheduleId } = useModalStore();
  const { data: userInfo } = useGetUserInfo();
  const { mutate } = useDeleteSchedule();
  const { successToast, errorToast } = useToast();

  const { data } = useQuery({
    queryKey: scheduleKey.detail(scheduleId),
    queryFn: () => getScheduleDetail(scheduleId),
  });

  const place = data?.location ? data.location : "정해진 장소가 없어요.";
  const description = data?.description ? data.description : "입력된 설명이 없어요.";
  const start = dayjs(data?.startDateTime).format("YYYY.MM.DD HH:mm");
  const end = dayjs(data?.endDateTime).format("YYYY.MM.DD HH:mm");

  const handleDelete = () => {
    mutate(scheduleId, {
      onSuccess: () => {
        successToast("일정이 삭제되었습니다!");
        closeModal();
      },
      onError: () => {
        errorToast("일정 삭제중 오류가 발생했습니다!");
      },
    });
  };

  return (
    <div className={cn("container")}>
      <div className={cn("header")}>
        <div className={cn("group")}>
          <div className={cn("color")} style={{ backgroundColor: data?.crewInfo.labelColor }}></div>
          <h2 className={cn("name")}>{data?.crewInfo.crewName}</h2>
          {data?.coordinate && <p className={cn("coordinated")}>조율된 일정</p>}
        </div>
        <div className={cn("buttons")}>
          {data?.coordinate || (
            //후에 수정버튼도 여기 추가
            <button className={cn("remove-button")} onClick={handleDelete}>
              <Image src="/icons/trash-icon.svg" alt="일정삭제" width={30} height={30} />
            </button>
          )}
          <button className={cn("close-button")} type="button" onClick={closeModal}>
            <Image src="/icons/close-icon.svg" alt="모달 닫기" width={30} height={30} />
          </button>
        </div>
      </div>
      <div className={cn("contents")}>
        <h1 className={cn("title")}>{data?.title}</h1>
        <div className={cn("time-place")}>
          <div className={cn("time-container")}>
            <p className={cn("label")}>시간</p>
            <p className={cn("time")}>
              {start} ~ {end}
            </p>
          </div>
          <div className={cn("place-container")}>
            <p className={cn("label")}>장소</p>
            <p className={cn("place")}>
              <Image
                src="/icons/location-icon.svg"
                alt="장소"
                width={20}
                height={20}
                className={cn("place-icon")}
              />
              {place}
            </p>
          </div>
        </div>
        <div className={cn("description")}>
          <p className={cn("label")}>추가 내용</p>
          <p className={cn("text")}>{description}</p>
        </div>
        <div className={cn("participants-container")}>
          <p className={cn("label")}>참가자</p>
          <div className={cn("participants")}>
            {data && data.participants && data.participants.length >= 2 ? (
              data.participants
                .filter((participant) => participant.accountId !== userInfo?.accountId)
                .map((participant) => (
                  <p className={cn("participant")} key={participant.accountId}>
                    {participant.nickName}
                  </p>
                ))
            ) : (
              <p className={cn("alone")}>참가자가 혼자입니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

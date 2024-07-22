import { Dispatch, SetStateAction, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { participantScheduleCheck } from "@/apis/apis";
import { useGetGroupInfo } from "@/hooks/useGetGroupInfo";
import { useGetGroupList } from "@/hooks/useGetGroupList";
import { useModalStore } from "@/store/useModalStore";

import { CoordinateScheduleDefaultInformationType, StepViewType } from "@/types/type";

import styles from "./DefaultInformation.module.scss";
import Date from "../Components/Form/Date";
import Description from "../Components/Form/Description";
import Group from "../Components/Form/Group";
import Participant from "../Components/Form/Participant";
import Place from "../Components/Form/Place";
import Title from "../Components/Form/Title";
import StepView from "../Components/StepView";
import SubTitle from "../Components/SubTitle";

const cn = classNames.bind(styles);

const formSchema = z
  .object({
    title: z.string().min(1),
    place: z.string().optional(),
    content: z.string().optional(),
    crewId: z.number().positive(),
    accountIds: z.array(z.number()).nonempty(),
  })
  .partial();

interface DefaultInformationProps {
  step: StepViewType;
  setStep: Dispatch<SetStateAction<StepViewType>>;
}

function DefaultInformation({ step, setStep }: DefaultInformationProps) {
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<CoordinateScheduleDefaultInformationType>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });
  const { closeModal } = useModalStore();

  const crewIdField = watch("crewId");

  const { data: groupList } = useGetGroupList();
  const { data: groupMemberList } = useGetGroupInfo(crewIdField);

  const handleModalCloseButtonClick = () => {
    closeModal();
  };

  const onSubmit = async (data: CoordinateScheduleDefaultInformationType) => {
    const participantIdQuery = data.accountIds.map((id) => `participantId=${id}`).join("&");
    const selectedDatesQuery = selectedDate
      .map((date) => `selectedDates=${dayjs(date).format("YYYY-MM-DD")}`)
      .join("&");

    const participantTimes = await participantScheduleCheck(participantIdQuery, selectedDatesQuery);
    console.log(participantTimes);
  };

  return (
    <div className={cn("container")}>
      <div className={cn("header")}>
        <SubTitle title="기본 정보 입력" color="#213EA3" backgroundColor="#E5EBFF" />
        <StepView maxStep={step.maxStep} currentStep={step.currentStep} />
      </div>
      <form className={cn("form")} onSubmit={handleSubmit(onSubmit)}>
        <Title {...register("title")} />
        <Place {...register("place")} />
        <Description {...register("content")} watch={watch} />
        <Group groupList={groupList ?? []} setValue={setValue} />
        <Participant setValue={setValue} participantList={groupMemberList?.crewMembers ?? []} />
        <Date selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <div className={cn("footer")}>
          <button className={cn("closeButton")} onClick={handleModalCloseButtonClick}>
            취소
          </button>
          <button
            className={cn("submitButton")}
            disabled={!isValid || Boolean(!selectedDate.length)}
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default DefaultInformation;

import { Dispatch, SetStateAction, useState } from "react";

import classNames from "classnames/bind";
import { useForm } from "react-hook-form";

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
    defaultValues: {
      title: "",
      place: "",
      content: "",
      crewId: 0,
      accountIds: [],
    },
  });

  const onSubmit = (data: CoordinateScheduleDefaultInformationType) => {
    console.log(data);
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
        <Group groupList={[]} setValue={setValue} />
        <Participant setValue={setValue} participantList={[]} />
        <Date selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <div className={cn("footer")}>
          <button className={cn("closeButton")}>취소</button>
          <button className={cn("submitButton")}>다음</button>
        </div>
      </form>
    </div>
  );
}

export default DefaultInformation;

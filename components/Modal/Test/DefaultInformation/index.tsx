import { Dispatch, SetStateAction } from "react";

import classNames from "classnames/bind";

import { StepViewType } from "@/types/type";

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
  return (
    <div className={cn("container")}>
      <div className={cn("header")}>
        <SubTitle title="기본 정보 입력" color="#213EA3" backgroundColor="#E5EBFF" />
        <StepView maxStep={step.maxStep} currentStep={step.currentStep} />
      </div>
      <form className={cn("form")}>
        <Title />
        <Place />
        <Description />
        <Group groupList={[{ crewId: 1, crewName: "토스", labelColor: "#21D53E" }]} />
        <Participant
          participantList={[
            {
              role: "a",
              accountId: 1,
              nickName: "dldngur",
              email: "@",
              image: null,
            },
          ]}
        />
        <Date />
        <div className={cn("footer")}>
          <button className={cn("closeButton")}>취소</button>
          <button className={cn("submitButton")}>다음</button>
        </div>
      </form>
    </div>
  );
}

export default DefaultInformation;

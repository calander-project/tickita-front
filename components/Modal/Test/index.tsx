import { useState } from "react";

import { CoordinateScheduleDefaultInformationType, StepViewType } from "types/type";

import DefaultInformation from "./DefaultInformation";
import SelectDate from "./SelectDate";

interface participantTimesType {
  haveStartDateTime: string;
  haveEndDateTime: string;
}

export interface CreateVoteDataType extends CoordinateScheduleDefaultInformationType {
  participantTimes: participantTimesType[];
}

function Test() {
  const [step, setStep] = useState<StepViewType>({
    maxStep: 2,
    currentStep: 1,
  });
  const [createVoteData, setCreateVoteData] = useState<CreateVoteDataType>({
    crewId: 0,
    title: "",
    content: "",
    place: "",
    accountIds: [],
    participantTimes: [],
  });

  return (
    <>
      {step.currentStep === 2 && (
        <DefaultInformation step={step} setStep={setStep} setCreateVoteData={setCreateVoteData} />
      )}
      {step.currentStep === 1 && (
        <SelectDate step={step} setStep={setStep} createVoteData={createVoteData} />
      )}
    </>
  );
}

export default Test;

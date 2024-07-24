import { useState } from "react";

import { CoordinationScheduleDefaultInformationType, StepViewType } from "types/type";

import DefaultInformation from "./Components/DefaultInformation";
import SelectDate from "./Components/SelectDate";
import Success from "./Components/Success";

export interface participantTimesType {
  haveStartDateTime: string;
  haveEndDateTime: string;
}

export interface CreateVoteDataType extends CoordinationScheduleDefaultInformationType {
  participantTimes: participantTimesType[];
  selectedDateList: string[];
}

function CoordinationScheduleModal() {
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
    selectedDateList: [],
  });

  return (
    <>
      {step.currentStep === 1 && (
        <DefaultInformation
          step={step}
          setStep={setStep}
          createVoteData={createVoteData}
          setCreateVoteData={setCreateVoteData}
        />
      )}
      {step.currentStep === 2 && (
        <SelectDate step={step} setStep={setStep} createVoteData={createVoteData} />
      )}
      {step.currentStep === 3 && <Success />}
    </>
  );
}

export default CoordinationScheduleModal;

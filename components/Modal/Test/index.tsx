import { useState } from "react";

import { CoordinateScheduleDefaultInformationType, StepViewType } from "types/type";

import DefaultInformation from "./DefaultInformation";

function Test() {
  const [step, setStep] = useState<StepViewType>({
    maxStep: 2,
    currentStep: 1,
  });
  const [defaultInformation, setDefaultInformation] =
    useState<CoordinateScheduleDefaultInformationType>({
      crewId: 0,
      title: "",
      content: "",
      place: "",
      accountIds: [],
    });

  return <DefaultInformation step={step} setStep={setStep} />;
}

export default Test;

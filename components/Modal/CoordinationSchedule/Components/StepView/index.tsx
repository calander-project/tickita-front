import React from "react";

import classNames from "classnames/bind";

import styles from "./StepView.module.scss";

const cn = classNames.bind(styles);

interface StepViewProps {
  maxStep: number;
  currentStep: number;
}

function StepView({ maxStep, currentStep }: StepViewProps) {
  const stepList = Array.from({ length: maxStep }, (_, index) => index + 1);

  return (
    <ul className={cn("stepList")}>
      {stepList.map((step) => (
        <li className={cn("step", { currentStep: currentStep === step })} key={step}>
          {step}
        </li>
      ))}
    </ul>
  );
}

export default StepView;

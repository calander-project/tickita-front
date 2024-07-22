import { InputHTMLAttributes, forwardRef } from "react";

import DefaultInput from "../../Inputs/DefaultInput";
import Label from "../../Label";

interface TitleProps extends InputHTMLAttributes<HTMLInputElement> {}

const Title = forwardRef<HTMLInputElement, TitleProps>(({ ...restProps }, ref) => {
  return (
    <>
      <Label htmlFor={restProps.name} isHidden text="일정 제목" />
      <DefaultInput
        ref={ref}
        fontSize={20}
        placeholder="일정의 제목을 입력해 주세요. (필수)"
        autoFocus
        {...restProps}
      />
    </>
  );
});

Title.displayName = "Title";

export default Title;

import DefaultInput from "../../Inputs/DefaultInput";
import Label from "../../Label";

interface TitleProps {
  fieldName: string;
}

function Title({ fieldName }: TitleProps) {
  return (
    <>
      <Label htmlFor={fieldName} isHidden text="일정 제목" />
      <DefaultInput
        fontSize={20}
        placeholder="일정의 제목을 입력해 주세요. (필수)"
        fieldName={fieldName}
        autoFocus
      />
    </>
  );
}

Title.displayName = "Title";

export default Title;

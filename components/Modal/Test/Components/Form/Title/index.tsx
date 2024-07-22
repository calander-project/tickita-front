import DefaultInput from "../../Inputs/DefaultInput";
import Label from "../../Label";

function Title() {
  return (
    <>
      <Label htmlFor="" isHidden text="일정 제목" />
      <DefaultInput fontSize={22} placeholder="일정의 제목을 입력해 주세요. (필수)" autoFocus />
    </>
  );
}

export default Title;

import Image from "next/image";
import { useRouter } from "next/router";

import classNames from "classnames/bind";

import { useSubmitVote } from "@/hooks/useSubmitVote";
import useToast from "@/hooks/useToast";
import { useModalStore } from "@/store/useModalStore";

import styles from "./SubmitVote.module.scss";

const cn = classNames.bind(styles);

interface SelectedDateType {
  key: string;
  isSelected: boolean;
  date: string;
}

export default function SubmitVoteModal() {
  const { closeModal, data } = useModalStore();
  const { query } = useRouter();
  const { successToast, errorToast, pendingToast } = useToast();
  const { mutate } = useSubmitVote(query.id as string);

  const handleSubmitButtonClick = () => {
    const payload = {
      crewId: Number(query.crewId),
      voteStateIds: data.map((item: SelectedDateType) => item.key),
    };

    pendingToast("투표를 제출하고 있습니다...");

    mutate(payload, {
      onSuccess: () => {
        successToast("조율 일정 투표가 제출되었습니다.");
        closeModal();
      },
      onError: () => {
        errorToast("투표를 제출 하던 중 에러가 발생했습니다!");
      },
    });
  };

  return (
    <div className={cn("container")}>
      <div className={cn("modal-header")}>
        <h2 className={cn("modal-title")}>안내사항</h2>
        <button className={cn("modal-close")} type="button" onClick={closeModal}>
          <Image src="/icons/close-icon.svg" alt="모달 닫기" width={30} height={30} />
        </button>
      </div>
      <div className={cn("modal-body")}>
        <p className={cn("text")}>투표를 제출하면 수정이 불가능합니다.</p>
        <p className={cn("text")}>정말 제출하시겠습니까?</p>
      </div>
      <ul className={cn("listBox")}>
        🗳️ 선택하신 날짜
        {data.map((item: SelectedDateType) => (
          <li key={item.key} className={cn("list")}>
            <p>{item.date}</p>
          </li>
        ))}
      </ul>
      <div className={cn("modal-footer")}>
        <button onClick={handleSubmitButtonClick} className={cn("action-button")}>
          제출 하기
        </button>
      </div>
    </div>
  );
}

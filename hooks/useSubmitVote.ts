import { useMutation, useQueryClient } from "@tanstack/react-query";

import { submitVote } from "@/apis/apis";
import { voteKey } from "@/constants/queryKey";

import { VotePayloadType } from "@/types/type";

import useToast from "./useToast";

export const useSubmitVote = (voteId: string) => {
  const { pendingToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: VotePayloadType) =>
      pendingToast(submitVote(voteId, data), {
        pending: "투표를 제출하고 있습니다.",
        success: "투표가 성공적으로 제출되었어요.",
        error: "투표를 제출 하던 중 에러가 발생했습니다!",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voteKey.detail(voteId) });
    },
  });

  return { mutate };
};

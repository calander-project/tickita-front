import { useMutation, useQueryClient } from "@tanstack/react-query";

import { submitVote } from "@/apis/apis";
import { voteKey } from "@/constants/queryKey";

import { VotePayloadType } from "@/types/type";

export const useSubmitVote = (voteId: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: VotePayloadType) => submitVote(voteId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voteKey.detail(voteId) });
    },
  });

  return { mutate };
};

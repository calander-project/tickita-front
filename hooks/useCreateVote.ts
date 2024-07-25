import { useMutation } from "@tanstack/react-query";

import { createVote } from "@/apis/apis";

import { VoteDataType } from "@/types/type";

export const useCreateVote = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: VoteDataType) => createVote(data),
  });

  return { mutate, isPending };
};

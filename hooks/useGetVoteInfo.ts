import { useQuery } from "@tanstack/react-query";

import { getVoteInfo } from "@/apis/apis";
import { voteKey } from "@/constants/queryKey";

export const useGetVoteInfo = (crewId: string, voteId: string) => {
  const { data } = useQuery({
    queryKey: voteKey.detail(voteId),
    queryFn: () => getVoteInfo(crewId, voteId),
  });

  return { data };
};

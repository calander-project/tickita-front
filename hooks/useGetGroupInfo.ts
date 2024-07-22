import { useQuery } from "@tanstack/react-query";

import { getGroupInfo } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";

export const useGetGroupInfo = (id: number) => {
  const { data } = useQuery({
    queryKey: groupKey.detail(id),
    queryFn: () => {
      if (!id) {
        return null;
      }

      return getGroupInfo(id);
    },
    staleTime: 0,
    gcTime: 0,
  });

  return { data };
};

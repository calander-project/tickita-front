import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteSchedule } from "@/apis/apis";
import { scheduleKey } from "@/constants/queryKey";

export default function useDeleteSchedule() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (scheduleId: number) => deleteSchedule(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleKey.lists() });
    },
  });
  return { mutate };
}

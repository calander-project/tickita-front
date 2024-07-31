import { useEffect } from "react";

import { postVote } from "@/apis/apis";

import { VoteDataType } from "@/types/type";

export const usePostVote = (data: VoteDataType) => {
  const fetchData = async () => {
    try {
      await postVote(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};

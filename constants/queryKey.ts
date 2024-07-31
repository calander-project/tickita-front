/**
 * 쿼리 키 팩토리
 * {@link https://tkdodo.eu/blog/effective-react-query-keys}
 */

import { ScheduleFilterType } from "@/types/type";

export const groupKey = {
  all: ["group"] as const,
  lists: () => [...groupKey.all, "list"] as const,
  details: () => [...groupKey.all, "detail"] as const,
  detail: (id: number) => [...groupKey.details(), id] as const,
};

export const userInfoKey = {
  all: ["user"] as const,
  info: () => [...userInfoKey.all, "info"] as const,
};

export const notificationKey = {
  all: ["notification"] as const,
  lists: () => [...notificationKey.all, "list"] as const,
};

export const scheduleKey = {
  all: ["schedule"] as const, // 전체 관리
  upcoming: () => [...scheduleKey.all, "upcoming"] as const, // 다가오는 일정
  lists: () => [...scheduleKey.all, "list"] as const, // 일정 리스트(전체)
  crew: (crewId: number) => [...scheduleKey.lists(), crewId] as const, // 일정 리스트(그룹)
  list: (filter: ScheduleFilterType) => [...scheduleKey.crew(filter.crewId), { filter }] as const, // 일정 리스트(그룹 -> 특정 조건)
  details: () => [...scheduleKey.all, "detail"] as const, // 일정 상세 -> 기본 키 제공, 유지보수 용이
  detail: (scheduleId: number) => [...scheduleKey.details(), scheduleId] as const, // 일정 상세(특정 일정)
};

export const voteKey = {
  all: ["vote"] as const,
  lists: () => [...voteKey.all, "list"] as const,
  details: () => [...voteKey.all, "detail"] as const,
  detail: (voteId: string) => [...voteKey.details(), voteId] as const,
};

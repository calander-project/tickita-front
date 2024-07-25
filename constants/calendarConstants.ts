export const DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

export const HOURS = Array.from({ length: 24 }, (_, index) => index + 1);

export const MINUTES = ["00", "30"] as const;

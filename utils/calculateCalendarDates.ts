import dayjs, { Dayjs } from "dayjs";

import { VoteDateListType } from "@/components/Modal/Test/SelectDate";

/**
 * 월간 캘린더에 들어갈 날짜를 42일 기준으로 계산
 */
export const calculateMonthDates = (date: Dayjs) => {
  const startOfMonth = date.startOf("month");
  const endOfMonth = date.endOf("month");

  const startDay = startOfMonth.day();
  const endDay = endOfMonth.date();

  const days: Dayjs[] = [];

  // 지난달 날짜 추가
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(startOfMonth.subtract(i + 1, "day"));
  }

  // 이번 달 날짜 추가
  for (let i = 1; i <= endDay; i++) {
    days.push(startOfMonth.date(i));
  }

  // 다음달 시작 날짜 설정 (다음달의 1일)
  const nextMonthStartDate = endOfMonth.add(1, "day").startOf("month");

  // 다음달 날짜 추가
  let currentDay = nextMonthStartDate;
  while (days.length < 42) {
    days.push(currentDay);
    currentDay = currentDay.add(1, "day");
  }

  return days;
};

export const calculateWeekDates = (date: Dayjs): Dayjs[] => {
  const startOfWeek = date.startOf("week");
  const endOfWeek = date.endOf("week");
  const days: Dayjs[] = [];

  let currentDate = startOfWeek;

  while (currentDate <= endOfWeek) {
    days.push(currentDate);
    currentDate = currentDate.add(1, "day");
  }

  return days;
};

export const divideWeek = (calendarTags: JSX.Element[]) => {
  return calendarTags.reduce((acc: JSX.Element[][], day: JSX.Element, i: number) => {
    if (i % 7 === 0) {
      acc.push([day]);
    } else {
      acc[acc.length - 1].push(day);
    }
    return acc;
  }, []);
};

const isBetween = (time: Dayjs, start: Dayjs, end: Dayjs) => {
  return dayjs(time).isAfter(dayjs(start), "minute") && dayjs(time).isBefore(dayjs(end), "minute");
};

export const isVoteTimeInRange = (
  selectedDateList: VoteDateListType[],
  targetDate: string,
  targetTime: string,
) => {
  for (let i = 0; i < selectedDateList.length; i++) {
    const { voteDate, voteStartTime, voteEndTime } = selectedDateList[i];
    if (voteDate !== targetDate) {
      continue;
    }

    const startTime = dayjs(voteStartTime, "HH:mm");
    const endTime = dayjs(voteEndTime, "HH:mm");
    const checkTime = dayjs(targetTime, "HH:mm");

    if (isBetween(checkTime, startTime, endTime)) {
      return true;
    }
  }

  return false;
};

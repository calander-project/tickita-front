import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";

import { participantTimesType } from "@/components/Modal/CoordinationSchedule";
import { VoteDateListType } from "@/components/Modal/CoordinationSchedule/Components/SelectDate";

dayjs.extend(isBetween);
dayjs.extend(duration);

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

    const startTime = dayjs(`2000-01-01 ${voteStartTime}`);
    const endTime = dayjs(`2000-01-01 ${voteEndTime}`);
    const checkTime = dayjs(`2000-01-01 ${targetTime}`);

    if (
      checkTime.isSame(startTime) ||
      checkTime.isSame(endTime) ||
      checkTime.isBetween(startTime, endTime)
    ) {
      return true;
    }
  }

  return false;
};

export const compareTimestamps = (firstTime: string, secondTime: string) => {
  const fistTimeObj = dayjs(`2000-01-01 ${firstTime}`);
  const secondTimeObj = dayjs(`2000-01-01 ${secondTime}`);

  if (fistTimeObj.isAfter(secondTimeObj)) {
    return { startTime: secondTime, endTime: firstTime };
  }
  return { startTime: firstTime, endTime: secondTime };
};

export const isImpossibleTimeInRange = (
  participantTimes: participantTimesType[],
  targetDate: string,
  targetTime: string,
) => {
  for (let i = 0; i < participantTimes.length; i++) {
    const { haveStartDateTime, haveEndDateTime } = participantTimes[i];

    const startTime = dayjs(haveStartDateTime);
    const endTime = dayjs(haveEndDateTime);
    const checkTime = dayjs(`${targetDate} ${targetTime}`);

    if (
      checkTime.isSame(startTime) ||
      checkTime.isSame(endTime) ||
      checkTime.isBetween(startTime, endTime)
    ) {
      return true;
    }
  }

  return false;
};

export const formatDurationTime = (second: number) => {
  const duration = dayjs.duration(second, "seconds");
  const day = duration.days();
  const hour = duration.hours();

  if (day > 0) {
    return `${day}일`;
  }

  return `${hour}시간`;
};

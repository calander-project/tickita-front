import dayjs from "dayjs";

export const generateCalendar = (year: number, month: number) => {
  const currentDate = dayjs(`${year}-${month + 1}-01`);
  const firstDayOfMonth = currentDate.day();
  const daysInMonth = currentDate.daysInMonth();

  const prevMonth = dayjs(currentDate).subtract(1, "month");
  const prevMonthDaysCount = prevMonth.daysInMonth();

  const days = [];

  // 이전 달의 마지막 날짜들 추가
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push({
      date: prevMonthDaysCount - i,
      currentMonth: false,
    });
  }

  // 현재 달의 날짜들 추가
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      currentMonth: true,
    });
  }

  // 다음 달의 날짜들 추가
  const remainingDays = 7 - (days.length % 7);
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      currentMonth: false,
    });
  }

  return days;
};

export const isTargetNumberWithin31Days = (startDate: Date, targetDate: Date) => {
  if (!startDate) {
    return false;
  }

  const dateDiff = Math.abs(dayjs(targetDate).diff(dayjs(startDate), "day"));

  return dateDiff > 31;
};

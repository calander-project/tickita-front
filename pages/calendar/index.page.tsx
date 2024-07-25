import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";

import { QueryClient, dehydrate, useQueries } from "@tanstack/react-query";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useShallow } from "zustand/react/shallow";

import CalendarHeader from "./components/Calendar/CalendarHeader";
import DailyCalendar from "./components/Calendar/DailyCalendar";
import MonthlyCalendar from "./components/Calendar/MonthlyCalendar";
import WeeklyCalendar from "./components/Calendar/WeeklyCalendar";
import CalendarSideBar from "./components/CalendarSideBar";
import { getCrewSchedules, getGroupList, getUserInfo } from "@/apis/apis";
import { setContext } from "@/apis/axios";
import Header from "@/components/Header";
import MetaData from "@/components/MetaData";
import { groupKey, scheduleKey, userInfoKey } from "@/constants/queryKey";
import { useDateStore } from "@/store/useDateStore";
import { calculateMonthDates } from "@/utils/calculateCalendarDates";

import { CalendarType } from "@/types/type";

import styles from "./Calendar.module.scss";

const cn = classNames.bind(styles);

dayjs.extend(utc);
const queryClient = new QueryClient();

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  setContext(context);

  try {
    await queryClient.prefetchQuery({ queryKey: groupKey.lists(), queryFn: getGroupList });
    await queryClient.prefetchQuery({ queryKey: userInfoKey.info(), queryFn: getUserInfo });

    return {
      props: { dehydrateState: dehydrate(queryClient) },
    };
  } catch (error) {
    return {
      props: { dehydrateState: null },
    };
  }
};

export default function CalendarPage() {
  const [calendarType, setCalendarType] = useState<CalendarType>("월");
  const [selectedCrewIdList, setSelectedCrewIdList] = useState<number[] | []>([]);
  const [query, setQuery] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });
  const router = useRouter();
  const { focusDate } = useDateStore(useShallow((state) => ({ focusDate: state.focusDate })));

  useEffect(() => {
    let startDate = null;
    let endDate = null;

    switch (calendarType) {
      case "월":
        const days = calculateMonthDates(focusDate);
        startDate = days[0].startOf("day").utc().add(9, "hour");
        endDate = days[41].endOf("day").utc().add(9, "hour");
        break;
      case "주":
        startDate = focusDate.startOf("week").utc().add(9, "hour");
        endDate = focusDate.endOf("week").utc().add(9, "hour");
        break;
      case "일":
        startDate = focusDate.startOf("day").utc().add(9, "hour");
        endDate = focusDate.endOf("day").utc().add(9, "hour");
        break;
    }

    setQuery({
      startDate: startDate?.format("YYYY-MM-DDTHH:mm:ss.SSS"),
      endDate: endDate?.format("YYYY-MM-DDTHH:mm:ss.SSS"),
    });

    router.replace({ query });
    queryClient.invalidateQueries({ queryKey: scheduleKey.lists() });
  }, [calendarType, focusDate]);

  const data = useQueries({
    queries: selectedCrewIdList.map((crewId) => {
      const filter = {
        crewId: crewId,
        startDate: query.startDate,
        endDate: query.endDate,
      };
      return {
        queryKey: scheduleKey.list(filter),
        queryFn: () => getCrewSchedules(crewId, query.startDate, query.endDate),
      };
    }),
  });

  return (
    <>
      <MetaData title="캘린더 | 티키타" />
      <Header />
      <div className={cn("container")}>
        <CalendarSideBar setSelectedCrewIdList={setSelectedCrewIdList} />

        <main>
          <CalendarHeader calendarType={calendarType} setCalendarType={setCalendarType} />
          {calendarType === "월" && <MonthlyCalendar scheduleData={data} />}
          {calendarType === "주" && <WeeklyCalendar scheduleData={data} />}
          {calendarType === "일" && <DailyCalendar scheduleData={data} />}
        </main>
      </div>
    </>
  );
}

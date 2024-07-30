import { GetServerSidePropsContext } from "next";
import { ReactElement } from "react";

import classNames from "classnames/bind";

import ProfileEditForm from "./components/ProfileEditForm";
import VoteNotification from "./components/VoteNotification";
import { instance, setContext } from "@/apis/axios";
import Layout from "@/components/Layout";
import MetaData from "@/components/MetaData";
import EmptyNotification from "@/components/Notification/EmptyNotification";
import TitleBox from "@/components/TitleBox";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

import { VoteNotificationType } from "@/types/type";

import styles from "./MyPage.module.scss";

const cn = classNames.bind(styles);

interface MyPageProps {
  voteNotifications: VoteNotificationType[];
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  setContext(context);

  const res = await instance.get("/vote");
  const voteNotifications = res.data.voteNotificationResponseList;

  return {
    props: {
      voteNotifications,
    },
  };
};

export default function MyPage({ voteNotifications }: MyPageProps) {
  const { data: userInfo } = useGetUserInfo();

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <MetaData title="마이페이지 | 티키타" />

      <div className={cn("container")}>
        <section className={cn("profile-container")}>
          <h2 className={cn("title")}>
            <TitleBox title="내 정보" />
          </h2>
          <div className={cn("profile-edit")}>
            <ProfileEditForm userInfo={userInfo} />
          </div>
        </section>

        <section className={cn("vote-notifications-container")}>
          <h2 className={cn("title")}>
            <TitleBox title="일정 조율" />
          </h2>
          <div className={cn("vote-notifications")}>
            {voteNotifications.length > 0 ? (
              voteNotifications.map((notification) => (
                <VoteNotification key={notification.voteId} notification={notification} />
              ))
            ) : (
              <EmptyNotification title="조율 중인 일정이 없어요" />
            )}
          </div>
        </section>
      </div>
    </>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

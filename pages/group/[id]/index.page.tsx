import { ReactElement } from "react";

import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import classNames from "classnames/bind";

import ActionButton from "./components/ActionButton";
import GroupForm from "./components/GroupForm";
import InviteForm from "./components/InviteForm";
import MemberList from "./components/MemberList";
import { getGroupInfo, getUserInfo } from "@/apis/apis";
import { setContext } from "@/apis/axios";
import Layout from "@/components/Layout";
import MetaData from "@/components/MetaData";
import { groupKey, userInfoKey } from "@/constants/queryKey";
import { useGetGroupInfo } from "@/hooks/useGetGroupInfo";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

import styles from "./Group.module.scss";

const cn = classNames.bind(styles);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  setContext(context);
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({ queryKey: userInfoKey.info(), queryFn: getUserInfo });
    await queryClient.prefetchQuery({
      queryKey: groupKey.detail(Number(context.query.id)),
      queryFn: () => getGroupInfo(Number(context.query.id)),
      staleTime: 0,
      gcTime: 0,
    });

    return {
      props: { dehydrateState: dehydrate(queryClient) },
    };
  } catch (error) {
    return {
      props: { dehydrateState: null },
    };
  }
};

export default function GroupDetail() {
  const { query } = useRouter();
  const { data: groupInfo } = useGetGroupInfo(Number(query.id));
  const { data: userInfo } = useGetUserInfo();

  const isCurrentUserLeader = userInfo?.accountId === groupInfo?.crewMembers[0].accountId;

  if (!groupInfo || !userInfo) {
    // 추후 로딩 처리로 변경
    return null;
  }

  return (
    <>
      <MetaData title={`${groupInfo.crewName} | 티키타`} />
      <section className={cn("content")}>
        <MemberList
          isCurrentUserLeader={isCurrentUserLeader}
          currentUserId={userInfo.accountId}
          memberList={groupInfo.crewMembers}
        />
        <InviteForm inviteeList={groupInfo.waitingMembers} />
        <div className={cn("box")}>
          <GroupForm groupInfo={groupInfo} isCurrentUserLeader={isCurrentUserLeader} />
          <ActionButton isCurrentUserLeader={isCurrentUserLeader} />
        </div>
      </section>
    </>
  );
}

GroupDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

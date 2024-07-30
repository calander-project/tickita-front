import { GetServerSidePropsContext } from "next";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import Detail from "./components/Detail";
import Guide from "./components/Guide/Guide";
import Participant from "./components/Participant";
import Vote from "./components/Vote";
import { getUserInfo, getVoteInfo } from "@/apis/apis";
import { setContext } from "@/apis/axios";
import Header from "@/components/Header";
import MetaData from "@/components/MetaData";
import { userInfoKey, voteKey } from "@/constants/queryKey";

import { UserInfoType, VoteInfoType } from "@/types/type";

import styles from "./VotePage.module.scss";

const cn = classNames.bind(styles);

export interface VotePageProps {
  voteInfo: VoteInfoType;
  isCreator: boolean;
  isVote: boolean; // 투표 여부
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  setContext(context);
  const { id, crewId } = context.query;
  const voteId = id as string;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({ queryKey: userInfoKey.info(), queryFn: getUserInfo });
    await queryClient.prefetchQuery({
      queryKey: voteKey.detail(voteId),
      queryFn: () => getVoteInfo(crewId as string, voteId),
    });

    const voteInfo = queryClient.getQueryData(voteKey.detail(voteId)) as VoteInfoType;
    const userInfo = queryClient.getQueryData(userInfoKey.info()) as UserInfoType;
    const isCreator = voteInfo.creatorId === userInfo.accountId;
    const isVote =
      voteInfo.voteListResponses.find((vote) => vote.accountId === userInfo.accountId)
        ?.voteParticipateType ?? false;

    return {
      props: { dehydrateState: dehydrate(queryClient), voteInfo, isCreator, isVote },
    };
  } catch (error) {
    return {
      props: { dehydrateState: null },
    };
  }
};

function VotePage({ voteInfo, isCreator, isVote }: VotePageProps) {
  return (
    <>
      <MetaData title={`${voteInfo.title} 투표 페이지 | 티키타`} />
      <Header />
      <main className={cn("container")}>
        <div className={cn("box")}>
          <section className={cn("section")}>
            <Detail voteInfo={voteInfo} />
            <Guide isCreator={isCreator} />
          </section>
          <section className={cn("section")}>
            <Participant participantList={voteInfo.voteListResponses} />
            <Vote voteInfo={voteInfo} isCreator={isCreator} isVote={isVote} />
          </section>
        </div>
      </main>
    </>
  );
}

export default VotePage;

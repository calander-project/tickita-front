import { InviteDataType } from "@/pages/group/[id]/components/InviteForm";

import {
  ProfileSetupType,
  CreateGroupDataType,
  GroupType,
  UserInfoType,
  GroupInfoType,
  CancelInviteType,
  AcceptInviteType,
  NotificationDataType,
  CheckNotificationType,
  SchedulePostDataType,
  UpcomingSchedule,
  CrewSchedulesType,
  ScheduleDetailType,
  DeleteScheduleResponseType,
  VoteDataType,
  VoteInfoType,
  VotePayloadType,
} from "@/types/type";

import { imageRequestInstance, instance } from "./axios";

export const postProfileSetup = async (data: ProfileSetupType) => {
  const res = await instance.post("/account-info", data);
  return res.data;
};

export const createGroup = async (data: CreateGroupDataType): Promise<GroupType> => {
  const response = await instance.post("/crew", data);
  return response.data;
};

export const getGroupList = async (): Promise<Omit<GroupType[], "accountId">> => {
  const response = await instance.get("/crew/all-info");
  return response.data.crewAllInfos;
};

export const getUserInfo = async (): Promise<UserInfoType> => {
  const response = await instance.get("/account-info/all");
  return response.data;
};

export const postProfileImageUrl = async (data: FormData) => {
  const res = await imageRequestInstance.post("/account-info/img", data);
  return res.data;
};

export const inviteGroupMember = async (data: InviteDataType) => {
  const res = await instance.post(`/mail/send/${data.crewId}`, { email: data.email });
  return res.data;
};

export const getGroupInfo = async (crewId: number): Promise<GroupInfoType> => {
  const res = await instance.get(`/crew/${crewId}`);
  return res.data;
};

export const editGroupInfo = async (crewId: number, data: CreateGroupDataType) => {
  const res = await instance.put(`/crew/info/${crewId}`, data);
  return res.data;
};

export const deleteGroup = async (crewId: number) => {
  const res = await instance.delete(`/crew/${crewId}`);
  return res.data;
};

export const exitGroup = async (crewId: number) => {
  const res = await instance.delete(`/crew/leave/${crewId}`);
  return res.data;
};

export const changeLeader = async (crewId: number, memberId: number) => {
  const res = await instance.put(`/crew/delegate-owner/${crewId}?memberId=${memberId}`);
  return res.data;
};

export const exportMember = async (crewId: number, memberId: number) => {
  const res = await instance.put(`/crew/remove-member/${crewId}/${memberId}`);
  return res.data;
};

export const putUserInfo = async (data: ProfileSetupType): Promise<UserInfoType> => {
  const res = await instance.put(`/account-info/${data.accountId}`, data);
  return res.data;
};

export const getAllNotification = async (): Promise<NotificationDataType> => {
  const res = await instance.get("/notification");
  return res.data;
};

export const cancelInvite = async (data: CancelInviteType) => {
  const { crewId, accountId } = data;

  await instance.delete(`notification?crewId=${crewId}&accountId=${accountId}&crewAccept=WAIT`);
};

export const acceptInvite = async (data: AcceptInviteType) => {
  const res = await instance.post(`/notification`, data);
  return res.data;
};

export const getDisableTime = async (participantId: number[], selectedDates: string[]) => {
  const params = new URLSearchParams();

  participantId.forEach((id) => {
    params.append("participantId", String(id));
  });

  selectedDates.forEach((date) => {
    params.append("selectedDates", date);
  });

  const res = await instance.get("/vote/participant", { params });
  return res.data;
};

export const postVote = async (data: VoteDataType) => {
  const res = await instance.post("/vote", data);
  return res.data;
};

export const checkNotification = async (data: CheckNotificationType) => {
  const { notificationId, alarmType } = data;

  const res = await instance.put(`/notification/${notificationId}`, { isChecked: true, alarmType });
  return res.data;
};

export const deleteNotification = async (notificationId: number) => {
  const res = await instance.delete(`/notification/${notificationId}`);
};

export const createSchedule = async (data: SchedulePostDataType) => {
  const res = await instance.post(`/schedule`, data);
  return res.data;
};

export const getUpcomingSchedule = async (): Promise<UpcomingSchedule[]> => {
  const res = await instance.get("/dashboard/upcoming-events");
  return res.data;
};

export const getCrewSchedules = async (
  crewId: number,
  startDate: string,
  endDate: string,
): Promise<CrewSchedulesType> => {
  const res = await instance.get(`/schedule/filter/${crewId}`, {
    params: {
      startDate,
      endDate,
    },
  });
  return res.data;
};

export const deleteAccountInfo = async () => {
  const res = await instance.delete("/account-info", {});
  return res.data;
};

export const getScheduleDetail = async (scheduleId: number): Promise<ScheduleDetailType> => {
  const res = await instance.get(`/schedule/${scheduleId}`);
  return res.data;
};

export const deleteSchedule = async (scheduleId: number): Promise<DeleteScheduleResponseType> => {
  const res = await instance.delete(`/schedule/${scheduleId}`);
  return res.data;
};

export const participantScheduleCheck = async (
  participantIdQuery: string,
  selectedDatesQuery: string,
) => {
  const res = await instance.get(`/vote/participant?${participantIdQuery}&${selectedDatesQuery}`);
  return res.data;
};

export const createVote = async (data: VoteDataType) => {
  const res = await instance.post("/vote", data);
  return res.data;
};

export const getVoteInfo = async (crewId: string, voteSubjectId: string): Promise<VoteInfoType> => {
  const res = await instance.get(`/vote/${crewId}/${voteSubjectId}`);
  return res.data;
};

export const submitVote = async (voteId: string, data: VotePayloadType) => {
  const res = await instance.post(`/vote/${voteId}}`, data);
  return res.data;
};

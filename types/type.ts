export type GroupColorType =
  | "#FF7940" // orange500
  | "#FF3333" // red500
  | "#D688EA" // purple400
  | "#3360FF" // blue500
  | "#21D53E" // green500
  | "#33DAFF" // sky500
  | "#F380B7" // pink400
  | "#FFB723" // yellow500
  | "#32ECB4" // emelard500
  | "#4F4F4F"; // gray800

export type CookieNameType = "ACCESS_TOKEN" | "REFRESH_TOKEN";

export interface UserInfoType {
  accountId: number;
  nickName: string;
  email: string;
  image: string | null;
  phoneNumber: string | null;
}

export interface ProfileSetupType {
  accountId: number;
  nickName: string;
  phoneNumber: string | null;
  imgUrl: string | null;
}

export interface CreateGroupDataType {
  crewName: string;
  labelColor: GroupColorType;
}

export interface GroupType {
  accountId: number;
  crewName: string;
  labelColor: GroupColorType;
  crewId: number;
}

export type CalendarType = "월" | "주" | "일";

export interface GroupMemberInfoType {
  role: string;
  accountId: number;
  nickName: string;
  email: string;
  image: string | null;
}

export interface GroupInfoType {
  crewId: number;
  crewName: string;
  labelColor: GroupColorType;
  crewMembers: GroupMemberInfoType[];
  waitingMembers: InviteeType[];
}

export interface ParticipantType {
  accountId: number;
  nickName: string;
}

export interface SchedulePostDataType {
  title: string;
  startDateTime: string;
  endDateTime: string;
  location?: string;
  description?: string;
  crewId: number;
  participants?: ParticipantType[];
}

export interface InviteeType {
  notificationId: number;
  accountId: number;
  nickName: string;
  email: string;
}

export interface CancelInviteType {
  crewId: number;
  accountId: number;
}

export interface AcceptInviteType {
  crewId: number;
  notificationId: number;
  inviteType: "ACCEPT";
}

export interface VoteNotificationType {
  notificationId: number;
  notificationType: string;
  crewId: number;
  accountId: number;
  crewName: string;
  localDateTime: string;
  isChecked: boolean;
  voteId: number;
  voteTitle: string;
  voteParticipateType: boolean;
}

type NotificationType = "INVITE" | "SCHEDULE_INFO" | "UPDATE" | "EXCLUDE" | "REQUEST";

type AlarmType = "CREW" | "SCHEDULE";

export interface NotificationInfoType {
  notificationId: number;
  notificationType: NotificationType;
  crewId: number;
  labelColor: GroupColorType;
  crewName: string;
  scheduleInfo?: {
    scheduleId: number;
    title: string;
  };
  localDateTime: string;
  isChecked: boolean;
  content: string;
  alarmType: AlarmType;
}

export interface NotificationDataType {
  count: number;
  notificationInfo: NotificationInfoType[];
}

export interface CheckNotificationType {
  notificationId: number;
  alarmType: AlarmType;
}

export interface UpcomingSchedule {
  scheduleId: number;
  title: string;
  startDateTime: string;
  remainTime: string;
  crewInfo: {
    crewId: number;
    crewName: string;
    labelColor: GroupColorType;
  };
}

export interface ScheduleFilterType {
  crewId: number;
  startDate: string;
  endDate: string;
}

export type ToastType = "success" | "error" | "warning" | "info" | "pending";

export interface CrewInfo {
  crewId: number;
  crewName: string;
  labelColor: GroupColorType;
}

export interface Participant {
  accountId: number;
  nickName: string;
}

export interface ScheduleDetailType {
  scheduleId: number;
  title: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  description: string;
  crewInfo: CrewInfo;
  participants: Participant[];
  coordinate: boolean;
}

export interface CrewSchedulesType extends Array<ScheduleDetailType> {}

export interface DeleteScheduleResponseType {
  scheduleId: number;
  message: string;
}

export interface VoteDate {
  voteDate: string;
  voteStartTime: string;
  voteEndTime: string;
}

export interface VoteDataType {
  crewId: number;
  title: string;
  content: string;
  place: string;
  voteDateLists: VoteDate[];
  endDate: string;
  endTime: string;
  accountIds: number[];
}

export interface CoordinationScheduleDefaultInformationType {
  crewId: number;
  title: string;
  content: string;
  place: string;
  accountIds: number[];
}

export interface CoordinationScheduleDtoType extends CoordinationScheduleDefaultInformationType {
  voteDateLists: VoteDate[];
  endTime: string;
  endDate: string;
}

export interface StepViewType {
  maxStep: number;
  currentStep: number;
}

export interface GroupLisType {
  groupColor: GroupColorType;
  title: string;
}

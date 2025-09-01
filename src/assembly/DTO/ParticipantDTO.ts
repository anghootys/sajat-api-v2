export enum CandidateStatus {
  NO_CANDIDATE = 99,
  BOARD_CANDIDATE = 98,
  INSPECTOR_CANDIDATE = 97,
}

export enum AssemblyPost {
  NORMAL_PARTICIPANT,
  CHAIRNAM,
  VICE_CHAIRMAN,
  SECRETARY,
  MODERATOR,
}

export enum ParticipantStatus {
  NOT_ATTENDED = 0,
  ATTENDED = 1,
}

export interface ParticipantDTO {
  Id: string;
  ProcessID: string;
  MemberID: number;
  UserID: string;
  IntroLetterNum: string;
  IntroLetterDate: string;
  CandidateStatus: CandidateStatus;
  AssemblyPost?: AssemblyPost;
  OnlineVoter?: unknown;
  Status: ParticipantStatus;
  PostBdID?: number;
  VoteCount?: number;
}

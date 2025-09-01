export enum VoteType {
  MINUTES_ELECTION = 99,
  BOARD_ELECTION = 98,
  INSPECTOR_ELECTION = 97,
}

export interface ElectionVotesDTO {
  Id: string;
  ElectionProcessId: string;
  HashedVoterId: string;
  VoteType: VoteType;
  VoteDateTime: string;
  VoteDate: string;
  Result: string;
}

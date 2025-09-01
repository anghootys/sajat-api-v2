import { Injectable } from '@nestjs/common';
import { SajatDataSourceService } from '../../shared/data_source/sajat-data-source/sajat-data-source.service';
import * as AssemblyDTO from '../DTO';
import { createHash } from 'crypto';

export const ERR_ELECTION_DATA_NOT_FOUND =
  'No entity found with provided electionID.';

@Injectable()
export class ElectionService {
  constructor(private readonly sajatDataSource: SajatDataSourceService) {}

  public async getElectionVotesCount(
    electionID: string,
  ): Promise<AssemblyDTO.VoteCountDTO> {
    const electionDataCollection = await this.sajatDataSource.query<
      AssemblyDTO.ElectionDataDTO[]
    >(
      `SELECT * FROM [SajetBaseDB2].[dbo].[APMElectionProcess] WHERE [Id] = '${electionID}'`,
    );

    if (electionDataCollection.length == 0) {
      throw new Error(ERR_ELECTION_DATA_NOT_FOUND);
    }

    const electionData = electionDataCollection.find(
      (x) => x.Id.toLowerCase() == electionID.toLowerCase(),
    );
    if (!electionData) {
      throw new Error(ERR_ELECTION_DATA_NOT_FOUND);
    }

    const participants = await this.sajatDataSource.query<
      AssemblyDTO.ParticipantDTO[]
    >(
      `SELECT * FROM [SajetBaseDB2].[dbo].[APMParticipants] WHERE [ProcessID] = '${electionData.AssemblyProcessID.toUpperCase()}'`,
    );

    const electionVotes = await this.sajatDataSource.query<
      AssemblyDTO.ElectionVotesDTO[]
    >(
      `SELECT * FROM [SajetBaseDB2].[dbo].[APMElectionVote] WHERE [ElectionProcessId] = '${electionID}'`,
    );

    let totalParticipantVotes = 0;

    for (const participant of participants) {
      const participantHashes = [
        AssemblyDTO.VoteType.BOARD_ELECTION,
        AssemblyDTO.VoteType.INSPECTOR_ELECTION,
        AssemblyDTO.VoteType.MINUTES_ELECTION,
      ].map((x) =>
        createHash('sha256')
          .update(`${participant.Id.toLowerCase()}-${x}`)
          .digest('hex'),
      );

      if (
        electionVotes
          .map((x) => x.HashedVoterId)
          .some((x) => participantHashes.includes(x))
      ) {
        totalParticipantVotes++;
      }
    }

    return {
      totalVotes: totalParticipantVotes,
      boardElectionVotesCount: electionVotes.filter(
        (x) => x.VoteType === AssemblyDTO.VoteType.BOARD_ELECTION,
      ).length,
      inspectorElectionVotesCount: electionVotes.filter(
        (x) => x.VoteType === AssemblyDTO.VoteType.INSPECTOR_ELECTION,
      ).length,
      minutesElectionVotesCount: electionVotes.filter(
        (x) => x.VoteType === AssemblyDTO.VoteType.MINUTES_ELECTION,
      ).length,
    };
  }
}

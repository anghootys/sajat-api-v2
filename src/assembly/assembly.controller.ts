import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { CacheTTL } from '@nestjs/common/cache';
import { ElectionService } from './election/election.service';
import express from 'express';

@Controller('assembly')
export class AssemblyController {
  constructor(private readonly electionService: ElectionService) {}

  @Get('votes-count/:electionID')
  @CacheTTL(0)
  async getElectionResult(
    @Param('electionID') electionID: string,
    @Res() res: express.Response,
  ) {
    try {
      res.send(await this.electionService.getElectionVotesCount(electionID));
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        message: e.message,
      });
    }
  }
}

import { Module } from '@nestjs/common';
import { LogQueryService } from './log-query.service';
import { LogQueryController } from './log-query.controller';

@Module({
  controllers: [LogQueryController],
  providers: [LogQueryService],
})
export class LogQueryModule {}

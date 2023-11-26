import { Module } from '@nestjs/common';
import { LogIngestorController } from './log-ingestor.controller';
import { LogIngestorService } from './log-ingestor.service';
import { LogIngestorGateway } from './log-ingestor.gateway';

@Module({
  controllers: [LogIngestorController],
  providers: [LogIngestorService, LogIngestorGateway],
})
export class LogIngestorModule {}

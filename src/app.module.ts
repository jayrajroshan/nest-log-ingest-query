import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogIngestorModule } from './log-ingestor/log-ingestor.module';
import { LogQueryModule } from './log-query/log-query.module';

@Module({
  imports: [LogIngestorModule, LogQueryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

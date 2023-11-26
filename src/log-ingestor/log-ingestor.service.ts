import { Injectable } from '@nestjs/common';
import { Sender } from '@questdb/nodejs-client';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogIngestorService {
  private sender: Sender;
  private batch: CreateLogDto[] = [];
  private readonly batchSize = 50000;
  private readonly flushInterval = 10000;
  // private packetCount = 0;
  private flushing = false;


  constructor() {
    this.sender = new Sender({ bufferSize: 4096 });
    this.connectSender();
    setInterval(() => this.flushBatch(), this.flushInterval);
  }

  private async connectSender() {
    try {
      await this.sender.connect({ port: 9009, host: 'localhost' });
    } catch (error) {
      console.error('Error connecting to QuestDB:', error);
      throw error;
    }
  }

  public async addLogToBatch(logData: CreateLogDto): Promise<void> {
    this.batch.push(logData);
    if (this.batch.length >= this.batchSize && !this.flushing) {
      await this.flushBatch();
    }
  }


  private async flushBatch(): Promise<void> {
    if (this.flushing) {
      return;
    }

    if (this.batch.length === 0) {
      return;
    }

    this.flushing = true;

    const currentBatch = [...this.batch];
    this.batch = [];

    for (const logData of currentBatch) {
      const timestamp = Date.parse(logData.timestamp);

      this.sender.table('logs');
      this.sender.symbol('level', logData.level);
      this.sender.symbol('resourceId', logData.resourceId);
      if (logData.metadata && logData.metadata.parentResourceId) {
        this.sender.symbol('parentResourceId', logData.metadata.parentResourceId);
      }

      this.sender
        .timestampColumn('timestamp', timestamp, 'ms')
        .stringColumn('message', logData.message)
        .stringColumn('traceId', logData.traceId)
        .stringColumn('spanId', logData.spanId)
        .stringColumn('commit', logData.commit)
        .at(timestamp, 'ms');
    }

    await this.sender.flush();

    // this.packetCount += currentBatch.length;
    // console.log(`Total packets sent: ${this.packetCount}`);

    this.flushing = false;
  }


  public async closeSender(): Promise<void> {
    await this.sender.close();
  }
}

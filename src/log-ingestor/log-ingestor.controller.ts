import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { LogIngestorService } from './log-ingestor.service';
import { CreateLogDto } from './dto/create-log.dto';

@Controller('logs')
export class LogIngestorController {
  constructor(private readonly logIngestorService: LogIngestorService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async ingestLog(@Body() createLogDto: CreateLogDto) {
    await this.logIngestorService.addLogToBatch(createLogDto);
  }
}

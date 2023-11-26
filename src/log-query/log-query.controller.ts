import { Controller, Get, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { LogQueryService } from './log-query.service';

@Controller('query')
export class LogQueryController {
  constructor(private readonly logQueryService: LogQueryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async queryLogs(@Query() queryParams: any) {
    const results = await this.logQueryService.query(queryParams);
    // console.log(results)
    return results;
  }
}

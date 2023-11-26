export class CreateLogDto {
    level: string;
    message: string;
    resourceId: string;
    timestamp: string;
    traceId: string;
    spanId: string;
    commit: string;
    metadata?: {
      parentResourceId: string;
    };
  }
  
import { Injectable, Query } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class LogQueryService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: 'localhost',
      port: 8812,
      database: 'qdb',
      user: 'admin',
      password: 'quest',
    });
  }

  async query(params: any): Promise<any[]> {
    let baseQuery = 'SELECT * FROM logs';
    const queryParams = [];
    const conditions = [];

    if (params.level) {
      conditions.push(`level = $${queryParams.length + 1}`);
      queryParams.push(params.level);
    }
    if (params.message) {
      conditions.push(`message LIKE $${queryParams.length + 1}`);
      queryParams.push(`%${params.message}%`);
    }
    if (params.resourceId) {
      conditions.push(`resourceId = $${queryParams.length + 1}`);
      queryParams.push(params.resourceId);
    }
    if (params.startTime && params.endTime) {
      conditions.push(`timestamp BETWEEN $${queryParams.length + 1} AND $${queryParams.length + 2}`);
      queryParams.push(params.startTime, params.endTime);
    } else if (params.startTime) {
      conditions.push(`timestamp >= $${queryParams.length + 1}`);
      queryParams.push(params.startTime);
    } else if (params.endTime) {
      conditions.push(`timestamp <= $${queryParams.length + 1}`);
      queryParams.push(params.endTime);
    }
    if (params.traceId) {
      conditions.push(`traceId = $${queryParams.length + 1}`);
      queryParams.push(params.traceId);
    }
    if (params.spanId) {
      conditions.push(`spanId = $${queryParams.length + 1}`);
      queryParams.push(params.spanId);
    }
    if (params.commit) {
      conditions.push(`commit = $${queryParams.length + 1}`);
      queryParams.push(params.commit);
    }
    if (params.metadata) {
      conditions.push(`metadata ->> 'parentResourceId' = $${queryParams.length + 1}`);
      queryParams.push(params.metadata.parentResourceId);
    }

    if (conditions.length) {
      baseQuery += ` WHERE ${conditions.join(' AND ')}`;
    }

    console.log("Base Query : "+baseQuery)
    console.log("Query Params : "+queryParams)

    const result = await this.pool.query(baseQuery, queryParams);
    return result.rows;
  }
}

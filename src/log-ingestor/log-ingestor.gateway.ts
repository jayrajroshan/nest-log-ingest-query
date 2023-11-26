import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LogIngestorService } from './log-ingestor.service';
import { CreateLogDto } from './dto/create-log.dto';

@WebSocketGateway()
export class LogIngestorGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private logIngestorService: LogIngestorService) {}

  afterInit(server: Server) {
  }

  @SubscribeMessage('ingestLog')
  handleLogIngest(client: Socket, logData: CreateLogDto): void {
    this.logIngestorService.addLogToBatch(logData);
  }
}

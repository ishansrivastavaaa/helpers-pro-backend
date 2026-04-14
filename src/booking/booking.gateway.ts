import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class BookingGateway {
  @WebSocketServer()
  server: Server;

  sendUpdate(event: string, data: any) {
    this.server.emit(event, data);
  }
}

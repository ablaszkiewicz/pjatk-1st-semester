import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { BolidMessage } from 'src/bolid/bolid.service';

@Injectable()
export class LoggerService {
  @SqsMessageHandler('bolid--logger', false)
  public async handleLoggerMessage(message: Message) {
    const parsed = JSON.parse(message.Body) as BolidMessage;

    console.log(
      `[LOGGER]: Temperature: ${parsed.temperature}, Pressure: ${parsed.pressure}, Date: ${parsed.date}`,
    );
  }
}

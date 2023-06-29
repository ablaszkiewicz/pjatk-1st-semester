import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { BolidMessage } from 'src/bolid/bolid.service';

@Injectable()
export class LoggerService {
  @SqsMessageHandler('topic--logger', false)
  public async handleLoggerMessage(message: Message) {
    const parsedBody = JSON.parse(message.Body);
    const parsedMessage = JSON.parse(parsedBody.Message) as BolidMessage;

    console.log(
      `[LOGGER]: Temperature: ${parsedMessage.temperature}, Pressure: ${parsedMessage.pressure}, Date: ${parsedMessage.date}`,
    );
  }
}

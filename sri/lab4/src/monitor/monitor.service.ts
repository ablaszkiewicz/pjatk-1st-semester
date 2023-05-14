import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { BolidMessage } from 'src/bolid/bolid.service';

const MIN = 15;
const MAX = 85;

@Injectable()
export class MonitorService {
  @SqsMessageHandler('bolid--monitor', false)
  public async handleLoggerMessage(message: Message) {
    const parsed = JSON.parse(message.Body) as BolidMessage;

    console.log(`[MONITOR]:`);

    console.log(
      `- temperature check (between ${MIN} and ${MAX}): ${
        parsed.temperature >= MIN && parsed.temperature <= MAX ? 'OK' : 'NOT OK'
      }`,
    );

    console.log(
      `- pressure check (between ${MIN} and ${MAX}): ${
        parsed.pressure >= MIN && parsed.pressure <= MAX ? 'OK' : 'NOT OK'
      }`,
    );
  }
}

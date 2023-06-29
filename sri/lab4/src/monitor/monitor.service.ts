import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { BolidMessage } from 'src/bolid/bolid.service';

const MIN = 15;
const MAX = 85;

@Injectable()
export class MonitorService {
  private snsClient = new SNSClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'test',
      secretAccessKey: 'test',
    },
    endpoint: `${process.env.LOCALSTACK_ENDPOINT}`,
  });

  @SqsMessageHandler('topic--monitor', false)
  public async handleLoggerMessage(message: Message) {
    const parsedBody = JSON.parse(message.Body);
    const parsedMessage = JSON.parse(parsedBody.Message) as BolidMessage;

    console.log(`[MONITOR]:`);

    console.log(
      `- temperature check (between ${MIN} and ${MAX}): ${
        parsedMessage.temperature >= MIN && parsedMessage.temperature <= MAX
          ? 'OK'
          : 'NOT OK'
      }`,
    );

    console.log(
      `- pressure check (between ${MIN} and ${MAX}): ${
        parsedMessage.pressure >= MIN && parsedMessage.pressure <= MAX
          ? 'OK'
          : 'NOT OK'
      }`,
    );

    if (parsedMessage.temperature > MAX) {
      console.log(
        '[MONITOR]: Exceeded temperature limit. Sending low importance message',
      );

      await this.snsClient.send(
        new PublishCommand({
          Message: JSON.stringify(message),
          TopicArn: `arn:aws:sns:us-east-1:000000000000:failure`,
          MessageAttributes: {
            importance: {
              DataType: 'String',
              StringValue: 'low',
            },
          },
        }),
      );
    }

    if (parsedMessage.pressure > MAX) {
      console.log(
        '[MONITOR]: Exceeded temperature limit. Sending high importance message',
      );

      await this.snsClient.send(
        new PublishCommand({
          Message: JSON.stringify(message),
          TopicArn: `arn:aws:sns:us-east-1:000000000000:failure`,
          MessageAttributes: {
            importance: {
              DataType: 'String',
              StringValue: 'high',
            },
          },
        }),
      );
    }
  }
}

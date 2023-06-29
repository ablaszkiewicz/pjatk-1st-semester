import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SqsMessageHandler, SqsService } from '@ssut/nestjs-sqs';
import { v4 } from 'uuid';

export interface BolidMessage {
  temperature: number;
  pressure: number;
  date: string;
}

export interface BolidRequest {
  approved?: boolean;
}

@Injectable()
export class BolidService {
  private snsClient = new SNSClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'test',
      secretAccessKey: 'test',
    },
    endpoint: `${process.env.LOCALSTACK_ENDPOINT}`,
  });

  constructor(private readonly sqsService: SqsService) {}

  @Cron(CronExpression.EVERY_SECOND)
  async report() {
    const message: BolidMessage = {
      temperature: Math.floor(Math.random() * 100),
      pressure: Math.floor(Math.random() * 100),
      date: new Date().toISOString(),
    };

    await this.snsClient.send(
      new PublishCommand({
        Message: JSON.stringify(message),
        TopicArn: `arn:aws:sns:us-east-1:000000000000:topic`,
        Subject: 'Bolid message',
      }),
    );
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async ask() {
    const message: BolidRequest = {};

    // await this.sqsService.send('bolid--master', {
    //   body: JSON.stringify(message),
    //   id: v4(),
    // });
  }

  @SqsMessageHandler('master--bolid', false)
  public async receiveFromMaster(message: Message) {
    const parsed = JSON.parse(message.Body) as BolidRequest;

    console.log(
      `[BOLID]: Received approval from master. Approval status: ${parsed.approved}`,
    );
  }

  @SqsMessageHandler('failure--bolid', false)
  public async receiveFromFailureTopic(message: Message) {
    const parsedBody = JSON.parse(message.Body);

    console.log(
      `[BOLID]: Received message from failure topic with importance ${
        (parsedBody.MessageAttributes.importance as any).Value
      }`,
    );
  }
}

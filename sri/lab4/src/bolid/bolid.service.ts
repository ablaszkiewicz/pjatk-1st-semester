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
  constructor(private readonly sqsService: SqsService) {
    setTimeout(async () => {
      await sqsService.purgeQueue('bolid--topic');
      console.log('Purged queues');
    }, 100);
  }

  @Cron(CronExpression.EVERY_SECOND)
  async report() {
    const message: BolidMessage = {
      temperature: Math.floor(Math.random() * 100),
      pressure: Math.floor(Math.random() * 100),
      date: new Date().toISOString(),
    };

    await this.sqsService.send('bolid--topic', {
      body: JSON.stringify(message),
      id: v4(),
    });
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async ask() {
    const message: BolidRequest = {};

    await this.sqsService.send('bolid--master', {
      body: JSON.stringify(message),
      id: v4(),
    });
  }

  @SqsMessageHandler('master--bolid', false)
  public async receiveFromMaster(message: Message) {
    const parsed = JSON.parse(message.Body) as BolidRequest;

    console.log(
      `[BOLID]: Received approval from master. Approval status: ${parsed.approved}`,
    );
  }
}

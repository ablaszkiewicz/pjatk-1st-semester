import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsMessageHandler, SqsService } from '@ssut/nestjs-sqs';
import { BolidMessage } from 'src/bolid/bolid.service';
import { v4 } from 'uuid';

@Injectable()
export class MasterService {
  constructor(private readonly sqsService: SqsService) {}

  @SqsMessageHandler('bolid--master', false)
  public async handleLoggerMessage(message: Message) {
    //randomly choose true or false
    const result = Math.random() >= 0.5;

    console.log(`[MASTER]: Received request. Approval status: ${result}`);

    await this.sqsService.send('master--bolid', {
      body: JSON.stringify({ approved: result }),
      id: v4(),
    });
  }
}

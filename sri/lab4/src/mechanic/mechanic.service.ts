import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { Message } from '@aws-sdk/client-sqs';

@Injectable()
export class MechanicService {
  @SqsMessageHandler('failure--mechanic', false)
  public async receiveFromFailureTopic(message: Message) {
    const parsedBody = JSON.parse(message.Body);

    console.log(
      `[MECHANIC]: Received message from failure topic with importance ${
        (parsedBody.MessageAttributes.importance as any).Value
      }`,
    );
  }
}

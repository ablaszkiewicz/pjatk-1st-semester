import { Module } from '@nestjs/common';
import { BolidService } from './bolid.service';
import { BolidController } from './bolid.controller';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SQSClient } from '@aws-sdk/client-sqs';
require('dotenv').config();
const sqsClient = new SQSClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test',
  },
  endpoint: `${process.env.LOCALSTACK_ENDPOINT}`,
});

@Module({
  imports: [
    SqsModule.register({
      producers: [
        {
          name: 'bolid--topic',
          queueUrl: `${process.env.LOCALSTACK_ENDPOINT}/000000000000/bolid--topic`,
          region: 'us-east-1',
          sqs: sqsClient,
        },
        {
          name: 'bolid--master',
          queueUrl: `${process.env.LOCALSTACK_ENDPOINT}/000000000000/bolid--master`,
          region: 'us-east-1',
          sqs: sqsClient,
        },
      ],
      consumers: [
        {
          name: 'master--bolid',
          queueUrl: `${process.env.LOCALSTACK_ENDPOINT}/000000000000/master--bolid`,
          region: 'us-east-1',
          sqs: sqsClient,
        },
        {
          name: 'failure--bolid',
          queueUrl: `${process.env.LOCALSTACK_ENDPOINT}/000000000000/failure--bolid`,
          region: 'us-east-1',
          sqs: sqsClient,
        },
      ],
    }),
  ],
  controllers: [BolidController],
  providers: [BolidService],
})
export class BolidModule {}

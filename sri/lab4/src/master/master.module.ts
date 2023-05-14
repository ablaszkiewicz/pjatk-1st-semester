import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
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
      consumers: [
        {
          name: 'bolid--master',
          queueUrl: `${process.env.LOCALSTACK_ENDPOINT}/000000000000/bolid--master`,
          sqs: sqsClient,
        },
      ],
      producers: [
        {
          name: 'master--bolid',
          queueUrl: `${process.env.LOCALSTACK_ENDPOINT}/000000000000/master--bolid`,
          sqs: sqsClient,
        },
      ],
    }),
  ],
  controllers: [MasterController],
  providers: [MasterService],
})
export class MasterModule {}

import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { SQSClient } from '@aws-sdk/client-sqs';
import { SqsModule } from '@ssut/nestjs-sqs';
require('dotenv').config();

const sqsClient = new SQSClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test',
  },
  endpoint: `${process.env.LOCALSTACK_ENDPOINT}`,
});

console.log(process.env.LOCALSTACK_ENDPOINT);

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: 'bolid--monitor',
          queueUrl: `${process.env.LOCALSTACK_ENDPOINT}/000000000000/bolid--monitor`,
          sqs: sqsClient,
        },
      ],
    }),
  ],
  controllers: [MonitorController],
  providers: [MonitorService],
})
export class MonitorModule {}

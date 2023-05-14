import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
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

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: 'bolid--logger',
          queueUrl: `${process.env.LOCALSTACK_ENDPOINT}/000000000000/bolid--logger`,
          sqs: sqsClient,
        },
      ],
    }),
  ],
  controllers: [LoggerController],
  providers: [LoggerService],
})
export class LoggerModule {}

import { Module } from '@nestjs/common';
import { MechanicService } from './mechanic.service';
import { MechanicController } from './mechanic.controller';
import { SQSClient } from '@aws-sdk/client-sqs';
import { SqsModule } from '@ssut/nestjs-sqs/dist/sqs.module';

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
          name: 'monitor--mechanic',
          queueUrl: `${process.env.LOCALSTACK_ENDPOINT}/000000000000/monitor--mechanic`,
          sqs: sqsClient,
        },
      ],
    }),
  ],
  controllers: [MechanicController],
  providers: [MechanicService],
})
export class MechanicModule {}

import { Controller } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}
}

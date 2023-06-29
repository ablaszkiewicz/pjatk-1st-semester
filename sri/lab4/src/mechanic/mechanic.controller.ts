import { Controller } from '@nestjs/common';
import { MechanicService } from './mechanic.service';

@Controller('mechanic')
export class MechanicController {
  constructor(private readonly mechanicService: MechanicService) {}
}

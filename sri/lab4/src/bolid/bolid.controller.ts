import { Controller } from '@nestjs/common';
import { BolidService } from './bolid.service';

@Controller('bolid')
export class BolidController {
  constructor(private readonly bolidService: BolidService) {}
}

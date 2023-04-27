import { Module } from '@nestjs/common';
import { DogsModule } from './dogs/dogs.module';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [DogsModule, OwnersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

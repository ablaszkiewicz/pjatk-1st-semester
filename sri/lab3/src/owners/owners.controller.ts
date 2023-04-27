import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  create(@Body() dto: CreateOwnerDto) {
    return this.ownersService.create(dto);
  }

  @Post(':ownerId/dogs/:dogId/bind')
  bindDog(@Param('ownerId') ownerId: string, @Param('dogId') dogId: string) {
    return this.ownersService.bindDog(ownerId, dogId);
  }

  @Post(':ownerId/dogs/:dogId/unbind')
  unbindDog(@Param('ownerId') ownerId: string, @Param('dogId') dogId: string) {
    return this.ownersService.unbindDog(ownerId, dogId);
  }

  @Get()
  findAll() {
    return this.ownersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOwnerDto) {
    return this.ownersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownersService.remove(id);
  }

  @Get(':id/dogs')
  getDogs(@Param('id') id: string) {
    return this.ownersService.getDogs(id);
  }
}

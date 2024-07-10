import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { LombaService } from './lomba.service';
import { CreateLombaDto } from './dto/create-lomba.dto';
import { UpdateLombaDto } from './dto/update-lomba.dto';

@Controller('lomba')
export class LombaController {
  constructor(private readonly lombaService: LombaService) {}

  @Post()
  create(@Body() createLombaDto: CreateLombaDto) {
    return this.lombaService.create(createLombaDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.lombaService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lombaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLombaDto: UpdateLombaDto) {
    return this.lombaService.update(id, updateLombaDto);
  }

  @Patch(':id/toggle-active')
  toggleIsActive(@Param('id') id: string) {
    return this.lombaService.toggleIsActive(id);
  }
}

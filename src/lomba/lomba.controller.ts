import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LombaService } from './lomba.service';
import { CreateLombaDto } from './dto/create-lomba.dto';
import { UpdateLombaDto } from './dto/update-lomba.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/authorization/roles/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
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

  // Endpoint untuk mengaktifkan/menonaktifkan Lomba
  @Patch(':id/toggle-active')
  @UseGuards(AuthGuard) // Menggunakan AuthGuard untuk memastikan pengguna terautentikasi
  async toggleIsActive(@Param('id') id: string, @Req() request: Request) {
    // Mendapatkan userId dan role dari payload JWT yang disimpan dalam request.user oleh AuthGuard
    const userId = request['user'].id_users;
    const userRole = request['user'].id_role;
    try {
      const lomba = await this.lombaService.toggleIsActive(
        id,
        userId,
        userRole,
      );
      return { message: 'Lomba status toggled successfully', lomba };
    } catch (error) {
      throw error;
    }
  }
}

import { Controller, Get, Post, Body, Request,Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { UserService   }  from './user.service';
import { CreateUserDto }  from './dto/create-user.dto';
import { UpdateUserDto }  from './dto/update-user.dto';
import { IsAuthGuard, IsAdminGuard, IsSameUserOrIsAdminGuard } from 'src/guards/index';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(IsAdminGuard)
  @Post()
  create(@Request()req, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(IsAdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(IsAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Request()req, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Request()req, @Param('id') id: string) {
    return this.userService.remove(id);
  }
}

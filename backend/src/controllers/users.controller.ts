import {
    Controller,
    Get,
    Post,
    UsePipes,
    Body,
    Query,
    Param,
    UseGuards,
    Delete,
    Put,
  } from '@nestjs/common';

import { ValidationPipe } from '../pipes/validation.pipes';
import { UserService } from '../services/user.service';
import { UserInterface } from '../models/user.interface';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
export class UsersController {

  constructor(private service: UserService) {}

  @Get()
  @UseGuards(new AuthGuard())
  list() {
    return this.service.list();
  }

  /*@Post()
  @UseGuards(new AuthGuard())
  create(@Body() body: UserInterface) {
    body.password = 'Formularios2019';
    delete body.id;
    return this.service.create(body);
  }*/

  @Get(':id')
  @UseGuards(new AuthGuard())
  show(@Param('id') id: any) {
    return this.service.show(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: any, @Body() body: Partial<UserInterface>) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroy(@Param('id') id: any) {
    return this.service.delete(id);
  }
}

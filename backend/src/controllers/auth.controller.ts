import {
    Controller,
    Post,
    UsePipes,
    Body,
  } from '@nestjs/common';

import { ValidationPipe } from '../pipes/validation.pipes';
import { UserService } from '../services/user.service';
import { UserInterface } from '../models/user.interface';

@Controller('auth')
export class AuthController {

  constructor(private service: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserInterface) {
    return this.service.login(data);
  }

  @Post('signup')
  create(@Body() body: UserInterface) {
    return this.service.create(body);
  }

}

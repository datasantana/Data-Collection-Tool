import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  Logger,
  UseGuards,
} from '@nestjs/common';

import { ValidationPipe } from '../pipes/validation.pipes';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../utils/user.decorator';
import { FormService } from '../services/form.service';
import { FormInterface } from '../models/form.interface';

@Controller('forms')
export class FormsController {
  private logger = new Logger('FormsController');

  constructor(private service: FormService) {}

  private logData(options: any) {
      if (options.user) {
        this.logger.log('USER ' + JSON.stringify(options.user));
      }
      if (options.body) {
        this.logger.log('BODY ' + JSON.stringify(options.body));
      }
      if (options.id) {
        this.logger.log('ID ' + JSON.stringify(options.id));
      }
  }

  @Get('user/:id')
  @UseGuards(new AuthGuard())
  list(@Param('id') id: any) {
    return this.service.list(id);
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  create(@User('id') user, @Body() body: FormInterface) {
    this.logData({ body });
    delete body.id;
    return this.service.create(user, body);
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  show(@Param('id') id: any) {
    return this.service.show(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: any, @Body() body: Partial<FormInterface>) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroy(@Param('id') id: any) {
    return this.service.delete(id);
  }
}

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

import { DataTypeService } from '../services/data-type.service';
import { ValidationPipe } from '../pipes/validation.pipes';
import { DataTypeInterface } from '../models/data-type.interface';
import { AuthGuard } from '../guards/auth.guard';

@Controller('datatypes')
export class DataTypesController {
  private logger = new Logger('DataTypesController');

  constructor(private service: DataTypeService) {}

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

  @Get()
  @UseGuards(new AuthGuard())
  list() {
    return this.service.list();
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  create(@Body() body: DataTypeInterface) {
    this.logData({ body });
    delete body.id;
    return this.service.create(body);
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  show(@Param('id') id: any) {
    return this.service.show(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: any, @Body() body: Partial<DataTypeInterface>) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroy(@Param('id') id: any) {
    return this.service.delete(id);
  }
}

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
import { FieldService } from '../services/field.service';
import { FieldInterface } from '../models/field.interface';

@Controller('fields')
export class FieldsController {
  private logger = new Logger('FieldsController');

  constructor(private service: FieldService) {}

  @Get()
  @UseGuards(new AuthGuard())
  list() {
    return this.service.list();
  }

  @Get('forms/:formId')
  listWithForms(@Param('formId') form: number) {
    return this.service.listForm(form);
  }

  @Post(':formId/:dataId')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  create(@Param('formId') form: number, @Param('dataId') data: number, @Body() body: FieldInterface) {
    delete body.id;
    return this.service.create(form, data, body);
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  show(@Param('id') id: any) {
    return this.service.show(id);
  }

  @Put(':id/:dataId')
  @UseGuards(new AuthGuard())
  update(@Param('id') id: any, @Param('dataId') data: number, @Body() body: Partial<FieldInterface>) {
    return this.service.update(id, data, body);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroy(@Param('id') id: any) {
    return this.service.delete(id);
  }
}

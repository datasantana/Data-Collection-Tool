import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UsePipes,
  Logger,
  UseGuards,
} from '@nestjs/common';

import { ValidationPipe } from '../pipes/validation.pipes';
import { AuthGuard } from '../guards/auth.guard';
import { SaveDataService } from '../services/save-data.service';

@Controller('savedata')
export class SaveDataController {
  private logger = new Logger('SaveDataController');

  constructor(private service: SaveDataService) { }

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

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  create(@Body() body: any) {
    this.logData({ body });
    return this.service.create(body);
  }

  @Get(':tableName')
  @UseGuards(new AuthGuard())
  show(@Param('tableName') tableName: any) {
    return this.service.show(tableName);
  }

  @Put(':id')
  update(@Param('id') id: any, @Body() body: any) {
    return this.service.update(id, body);
  }
}

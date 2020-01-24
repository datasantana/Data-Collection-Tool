import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataTypesController } from '../controllers/data-types.controller';
import { DataTypeService } from '../services/data-type.service';
import { DataTypeEntity } from '../entities/data-type.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([DataTypeEntity]),
    ],
    controllers: [
        DataTypesController,
    ],
    providers: [
        DataTypeService,
    ],
})
export class DataTypeModule {}

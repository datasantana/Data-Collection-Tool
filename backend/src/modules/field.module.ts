import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FieldEntity } from '../entities/field.entity';
import { FieldService } from '../services/field.service';
import { FieldsController } from '../controllers/field.controller';
import { FormEntity } from '../entities/form.entity';
import { DataTypeEntity } from '../entities/data-type.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([FieldEntity, FormEntity, DataTypeEntity]),
    ],
    controllers: [
        FieldsController,
    ],
    providers: [
        FieldService,
    ],
})
export class FieldModule {}

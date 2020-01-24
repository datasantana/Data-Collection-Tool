import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FormEntity } from '../entities/form.entity';
import { FormService } from '../services/form.service';
import { FormsController } from '../controllers/forms.controller';
import { UserEntity } from '../entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([FormEntity, UserEntity]),
    ],
    controllers: [
        FormsController,
    ],
    providers: [
        FormService,
    ],
})
export class FormModule {}

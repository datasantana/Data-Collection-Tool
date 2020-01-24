import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from '../controllers/users.controller';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { AuthController } from '../controllers/auth.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [
        UsersController,
        AuthController,
    ],
    providers: [
        UserService,
    ],
})
export class UserModule {}

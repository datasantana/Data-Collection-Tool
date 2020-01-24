import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { HttpErrorFilter } from './utils/http-error.filter';
import { LoggingInterceptor } from './utils/logging.interceptor';

import { DataTypeModule } from './modules/data-type.module';
import { UserModule } from './modules/user.module';
import { FormModule } from './modules/form.module';
import { FieldModule } from './modules/field.module';
import { SeveDataModule } from './modules/save-data.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    FormModule,
    FieldModule,
    DataTypeModule,
    SeveDataModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: HttpErrorFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}

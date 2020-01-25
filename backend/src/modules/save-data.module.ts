import { Module } from '@nestjs/common';
import { SaveDataController } from '../controllers/save-data.controller';
import { SaveDataService } from '../services/save-data.service';

@Module({
    controllers: [
        SaveDataController,
    ],
    providers: [
        SaveDataService,
    ],
})
export class SaveDataModule {}

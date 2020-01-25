import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { SaveDataModule } from './../src/modules/save-data.module';
import { SaveDataService } from './../src/services/save-data.service';
import { INestApplication } from '@nestjs/common';

describe('saveDataController (e2e)', () => {
  let app: INestApplication;
  let saveDataService = { findAll: () => ['test'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SaveDataModule],
    })
    .overrideProvider(SaveDataService)
    .useValue(saveDataService)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET savedata/20', () => {
    return request(app.getHttpServer())
      .get('/savedata/20')
      .expect(200)
      .expect({
        data: saveDataService.findAll(),
  });
});
});

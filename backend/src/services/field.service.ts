import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldEntity } from '../entities/field.entity';
import { FieldInterface } from '../models/field.interface';
import { FormEntity } from '../entities/form.entity';
import { DataTypeEntity } from '../entities/data-type.entity';

@Injectable()
export class FieldService {

  constructor(
    @InjectRepository(FieldEntity) private repository: Repository<FieldEntity>,
    @InjectRepository(FormEntity)
    private formRepository: Repository<FormEntity>,
    @InjectRepository(DataTypeEntity)
    private datatypeRepository: Repository<DataTypeEntity>,
  ) {}

  async list() {
    return await this.repository.find({ relations: ['form', 'datatype'] });
  }

  async listForm(formId: number) {
    const form = await this.formRepository.findOne({
      where: { id: formId },
    });
    return await this.repository.find({ relations: ['form', 'datatype'], where: { form } });
  }

  async create(formId: number, datatypeId: number, data: FieldInterface) {
      (await this.repository.findOne({
        where: { columnName: data.columnName },
      })
      );
      return await getManager().transaction(async transactionalEntityManager => {
        const form = await this.formRepository.findOne({
          where: { id: formId },
        });
        const datatype = await this.datatypeRepository.findOne({
          where: { id: datatypeId },
        });
        const itemToCreate = this.repository.create({
          ...data, form, datatype,
        });
        await transactionalEntityManager.save(itemToCreate);
        const query = `ALTER TABLE projects.${form.tableName} ADD COLUMN ${itemToCreate.columnName} ${itemToCreate.datatype.name};`;
        await transactionalEntityManager.query(query);
        return itemToCreate;
      });
  }

  async show(id: any) {
    const itemToDetails = await this.repository.findOne({ where: { id } });
    if (!itemToDetails) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return itemToDetails;
  }

  async update(id: any, datatypeId: number, data: Partial<FieldInterface>) {
    let itemToUpdate = await this.repository.findOne({ where: { id },  relations: ['form', 'datatype'] });
    if (!itemToUpdate) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await getManager().transaction(async transactionalEntityManager => {
        const datatype = await this.datatypeRepository.findOne({
            where: { id: datatypeId },
        });
        Logger.log(JSON.stringify(data));
        itemToUpdate.datatype = datatype;
        await transactionalEntityManager.save(itemToUpdate);

        if (itemToUpdate.columnName !== data.columnName) {
            const query = `ALTER TABLE projects.${itemToUpdate.form.tableName} RENAME COLUMN ${itemToUpdate.columnName} TO ${data.columnName} ;`;
            await transactionalEntityManager.query(query);
            await transactionalEntityManager.query(query);
        }
        if (itemToUpdate.datatype.id !== data) {
            const query = `ALTER TABLE projects.${itemToUpdate.form.tableName} ALTER COLUMN ${data.columnName} TYPE ${datatype.name} USING ${data.columnName}::${datatype.name};`;
            await transactionalEntityManager.query(query);
            await transactionalEntityManager.query(query);
        }

        itemToUpdate = await this.repository.findOne({ id });
    });
    return itemToUpdate;
  }

  async delete(id: any) {
    const itemToDelete = await this.repository.findOne({ where: { id }, relations: ['form'] });
    if (!itemToDelete) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.delete(FieldEntity, { id });
      const query = `ALTER TABLE projects.${itemToDelete.form.tableName} DROP COLUMN ${itemToDelete.columnName};`;
      await transactionalEntityManager.query(query);
    });
    return { status: false };
  }
}

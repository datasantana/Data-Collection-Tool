import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { FormEntity } from '../entities/form.entity';
import { FormInterface } from '../models/form.interface';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class FormService {

    constructor(
        @InjectRepository(FormEntity) private repository: Repository<FormEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        ) {}

    async list(userId: any) {
        const list = await this.repository.find({relations: ['user', 'fields'], where: { userId }});
        return list.map(x => this.toResponseObject(x));
    }

    async create(userId: number, data: FormInterface) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        return await getManager().transaction(async transactionalEntityManager => {
            const form = await this.repository.findOne({ where: { tableName: data.tableName }});
            if (!form) {
                const itemToCreate = await this.repository.create({ ...data, user });
                await transactionalEntityManager.save(itemToCreate);
                const query = `CREATE TABLE projects.${itemToCreate.tableName}(
                    id serial not null,
                    geometry geometry,
                    PRIMARY KEY (id)
                )`;
                await transactionalEntityManager.query(query);
                return this.toResponseObject(itemToCreate);
            }
        });
    }

    async show(id: any) {
        const itemToDetails = await this.repository.findOne({ relations: ['user'], where: { id }});
        if (!itemToDetails) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return this.toResponseObject(itemToDetails);
    }

    async update(id: any, data: Partial<FormInterface>) {
        let itemToUpdate = await this.repository.findOne({ where: { id }});
        if (!itemToUpdate) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        await getManager().transaction(async transactionalEntityManager => {
            if (itemToUpdate.tableName !== data.tableName) {
                const query = `ALTER TABLE projects.${itemToUpdate.tableName} RENAME TO ${data.tableName};`;
                await transactionalEntityManager.query(query);
            }
            await transactionalEntityManager.update(FormEntity, { id }, data);
            itemToUpdate = await this.repository.findOne({ id });
            return this.toResponseObject(itemToUpdate);
        });
    }

    async delete(id: any) {
        const itemToDelete = await this.repository.findOne({ where: { id }});
        if (!itemToDelete) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        await getManager().transaction(async transactionalEntityManager => {
            const query = `DROP TABLE projects.${itemToDelete.tableName};`;
            await transactionalEntityManager.query(query);
            await transactionalEntityManager.delete(FormEntity, { id });
            const deleteField = `DELETE FROM public.fields where "formId" = ${itemToDelete.id}`;
            await transactionalEntityManager.query(deleteField);
            return { status: true };
        });
    }

    private toResponseObject(item: FormEntity) {
        return {
          ...item,
          user: item.user && item.user.toResponseObject(false),
          fields: item.fields,
        };
      }
}

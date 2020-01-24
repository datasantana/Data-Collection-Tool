import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { DataTypeEntity } from '../entities/data-type.entity';
import { DataTypeInterface } from '../models/data-type.interface';

@Injectable()
export class DataTypeService {

    constructor(@InjectRepository(DataTypeEntity) private repository: Repository<DataTypeEntity>) {}

    async list(): Promise<DataTypeInterface[]> {
        return await this.repository.find();
    }

    async create(data: DataTypeInterface) {
        const itemToCreate = await this.repository.create(data);
        return await this.repository.save(itemToCreate);
    }

    async show(id: any) {
        const itemToDetails = await this.repository.findOne({ where: { id }});
        if (!itemToDetails) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return itemToDetails;
    }

    async update(id: any, data: Partial<DataTypeInterface>) {
        const itemToUpdate = await this.repository.findOne({ where: { id }});
        if (!itemToUpdate) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        await this.repository.update({ id }, data);
        return await this.repository.findOne({ id });
    }

    async delete(id: any) {
        const itemToDelete = await this.repository.findOne({ where: { id }});
        if (!itemToDelete) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        await this.repository.delete({id});
        return { status: true };
    }
}

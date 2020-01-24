import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../entities/user.entity';
import { UserInterface } from '../models/user.interface';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

    async list() {
        const list = await this.repository.find();
        return list.map(x => x.toResponseObject(false));
    }

    async create(data: UserInterface) {
        const { email } = data;
        let itemToCreate = await this.repository.findOne({ where: { email } });
        if (itemToCreate) {
         throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        itemToCreate = await this.repository.create(data);
        await this.repository.save(itemToCreate);
        return itemToCreate.toResponseObject(false);
    }

    async show(id: any) {
        const itemToDetails = await this.repository.findOne({ where: { id }});
        if (!itemToDetails) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return itemToDetails.toResponseObject();
    }

    async update(id: any, data: Partial<UserInterface>) {
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

    async login(data: UserInterface) {
        const { email, password } = data;
        const user = await this.repository.findOne({ where: { email } });
        if (!user || !(await user.comparePassword(password))) {
          throw new HttpException(
            'Invalid email/password',
            HttpStatus.BAD_REQUEST,
          );
        }
        return user.toResponseObject();
      }
}

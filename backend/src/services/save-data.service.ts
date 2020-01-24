import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { getManager } from 'typeorm';

@Injectable()
export class SaveDataService {

    async create(data: any) {

        await getManager().transaction(async transactionalEntityManager => {

            let query = `INSERT INTO  projects.${data.tableName}`;
            let fields = '';
            let values = '';
            const geometry = `ST_MakePoint(${data.geometry})`;
            delete data.geometry;
            let i = 0;
            for (const key in data) {
                if (data.hasOwnProperty(key) && key !== 'tableName') {
                    if (i < Object.keys(data).length - 1) {
                        fields += key + ',';
                        values += `'${data[key]}',`;
                    } else {
                        fields += key;
                        values += `'${data[key]}'`;
                    }
                }
                i++;
            }
            query += `(geometry, ${fields})`;
            query += ` VALUES(${geometry}, ${values})`;
            return await transactionalEntityManager.query(query);
        });
    }

    async show(tableName: any) {

        const rawData = await getManager().query(`SELECT *, ST_X(geometry) as longitude, ST_Y(geometry) as latitude FROM projects.${tableName}`);
        return rawData;
    }
    async update(id: any, data: any) {
        await getManager().transaction(async transactionalEntityManager => {
            let query = `UPDATE projects.${data.tableName} SET`;
            let fields = '';
            const values = '';
            let i = 0;
            for (const key in data) {
                if (data.hasOwnProperty(key) && key !== 'tableName') {
                    if (i < Object.keys(data).length - 1) {
                        fields += `${key}='${data[key]}',`;
                    } else {
                        fields += `${key}='${data[key]}'`;
                    }
                }
                i++;
            }
            query += ` ${fields} WHERE id=${id}`;
            await transactionalEntityManager.query(query);
            return {status: true};
        });
        return {status: false};

    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './products.model';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Products)
        private productModel: typeof Products
    ) { }

    async findOne(id: string | number): Promise<Products> {
        return await this.productModel.findOne({
            where: {
                id: id
            }
        })
    }
}

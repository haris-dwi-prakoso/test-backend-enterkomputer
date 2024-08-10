import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tables } from './tables.model';
import { Orders } from 'src/orders/orders.model';
import { Order_Items } from 'src/orders/order_items.model';
import { Products } from 'src/products/products.model';

@Injectable()
export class TablesService {
    constructor(
        @InjectModel(Tables)
        private tableModel: typeof Tables
    ) { }

    async findOneWithOrders(id: string | number) {
        return await this.tableModel.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Orders,
                    where: { is_active: true },
                    include: [
                        {
                            model: Order_Items,
                            include: [Products]
                        }
                    ]
                }
            ]
        });
    }
}

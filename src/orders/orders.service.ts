import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orders } from './orders.model';
import { Order_Items } from './order_items.model';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Orders)
        private orderModel: typeof Orders,
        @InjectModel(Order_Items)
        private orderItemModel: typeof Order_Items
    ) { }

    async create(data: CreateOrderDto) {
        let order = await this.orderModel.create({
            table_id: data.table_id,
            is_active: true
        });
        let toInsert = data.items.map((x) => {
            return {
                order_id: order.id,
                product_id: x.product_id,
                quantity: x.quantity
            }
        });
        // for (let i = 0; i < data.items.length; i++) {
        //     await this.orderItemModel.create({
        //         order_id: order.id,
        //         product_id: data.items[i].product_id,
        //         quantity: data.items[i].quantity
        //     });
        // }
        let orderItems = await this.orderItemModel.bulkCreate(toInsert);
        return {
            order: order,
            orderItems: orderItems
        }
    };
}

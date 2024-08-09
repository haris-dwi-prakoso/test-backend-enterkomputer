import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Orders } from './orders.model';
import { Products } from 'src/products/products.model';

@Table
export class Order_Items extends Model {
    @ForeignKey(() => Orders)
    @Column({
        allowNull: false
    })
    order_id: number;

    @ForeignKey(() => Products)
    @Column({
        allowNull: false
    })
    product_id: number;

    @Column({
        allowNull: false
    })
    quantity: number;
}
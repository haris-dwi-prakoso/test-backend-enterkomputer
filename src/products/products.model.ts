import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Order_Items } from 'src/orders/order_items.model';

@Table
export class Products extends Model {
    @Column({
        allowNull: false
    })
    product_name: string;

    @Column({
        allowNull: false
    })
    category: string;

    @Column({
        allowNull: false
    })
    price: number;

    @BelongsTo(() => Order_Items)
    order_items: Order_Items[]
}
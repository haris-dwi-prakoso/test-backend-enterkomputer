import { Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Tables } from 'src/tables/tables.model';
import { Order_Items } from './order_items.model';

@Table
export class Orders extends Model {
    @ForeignKey(() => Tables)
    @Column({
        allowNull: false
    })
    table_id: number;

    @Column({
        allowNull: false,
        defaultValue: true
    })
    is_active: boolean;

    @HasMany(() => Order_Items)
    order_items: Order_Items[];
}
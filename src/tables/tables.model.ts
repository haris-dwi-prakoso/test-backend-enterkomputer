import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Orders } from 'src/orders/orders.model';

@Table
export class Tables extends Model {
    @Column({
        allowNull: false
    })
    table_name: string;

    @HasMany(() => Orders)
    orders: Orders[];
}
import { Column, Model, Table } from 'sequelize-typescript';

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
}
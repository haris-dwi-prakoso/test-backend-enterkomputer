import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Printers extends Model {
    @Column({
        allowNull: false
    })
    printer_name: string;

    @Column({
        allowNull: false
    })
    printer_description: string;

    @Column({
        allowNull: false
    })
    printer_type: string;
}
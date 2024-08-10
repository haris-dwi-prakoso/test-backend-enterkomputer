import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Printers } from './printers.model';

@Injectable()
export class PrintersService {
    constructor(
        @InjectModel(Printers)
        private printerModel: typeof Printers
    ) { }

    async findPrintersByType(types: string[]) {
        return await this.printerModel.findAll({
            where: {
                printer_type: types
            }
        });
    }
}

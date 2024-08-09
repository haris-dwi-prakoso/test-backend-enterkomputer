import { Module } from '@nestjs/common';
import { PrintersService } from './printers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Printers } from './printers.model';

@Module({
  imports: [SequelizeModule.forFeature([Printers])],
  providers: [PrintersService]
})
export class PrintersModule { }

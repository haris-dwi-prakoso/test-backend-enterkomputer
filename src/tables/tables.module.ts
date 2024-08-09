import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tables } from './tables.model';

@Module({
  imports: [SequelizeModule.forFeature([Tables])],
  providers: [TablesService]
})
export class TablesModule { }

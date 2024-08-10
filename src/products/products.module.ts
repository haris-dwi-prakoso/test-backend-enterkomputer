import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Products } from './products.model';

@Module({
  imports: [SequelizeModule.forFeature([Products])],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule { }

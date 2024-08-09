import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orders } from './orders.model';
import { Order_Items } from './order_items.model';

@Module({
  imports: [SequelizeModule.forFeature([Orders, Order_Items])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }

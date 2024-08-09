import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { TablesModule } from './tables/tables.module';
import { PrintersModule } from './printers/printers.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'test',
      autoLoadModels: true,
      synchronize: true,
    }),
    OrdersModule,
    ProductsModule,
    TablesModule,
    PrintersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

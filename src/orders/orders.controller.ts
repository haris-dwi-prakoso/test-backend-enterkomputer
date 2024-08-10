import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TablesService } from 'src/tables/tables.service';
import { PrintersService } from 'src/printers/printers.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('services/orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly tablesService: TablesService,
        private readonly printersService: PrintersService
    ) { }

    @Post('/')
    @ApiOperation({ summary: 'Create order for one table.' })
    @ApiBody({
        type: CreateOrderDto,
        description: 'JSON structure for order creation.'
    })
    @ApiResponse({ status: 200, description: 'The order has been successfully created.' })
    @ApiResponse({ status: 500, description: 'The process ran into an error.' })
    async createOrder(@Body() body: CreateOrderDto) {
        try {
            let hasFood = false;
            let hasDrink = false;
            let printerTypes = [];
            let orderWithItems = await this.ordersService.create(body);
            for (let orderItem of orderWithItems.orderItems) {
                if (orderItem.product.category == "Makanan") hasFood = true;
                else if (orderItem.product.category == "Minuman") hasDrink = true;
                else if (orderItem.product.category == "Promo") {
                    hasFood = true;
                    hasDrink = true;
                }
            }
            if (hasFood) printerTypes.push("Makanan");
            if (hasDrink) printerTypes.push("Minuman");
            let printers = await this.printersService.findPrintersByType(printerTypes);

            return {
                status: 200,
                printers: printers
            }
        } catch (e) {
            return {
                status: 500,
                message: e.message
            }
        }
    }

    @Get('/bytable/:id')
    @ApiOperation({ summary: 'Get the bill for one table.' })
    @ApiResponse({ status: 200, description: 'The bill has been successfully retrieved.' })
    @ApiResponse({ status: 500, description: 'The process ran into an error.' })
    async getOrdersByTable(@Param('id') id: string) {
        try {
            let idNumber = Number(id);
            let tableOrders = await this.tablesService.findOneWithOrders(idNumber);
            let printers = await this.printersService.findPrintersByType(["Bill"]);
            let total = 0;
            if (tableOrders && tableOrders.orders.length > 0) {
                for (let order of tableOrders.orders) {
                    for (let order_item of order.order_items) {
                        total += (order_item.product.price * order_item.quantity);
                    }
                }
            }

            return {
                status: 200,
                orders: tableOrders,
                printers: printers,
                total: total
            }
        } catch (e) {
            return {
                status: 500,
                message: e.message
            }
        }
    }
}

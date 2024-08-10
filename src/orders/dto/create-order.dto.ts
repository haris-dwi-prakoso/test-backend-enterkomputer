import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({
        example: 1,
        required: true
    })
    @IsNotEmpty()
    table_id: number;

    @ApiProperty({
        example: [{
            product_id: 1,
            quantity: 1
        }],
        required: true
    })
    @IsNotEmpty()
    @IsArray()
    items: {
        product_id: number;
        quantity: number
    }[]
}
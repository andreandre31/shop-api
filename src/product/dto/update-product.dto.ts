import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class UpdateProductDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    price: number;
}
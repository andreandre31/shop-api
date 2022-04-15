import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class FilterProductDto {
    @IsOptional()
    title: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    min_price: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    max_price: number;
}
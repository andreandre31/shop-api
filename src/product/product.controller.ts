import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getProduct() {
        return this.productService.getAll();
    }

    @Post()
    createProduct(@Body('title') title: string, @Body('description') description: string, @Body('price') price: number) {
        return this.productService.createProduct(title, description, price);
    }
}

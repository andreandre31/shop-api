import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(@Query('title') title: string, @Query('price') price: number) {
    return this.productService.getProducts(title, price);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
      return this.productService.getProductById(id);
  }

  @Post()
  createProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    return this.productService.createProduct(title, description, price);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    return this.productService.updateProduct(id, title, description, price);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
      return this.productService.deleteProduct(id);
  }

}

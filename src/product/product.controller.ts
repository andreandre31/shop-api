import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user-decorator';
import { JwtGuard } from 'src/guard/jwt.guard';
import { UUIDValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { User } from 'src/users/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(JwtGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query() filter: FilterProductDto, @GetUser() user: User): Promise<Product[]> {
    return await this.productService.getProducts(user, filter);
  }

  @Get(':id')
  async getProductById(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<Product> {
    return this.productService.getProductById(user, id);
  }

  @Post()
  async createProduct(@GetUser() user: User, @Body() payload: CreateProductDto): Promise<void> {
    return await this.productService.createProduct(user, payload);
  }

  @Put(':id')
  async updateProduct(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: UpdateProductDto,
  ): Promise<void> {
    return await this.productService.updateProduct(user, id, payload);
  }

  @Delete(':id')
  async deleteProduct(@GetUser() user: User, @Param('id', UUIDValidationPipe) id: string): Promise<void> {
    return await this.productService.deleteProduct(user, id);
  }
}

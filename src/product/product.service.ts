import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async getProducts(user: User, filter: FilterProductDto): Promise<Product[]> {
    return await this.productRepository.getProducts(user, filter);
  }

  async getProductById(user: User, id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id, {
      where: { user },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} is not found`);
    }
    return product;
  }

  async createProduct(
    user: User,
    createProductDto: CreateProductDto,
  ): Promise<void> {
    return await this.productRepository.createProduct(user, createProductDto);
  }

  async updateProduct(
    user: User,
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<void> {
    const { title, description, price } = updateProductDto;

    const product = await this.getProductById(user, id);
    product.title = title;
    product.description = description;
    product.price = price;

    await product.save();
  }

  async deleteProduct(user: User, id: string): Promise<void> {
    const result = await this.productRepository.delete({id, user});
    if (result.affected == 0) {
      throw new NotFoundException(`Product with id ${id} is not found`);
    }
  }
}

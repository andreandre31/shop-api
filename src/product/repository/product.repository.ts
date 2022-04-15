import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { FilterProductDto } from '../dto/filter-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getProducts(user: User, filter: FilterProductDto): Promise<Product[]> {
    const { title, min_price, max_price } = filter;

    const query = this.createQueryBuilder('product')
                    .where('product.userId = :userId', {userId: user.id});

    if (title) {
      query.andWhere('lower(product.title) LIKE :title', {
        title: `%${title.toLowerCase()}%`,
      });
    }
    if (min_price) {
      query.andWhere('product.price >= :min_price', { min_price });
    }

    if (max_price) {
      query.andWhere('product.price <= :max_price', { max_price });
    }

    return await query.getMany();
  }

  async createProduct(user: User, createProductDto: CreateProductDto): Promise<void> {
    const { title, description, price } = createProductDto;

    const product = this.create();
    product.title = title;
    product.description = description;
    product.price = price;
    product.user = user;

    try {
      await product.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

}

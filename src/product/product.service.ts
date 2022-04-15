import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    private product: any[] = [];

    getAll(): any[] {
        return this.product;
    }

    createProduct(title: string, description: string, price: number) {
        this.product.push({
            title,
            description,
            price,
        });
    }
}

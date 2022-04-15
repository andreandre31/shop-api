import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { RefreshToken } from "src/auth/entities/refresh-token.entity";
import { Product } from "src/product/entities/product.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {eager: true})
    refreshTokens: RefreshToken[];

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany, JoinColumn, OneToOne } from "typeorm";
import bcrypt from 'bcryptjs';
import Produto from './produtos';


@Entity('vendedor')
export default class Vendedor{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    whatsapp: string;

    @Column()
    extension: string;
    
    @Column()
    department: string;
    
    @Column()
    pass: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.pass = bcrypt.hashSync(this.pass, 8);
    }

    @OneToMany(() => Produto, produto => produto.vendedor, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'vendedor_id'})
    produtos: Produto[];

}
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import Image from './images';
import Vendedor from './vendedor';

@Entity('produto')
export default class Produto{
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    title: string;
    
    @Column()
    description: string;
    
    @Column()
    value: string;

    @ManyToOne(() => Vendedor, vendedor => vendedor.produtos)
    @JoinColumn({name: 'vendedor_id'})
    vendedor: Vendedor;

    @OneToMany(() => Image, image => image.produto, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'produto_id'})
    images: Image[];
}
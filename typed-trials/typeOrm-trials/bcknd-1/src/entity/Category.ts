import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Blog } from './Blog';


@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 120,
        nullable: false
    })
    name: string

    @ManyToMany(()=>Blog, (blog)=>blog.categories)
    @JoinTable()
    blogs: Array<Blog>
}
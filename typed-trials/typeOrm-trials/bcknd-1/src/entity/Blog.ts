import {Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Category } from './Category';
import { User } from './User';

@Entity()
export class Blog{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 120,
        nullable: false
    })
    title: string

    @Column({
        length: 150,
        nullable: false
    })
    excerpt: string

    @Column({
        type: "text",
        name: "body",
        nullable: false
    })
    content: string

    // @Column("da")
    // published_on: string
    
    @ManyToOne(()=>User, (user)=>user.blogs, {
        onDelete: "CASCADE",
        nullable: false,
        eager: true
    })
    author: User

    @ManyToMany(()=>Category, (category)=>category.blogs, {
        eager: true
    })
    categories: Array<Category>


    @Column({
        type: "boolean",
        default: false
    })
    isPublished: boolean

    @CreateDateColumn({
        type: "timestamp with time zone"
    })
    created_on: string

    @UpdateDateColumn({
        type: "timestamp with time zone"
    })
    last_edited: string
}

// Blog belongs to One User
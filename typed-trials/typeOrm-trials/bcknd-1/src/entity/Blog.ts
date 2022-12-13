import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

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
    
    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    author: string

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
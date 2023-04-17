import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: "500"
    })
    content: string

    @CreateDateColumn({
        type: "timestamp with time zone"
    })
    createdAt: string

    @UpdateDateColumn({
        type: "timestamp with time zone"
    })
    updatedAt: string
}
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: "50"
    })
    username: string

    @Column({
        type: "varchar",
        unique: true
    })
    password: string

    @CreateDateColumn({
        type: "timestamp with time zone"
    })
    createdAt: string
}
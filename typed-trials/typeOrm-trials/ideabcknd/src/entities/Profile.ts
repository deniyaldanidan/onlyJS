import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './User';


@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    firstname: string

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    lastname: string

    @Column({
        type: "varchar",
        length: 3000,
        nullable: true
    })
    bio: string

    @Column({
        type: "varchar",
        length: 300,
        nullable: true
    })
    location: string

    @OneToOne(()=>User, (user)=>user.profile, {
        onDelete: "CASCADE",
        nullable: false
    })
    @JoinColumn()
    user: User
}
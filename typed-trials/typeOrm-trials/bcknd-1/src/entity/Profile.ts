import { SexType } from '@faker-js/faker';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Profile{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 50
    })
    firstname: string

    @Column({
        type: "varchar",
        length: 50
    })
    lastname: string

    @Column()
    age: number

    @Column({
        type: "varchar",
        length: 150
    })
    location: string

    @Column({
        type: "text"
    })
    info: string

    @Column({
        type: "enum",
        enum: ["male", "female"]
    })
    sex: SexType

    @OneToOne(()=>User, (user)=>user.profile, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    user: User
}

// Profile belongsTo User
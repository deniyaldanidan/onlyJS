import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './Profile';

@Entity()
export class User{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "varchar",
        length: 50,
        unique: true
    })
    username: string

    @Column({
        type: "varchar",
        length: 220
    })
    password: string

    @Column({
        type: "varchar",
        length: 200
    })
    email: string

    @OneToOne(()=>Profile, (profile)=>profile.user, {eager: true})
    profile: Profile
}

// User hasOne Profile
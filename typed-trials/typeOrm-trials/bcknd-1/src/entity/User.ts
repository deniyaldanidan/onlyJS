import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from './Blog';
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

    @OneToMany(()=>Blog, (blog)=>blog.author)
    blogs: Array<Blog>
}

// User hasOne Profile
// User hasMany Blogs
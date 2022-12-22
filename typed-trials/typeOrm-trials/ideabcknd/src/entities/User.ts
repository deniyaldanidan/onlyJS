import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Idea } from './Idea';
import { MyComment } from './MyComment';
import { MyLike } from './MyLike';
import { Profile } from './Profile';

@Entity()
export class User{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "varchar",
        length: 255,
        unique: true,
        nullable: false
    })
    username: string

    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
        select: false
    })
    pwd: string

    @Column({
        type: "varchar",
        length: 2050,
        unique: true,
        select: false,
        nullable: true
    })
    refreshToken: string

    @Column({
        type: "varchar",
        length: 400,
        unique: true,
        nullable: false,
        select: false
    })
    email: string

    @CreateDateColumn({
        type: "timestamp with time zone"
    })
    joined_date: string

    @OneToMany(()=>Idea, (idea)=>idea.author)
    ideas: Array<Idea>

    @OneToMany(()=>MyLike, (mylike)=>mylike.liked_by)
    likes: Array<MyLike>

    @OneToMany(()=>MyComment, (mycomment)=>mycomment.commented_by)
    comments: Array<MyComment>

    @OneToOne(()=>Profile, (profile)=>profile.user)
    profile: Profile
}
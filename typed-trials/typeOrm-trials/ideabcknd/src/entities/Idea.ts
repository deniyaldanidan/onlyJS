import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MyComment } from './MyComment';
import { MyLike } from './MyLike';
import { User } from './User';

@Entity()
export class Idea{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: "255"
    })
    title: string

    @Column({
        type: "text"
    })
    description: string

    @CreateDateColumn({
        type: "timestamp with time zone"
    })
    created_date: string

    @ManyToOne(()=>User, (user)=>user.ideas, {
        onDelete:"CASCADE"
    })
    author : User

    @OneToMany(()=>MyLike, (mylike)=>mylike.idea)
    likes: Array<MyLike>

    @OneToMany(()=>MyComment, (mycomment)=>mycomment.idea)
    comments: Array<MyComment>
}
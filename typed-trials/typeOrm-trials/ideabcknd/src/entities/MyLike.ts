import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Idea } from './Idea';
import { User } from './User';

const LikeEnum = ["like", "unlike"]
export type typeLikeValue = "like" | "unlike"

@Entity()
@Unique(['idea', 'liked_by'])
export class MyLike{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: LikeEnum,
        nullable: false
    })
    like_value: typeLikeValue

    @ManyToOne(()=>Idea, (idea)=>idea.likes, {
        onDelete: "CASCADE"
    })
    idea: Idea

    @ManyToOne(()=>User, (user)=>user.likes, {
        onDelete: "CASCADE"
    })
    liked_by: User
}
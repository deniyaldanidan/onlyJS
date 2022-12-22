import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Idea } from './Idea';
import { User } from './User';

@Entity()
export class MyComment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 500,
        nullable: false
    })
    comment: string

    @ManyToOne(() => Idea, (idea) => idea.comments, {
        onDelete: "CASCADE"
    })
    idea: Idea

    @ManyToOne(() => User, (user) => user.comments, {
        onDelete: "CASCADE"
    })
    commented_by: User

    @CreateDateColumn({
        type: "timestamp with time zone"
    })
    commented_on : string

    @UpdateDateColumn({
        type: "timestamp with time zone"
    })
    last_edited: string
}
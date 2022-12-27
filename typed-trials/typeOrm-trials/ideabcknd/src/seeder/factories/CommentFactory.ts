import { faker } from "@faker-js/faker";
import { random } from "lodash";
import AppDataSource from "../../data-source";
import { Idea } from "../../entities/Idea";
import { MyComment } from "../../entities/MyComment";
import { User } from "../../entities/User";


const CommentFactory: (users: User[], ideas: Idea[], nums?:number) => Promise<string> = async (users, ideas, nums=25) => {
    const commentRepo = AppDataSource.getRepository(MyComment);
    
    for (let index = 0; index < nums; index++) {
        let mycomment = new MyComment();
        mycomment.comment = faker.random.words(random(4, 20));
        mycomment.idea = ideas[random(ideas.length-1)];
        mycomment.commented_by = users[random(users.length - 1)];
        await commentRepo.save(mycomment);
    }

    return "Comment seeding is done"

}

export default CommentFactory;
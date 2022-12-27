import { random } from "lodash";
import AppDataSource from "../../data-source";
import { Idea } from "../../entities/Idea";
import { MyLike } from "../../entities/MyLike";
import { User } from "../../entities/User";


const LikeFactory:(users:User[], ideas:Idea[])=>Promise<string>=async (users, ideas)=>{

    const likeRepo = AppDataSource.getRepository(MyLike);

    const userIdeaTuples:Array<[User, Idea]> = [];
    ideas.forEach(idea => {
        users.forEach(user=>{
            random(0, 9) > 3 &&  userIdeaTuples.push([user, idea])
        })
    });

    for (let index = 0; index < userIdeaTuples.length; index++) {
        const myLike = new MyLike();
        myLike.idea = userIdeaTuples[index][1];
        myLike.liked_by = userIdeaTuples[index][0];
        random(0,9)>4 ? (myLike.like_value = "like") : (myLike.like_value = "unlike")
        await likeRepo.save(myLike);
    }

    return "Like seeding is done";
}

export default LikeFactory;
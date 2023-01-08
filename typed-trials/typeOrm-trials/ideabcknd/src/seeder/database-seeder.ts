import AppDataSource from "../data-source";
import { Idea } from "../entities/Idea";
import { User } from "../entities/User";
import CommentFactory from "./factories/CommentFactory";
import IdeaFactory from "./factories/IdeaFactory";
import LikeFactory from "./factories/LikeFactory";
import UserFactory from "./factories/UserFactory";

AppDataSource.initialize().then(async ()=>{
    await AppDataSource.synchronize(true)
    console.log("Database is synchronized")
}).then(async()=>{
    console.log("Started Seeding")
    const users:User[] = await UserFactory(15);
    
    const ideas:Idea[] =  await IdeaFactory(users, 50);
    console.log("Before Comment")
    await CommentFactory(users, ideas, 90);
    await LikeFactory(users, ideas);

}).finally(()=>{
    AppDataSource.destroy();
    console.log("Seeding is Done");
})

/*
    ? Seeding Order as follow
    ? User & Profile = export User-Object
    ? Use User to Create Idea export Idea-Object
    ? Use User & Idea to create MyLike & MyComment objects export none
*/
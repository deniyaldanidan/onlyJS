import BlogFactory from "./factories/BlogFactory";
import CategoryFactory from "./factories/CategoryFactory";
import UserFactory from "./factories/UserFactory";



export async function dbSeeder (){

    try {
        const user1 = await UserFactory();
        const user2 = await UserFactory();
        const user3 = await UserFactory();

        const cat1 = await CategoryFactory();
        const cat2 = await CategoryFactory();
        const cat3 = await CategoryFactory();
        const cat4 = await CategoryFactory();
        const cat5 = await CategoryFactory();

        BlogFactory(user1, [cat2, cat3, cat4]);
        BlogFactory(user2, [cat1, cat3, cat5]);
        BlogFactory(user1, [cat1, cat2]);
        BlogFactory(user1, [cat3]);
        BlogFactory(user2, [cat5]);
        BlogFactory(user3)

    } catch (error) {
        console.log(error)
    }
}
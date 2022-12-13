import BlogFactory from "./factories/BlogFactory";
import UserFactory from "./factories/UserFactory";



export async function dbSeeder (){
    UserFactory();
    UserFactory();
    UserFactory();
    BlogFactory();
    BlogFactory();
}
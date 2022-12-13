import { AppDataSource } from "../data-source";
import { Blog } from "../entity/Blog";
import {faker} from '@faker-js/faker';

export default async function ():Promise<void>{
    const titleLength:number = faker.datatype.number({
        min: 3, max: 8
    })
    const excerptLength:number = faker.datatype.number({
        min: 5, max: 10
    })
    const blog = new Blog();
    blog.title = faker.random.words(titleLength);
    blog.excerpt = faker.random.words(excerptLength);
    blog.content = faker.lorem.paragraphs(10, "\n");
    blog.author = faker.internet.userName();

    const resultBlog = await AppDataSource.manager.save(blog);
    console.log(`Blog "${resultBlog.title}" is seeded`);
}
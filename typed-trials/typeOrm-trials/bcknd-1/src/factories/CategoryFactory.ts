import { faker } from "@faker-js/faker";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export default async function():Promise<Category>{
    const category = new Category();
    category.name = faker.random.word();
    await AppDataSource.manager.save(category);
    console.log(`Category ${category.name} is created`)
    return category;
}
import { faker } from "@faker-js/faker";
import { random } from "lodash";
import AppDataSource from "../../data-source";
import { Idea } from "../../entities/Idea";
import { User } from "../../entities/User";

const ideaRepo = AppDataSource.getRepository(Idea);

const IdeaFactory: (users: User[], num: number) => Promise<Idea[]> = async (users, num=5) => {

    const ideas:Array<Idea> = [];

    for (let index = 0; index < num; index++) {
        let curr_user = users[random(0, users.length - 1)];
        const myIdea = new Idea();
        myIdea.title = faker.random.words(random(2, 6));
        myIdea.description = faker.lorem.paragraphs(10);
        myIdea.author = curr_user;
        await ideaRepo.save(myIdea);

        ideas.push(myIdea);
    }

    return ideas;
}

export default IdeaFactory;
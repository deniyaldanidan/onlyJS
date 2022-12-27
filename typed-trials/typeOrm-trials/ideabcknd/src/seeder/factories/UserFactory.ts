import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { Profile } from "../../entities/Profile";
import { User } from "../../entities/User";
import { faker, SexType } from '@faker-js/faker';
import { random } from "lodash";
import bcrypt from 'bcrypt';

const userRepo: Repository<User> = AppDataSource.getRepository(User);
const profileRepo: Repository<Profile> = AppDataSource.getRepository(Profile);
const password = "P@$$w0rd123";

const UserFactory: (num: number) => Promise<User[]> = async (num = 3) => {

    const users:Array<User> = []

    for (let index = 0; index < num; index++) {
        const sex = faker.name.sex() as SexType;
        let myProfile = new Profile();
        myProfile.firstname = faker.helpers.unique(() => faker.name.firstName(sex));
        myProfile.lastname = faker.helpers.unique(() => faker.name.lastName(sex));
        random(1, 9) > 3 && (myProfile.location = faker.address.cityName())
        random(1, 9) > 3 && (myProfile.bio = faker.random.words(random(20, 30)))

        let myUser = new User();
        myUser.username = faker.internet.userName(myProfile.firstname, myProfile.lastname);
        let pwd = await bcrypt.hash(password, 9);
        myUser.pwd = pwd
        myUser.email = faker.internet.email(myProfile.firstname, myProfile.lastname);

        await userRepo.save(myUser);
        myProfile.user = myUser;
        await profileRepo.save(myProfile);

        users.push(myUser);
    }

    return users;
}

export default UserFactory;
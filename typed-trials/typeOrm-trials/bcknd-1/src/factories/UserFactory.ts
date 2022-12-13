import {faker, SexType} from '@faker-js/faker';
import { AppDataSource } from '../data-source';
import { Profile } from '../entity/Profile';
import { User } from '../entity/User';

export default async function ():Promise<User> {
    
    const user_sex = faker.name.sex() as SexType;
    
    const profile = new Profile();
    profile.firstname = faker.name.firstName(user_sex);
    profile.lastname = faker.name.lastName(user_sex);
    profile.age = faker.datatype.number({max: 40, min: 23, precision: 1});
    profile.location = faker.address.cityName()
    profile.info = faker.lorem.paragraph(6)
    profile.sex = user_sex;
    
    const user = new User();
    user.username = faker.internet.userName(profile.firstname, profile.lastname);
    user.password = "password";
    user.email = faker.internet.email(profile.firstname, profile.lastname);
    
    profile.user = user;
    
    await AppDataSource.manager.save(user);
    await AppDataSource.manager.save(profile);
    


    console.log(`User ${user.username} is created`);
    return user;
}
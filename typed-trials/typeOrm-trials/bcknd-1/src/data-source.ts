import 'reflect-metadata';
import {DataSource} from 'typeorm';
import { Blog } from './entity/Blog';
import { Profile } from './entity/Profile';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "davisj",
    password: "davisj",
    database: "typeorm_sample1",
    logging: false,
    entities: [Blog, User, Profile],
    synchronize: true,
    migrations: [],
    subscribers: []
});
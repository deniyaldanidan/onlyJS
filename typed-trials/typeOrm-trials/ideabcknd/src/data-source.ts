import dotenv from 'dotenv';
import 'reflect-metadata';
import {DataSource} from 'typeorm';
import { Idea } from './entities/Idea';
import { MyComment } from './entities/MyComment';
import { MyLike } from './entities/MyLike';
import { Profile } from './entities/Profile';
import { User } from './entities/User';


dotenv.config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    logging: false,
    synchronize: true,
    entities: [Idea, User, MyLike, Profile, MyComment],
    migrations: [],
    subscribers: []
})

export default AppDataSource;
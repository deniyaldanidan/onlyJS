import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import 'reflect-metadata';
import { Post } from "./entities/Post";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "davisj",
    password: "davisj",
    database: "simple_socials",
    logging: false,
    synchronize: true,
    entities: [Post],
    migrations: [],
    subscribers: []
})
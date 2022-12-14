import { Router } from 'express';
import { QueryFailedError, TypeORMError } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Blog } from '../entity/Blog';
import { Category } from '../entity/Category';
import { Profile } from '../entity/Profile';
import { User } from '../entity/User';

const testRouter = Router();

testRouter.get("/", async (req, res, next) => {
    try {
        // const result  = await AppDataSource.manager.find(User, {
        //     relations: {
        //         blogs: true
        //     }
        // });
        // const result = await AppDataSource.manager.findOne(Blog, {
        //     where: {
        //         id: 1
        //     },
        //     relations: {
        //         author: true
        //     }
        // })
        const result = await AppDataSource.manager.findOne(Category, {
            where: {
                id: 2
            }, relations: {
                blogs: true
            }
        })
        // await AppDataSource.manager.remove(result);
        // const result  = await AppDataSource.manager.find(Profile, {
        //     relations: {
        //         user: true
        //     }
        // })
        // result[0].user.email = "Billie_cart@gmail.com";
        // await AppDataSource.manager.save(result[0].user)
        // await AppDataSource.manager.remove(result[0]);
        return res.json(result);
    } catch (err) {
        const error = err as Error | TypeORMError;
        if (error instanceof QueryFailedError){
            console.log(error.driverError);
            console.log(error.message);
            console.log(error.query)
            return res.sendStatus(500)
        }
        next(error);
    }
})

export default testRouter;
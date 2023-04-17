import passport from 'passport';
import { Router } from 'express';
import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';


const userRepo = AppDataSource.getRepository(User);

passport.use(new LocalStrategy(async function (username, password, cb){
    try {
        const user = await userRepo.findOneByOrFail({username});
        
    } catch (error) {
        
    }
}))
import chalk  from 'chalk';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from './BlogModel.mjs';

dotenv.config();

mongoose.set('strictQuery', false)

console.log(chalk.bold.bgWhiteBright.blueBright('Script has started'))
const DB_URI = process.env.dburi;

if (!DB_URI) {
    console.log(chalk.redBright.bold('Database URI has not found include it in .env file (Example: dburi=mongoose-uri-here)'))
    process.exit(1);
} else {
    console.log(chalk.greenBright("DB_URI has found"))
}


async function main() {
    try {
        await mongoose.connect(DB_URI as string);
        console.log(chalk.greenBright("Connection to DB is successfull"))

        const blogs = await Blog.find({});
        console.log(blogs)

    } catch (error:any) {
        console.log(chalk.redBright.bold("Error occured = " + error.message));
        console.log(error)
        process.exit(1)
    } finally{
        console.log(chalk.greenBright("Connection is going to be disconnected"))
        await mongoose.disconnect()
        console.log(chalk.greenBright("Connection is successfully disconnected"))
        process.exit(0)
    }
}

main();
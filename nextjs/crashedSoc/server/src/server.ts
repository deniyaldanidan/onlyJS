import app from './app';
import { AppDataSource } from './data-source';


AppDataSource.initialize().then(() => {
    app();
}).catch((err)=>{
    console.log(err)
})
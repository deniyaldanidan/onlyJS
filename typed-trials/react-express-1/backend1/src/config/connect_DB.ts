import mongoose from 'mongoose';

const connect_DB = ()=>{
    if (process.env.DB_URI?.length){
        try {
            mongoose.set('strictQuery', true);
            mongoose.connect(process.env.DB_URI);
        } catch (error) {
            console.log(error)
        }
    } else{
        throw Error("Database URI is not available");
    }
}

export default connect_DB;
import mongoose from "mongoose";

const DB_URI = process.env.dburi


if (!DB_URI){
    throw new Error (
        'Please define a valid DB_URI in .env'
    )
}

let cached = (global as any).mongoose;

if  (!cached){
    cached = (global as any).mongoose = { conn: null, promise: null }
}

async function dbConnect(){
    if (cached.conn){
        return cached.conn
    }

    if (!cached.promise){
        mongoose.set('strictQuery', false);
        cached.promise = mongoose.connect(DB_URI as string).then(mongoose=>mongoose)
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
import mongoose from "mongoose";

export async function connectDB(){
    try {
        
        await mongoose.connect(process.env.MONGO_URL!)
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log("MongoDB connected");
            
        })

        connection.on('error',(error)=>{
            console.log("MongoDB connection error, please make sure DB is up and running: "+error);
            process.exit(1);
            
        })
        
    } catch (error) {
        console.log("Something went wrong in connection to DB");
        console.log(error);
        
        
    }
}
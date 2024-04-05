import moongoose from "mongoose";

export async function connect() {
    try {
        moongoose.connect(process.env.MONGO_URI!)
        const connection  = moongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected');
        })

        connection.on('error', (error) => {
            console.log('MongoDB connection error :: ' + error);
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong in connecting to the DB");
        console.log(error);
        
    }
}
import mongoose from "mongoose";

const connectDB = async () => {

    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingapp')
        .then(() => { console.log('MongoDB Connected'.bgGreen.black) })
        .catch(() => { console.log('Connection error in connecting with MongoDB'.bgRed.white) })
}

export default connectDB
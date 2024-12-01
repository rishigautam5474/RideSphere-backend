import mongoose from "mongoose";

function connectToDb(uri) {
    return mongoose.connect(uri)
}

export default connectToDb;
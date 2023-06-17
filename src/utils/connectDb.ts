import mongoose from "mongoose";


const mongooseUri: string = process.env.NEXT_PUBLIC_MONGO_URI || ""

const connectDb = async () => {
    await mongoose.connect(mongooseUri)
        .then(() => console.log("connected !"))
        .catch(e => {
            throw new Error("connection is broken ! status 500")
        })
}

export default connectDb
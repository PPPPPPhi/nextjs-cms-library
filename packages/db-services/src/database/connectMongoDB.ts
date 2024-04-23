import mongoose from "mongoose"

const DATABASE_URL = process.env.DATABASE_URL as string

if (!DATABASE_URL) {
    throw new Error(
        "Please define the DATABASE_URL environment variable inside .env.local"
    )
}

let cached = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

async function connectMongoDB() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        let options = {
            bufferCommands: false,
            autoIndex: true,
            minPoolSize: 2,
            socketTimeoutMS: 500000,
            maxPoolSize: 5
        }

        cached.promise = mongoose
            .connect(DATABASE_URL, options)
            .then((mongoose) => {
                return mongoose
            })
    }
    cached.conn = await cached.promise
    return cached.conn
}

process.on("SIGINT", async () => {
    await mongoose.connection.close()
    process.exit(0)
})

export default connectMongoDB

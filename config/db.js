import mongoose from 'mongoose'

const connectionDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL , {
            useNewUrlParser: true,
        })
        console.log(`connect to database ${conn.connection.host}`)
    }catch(error){
        console.log(`Error in mongoose ${error}`)

    }
}

export default connectionDB
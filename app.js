import express from 'express'

import connectionDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './Router/authRouter.js'
dotenv.config()
connectionDB()

const app = express()
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };
  
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use("/api/v1/auth", authRouter);



const PORT = process.env.PORT || 8000

app.get('/' , (req ,res) => {
    res.send('<h1>Manufactural Project</h1>')
})
app.listen(PORT , () => {
    console.log(`Server is running on ${process.env.DEV_MODE} on ${PORT}`)
})
import  express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/db";
import productsRoutes from './routes/productsRoutes'
dotenv.config()

connectDB()

const app = express()
app.use(express.json())
//Routes
app.use('/api/Products', productsRoutes)

export default app;
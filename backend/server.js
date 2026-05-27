import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import  cors from 'cors'

dotenv.config()

const app = express() 

app.use(cors({
  origin: "http://localhost:5173",  // Your React dev server
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 3000

app.use("/api/v1/user", userRoute)
"http://localhost:8000/api/v1/user/register"

app.listen(PORT, () => {
    connectDB()
  console.log(`Server listen in at port ${PORT}`);
  
})
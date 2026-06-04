import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import  cors from 'cors'
import cookieParser from "cookie-parser"

dotenv.config()

const app = express() 

app.use(cors({
  origin: "http://localhost:5173",  // Your React dev server
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 3000

app.use("/api/v1/user", userRoute)
app.use("/api/v1/blog", blogRoute)


app.listen(PORT, () => {
    connectDB()
  console.log(`Server listen in at port ${PORT}`);
  
})
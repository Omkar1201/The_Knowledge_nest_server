const express=require('express')
const app=express()
const cors=require('cors')
const cookieParser=require('cookie-parser')
const connectDB=require('./config/database')

require('dotenv').config()
const corsOptions={
    origin:`${process.env.BASE_URL}`,
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

const userRoute=require('./routes/userRoute')
app.use('/api/v1/',userRoute);

app.get('/',(req,res)=>{
    res.send("<h1>Hello from Home page</h1>")
})

app.listen(process.env.PORT||5000,()=>{
    console.log(`Listening at port no. ${process.env.PORT}`);
})

connectDB()
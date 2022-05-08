const cors=require("cors")
const express=require("express")
const app=express()
const db=require('./db/connection.js')
const UserRouter=require('./Routes/User')
const LoginRouter=require('./Routes/Login')
const ProjectRouter=require("./Routes/Project")

app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))


app.use(express.json());
app.use(cors());


app.use('/User',UserRouter)
app.use('/loginuser',LoginRouter)
app.use('/project',ProjectRouter);



db.MongoConnect().then((result) => {
    app.listen(process.env.PORT || 7500);
    console.log("db connected at 7500")
  });
  
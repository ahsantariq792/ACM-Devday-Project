const mongoose=require("mongoose")
require("dotenv").config({path:'./config.env'});
const uri=process.env.uri;

exports.MongoConnect=()=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(uri,{
        
useNewUrlParser: true, 
useUnifiedTopology: true 
        }).then((result)=>{
            resolve(result)
        }).catch((error)=>{
            reject(error)
        })
    })
}
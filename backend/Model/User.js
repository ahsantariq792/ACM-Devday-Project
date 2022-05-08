const {userSchema}=require('../Schema/UserSchema')
const Bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { resolve } = require('path/posix');





class User{
    
    signup=(body)=>
    {
        
        return new Promise(async(resolve,reject)=>
        {
            console.log(body)
            const { firstName, lastName, email, password ,avatar} = body;

            if (!firstName || !lastName || !email ||  !password  || !avatar) {
              
                return reject("Plz fill all the fields!!")
            }
            

                const Usermodel = mongoose.model("users", userSchema);
                const isfound =await Usermodel.findOne({ email: body.email })
                    if(isfound)
                    {
                        return reject('Email  Already Taken')
                    }else{

                         
                        const HashedPassword = await Bcrypt.hashSync(body.password, 10);
                        const userdata=
                            {
                             firstName:body.firstName,
                             lastName:body.lastName,
                             email:body.email,
                             password:HashedPassword,
                             avatar:body.avatar
                            }

                           


                            const data = new Usermodel(userdata);
                            data.save().then((result)=>
                            {
                              
                              return  resolve("Success in signup")
                               
                            }).catch((err) => {
                                console.log(err)
                                 return reject("Wrong Details");
                              })
                      
                    }

  
        })
    }

    getallusers=(body)=>{

        return new Promise((resolve,reject)=>{
            try{
               
                const Usermodel = mongoose.model("users", userSchema);
                const allusers= Usermodel.find({},{firstName:1,lastName:1,email:1})
                .then((result)=>{

                    return resolve(result)
                }).catch((e)=>{

                   return reject("Oops an Error occurred")
                })


            }
            catch(e){
               return reject("Network Error")
            }

        })
    }

}
module.exports=new User()
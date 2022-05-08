const UserModel = require('../Model/User')

class User {

    signup = (req, res) => {

        UserModel.signup(req.body).then(result => {

          return  res.status(200).json(result)

        }).catch(err => {

            if(err=="Plz fill all the fields!!"){
               return  res.status(403).json({"Error":err})

            }if(err=="Email or Phone Already Taken"){

               return res.status(403).json({"Error":err})
            }
            else{
             return res.status(500).json({ "Error": err })

            }
        })
    }



    getalltheusers = (req, res) => {

        UserModel.getallusers(req.body).then(result => {

          return  res.status(200).json(result)

        }).catch(err => {

            if(err=="Oops anError occurred"){
               return  res.status(403).json({"Error":err})

            }
        
            else{
             return res.status(500).json({ "Error": err })

            }
        })
    }

}
module.exports = new User();
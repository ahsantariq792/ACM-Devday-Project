const LoginModel = require('../Model/Login')
const passport=require('passport');

class Login {

    login = (req, res) => {
       
        LoginModel.Login(req.body).then(result => {
            return res.status(200).json(result)
        }).catch(err => {
            if(err=="InvalidP")
            {
                return res.status(403).json({ Error: "Invalid Password" })
            }
            if(err=="InvalidE")
            {
                return  res.status(403).json({ Error: "Invalid Email" })
            }
            else
            {
                return  res.status(502).json({ Error: err })
            }
          
        })
    }
    
    logout = (req, res) => {

        LoginModel.Tologout(req, res).then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err)
            res.status(502).json({ Error: err })
        })


    }

}
module.exports = new Login();
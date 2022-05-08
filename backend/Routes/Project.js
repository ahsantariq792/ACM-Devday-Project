// const express=require('express')
// const {authenticate}=require('../Middleware/authMiddleware')
// const router=express.Router()


// const project=require("../Controllers/Project")



// router.post("/createproject",authenticate,project.createproject);
// router.post("/addtasks",authenticate,project.addtasks);
// router.get("/getuserproject",authenticate,project.getalluserprojects)
// router.get("/gettaskofproject",authenticate,project.gettaskofprojects)
// router.put("/updateStatustodotaskofproject",authenticate,project.updateStatustodotaskofproject)
// router.put("/updateStatusinProgresstaskofproject",authenticate,project.updateStatusinProgresstaskofproject)
// router.put("/updateStatusopentaskofproject",authenticate,project.updateStatusopentaskofproject)
// router.put("/updateStatusdonetaskofproject",authenticate,project.updateStatusdonetaskofproject)
// router.put("/updateStatuscompletedtaskofproject",authenticate,project.updateStatuscompletedtaskofproject)

// router.get("/addUsertaskofproject",authenticate,project.addUsertaskofprojects)
// router.post("/addUsertoproject",authenticate,project.addusertoproject)
// router.get("/getusersofproject",authenticate,project.getusersofprojects)
// router.post("/addUsertotask",authenticate,project.addusertotask)
// router.post("/addAdmintotask",authenticate,project.addadmintotask)


// module.exports=router




const express=require('express')
const {authenticate}=require('../Middleware/authMiddleware')
const router=express.Router()
const project=require("../Controllers/Project")

// var nodemailer = require('nodemailer');
// var handlebars = require('handlebars');
// var fs = require('fs');

// const project=require("../Controllers/Project")
// const sendEmail=()=>{
//     return new Promise((resolve, reject) => {




//         let transporter = nodemailer.createTransport({
//             pool: true,
//             host: "smtp.ethereal.email",

//             port: 465,
//             secure: true,
//             service: 'Gmail',

//             auth: {
//                 user: 'asacademy5401@gmail.com', // generated ethereal user
//                 pass: 'asad5401', // generated ethereal password
//             },
//         });


//         var readHTMLFile = function (path, callback) {
//             fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
//                 if (err) {
//                     callback(err);
//                     throw err;

//                 }
//                 else {
//                     callback(null, html);
//                 }
//             });
//         };


//         readHTMLFile(__dirname + "/message.html", function (err, html) {
//             if (html) {
//                 var template = handlebars.compile(html);
//                 var replacements = {
//                    ProjectKey:"ahdvshvshdvh"
//                 };
//                 // handlebars.registerHelper("each", function(context, options) {
//                 //     var ret = "";
                  
//                 //     for (var i = 0, j = data.length; i < j; i++) {
//                 //         console.log(data[i])
//                 //       ret = ret + options.fn(data[i]);
//                 //     }
                  
//                 //     return ret;
//                 //   });
//                 var htmlToSend = template(replacements);
//                 let options = {
//                     from: "asacademy5401@gmail.com", // sender address
//                     to: 'asadali5401@gmail.com', // list of receivers
//                     subject: `Venture Games Order Details`, // Subject line
//                     html: htmlToSend

//                 };
//                 transporter.sendMail(options)
//                     .then((res) => {
//                         return resolve (res)
//                     })
//                     .catch((err) => {
//                         return reject (err)
//                     })
  
//             }
//             else {
//                 console.log(err)
//             }
//         });

//     })
// }

router.post("/createproject",authenticate,project.createproject);
router.post("/addtasks",authenticate,project.addtasks);
router.get("/getuserproject",authenticate,project.getalluserprojects)
router.get("/gettaskofproject",authenticate,project.gettaskofprojects)
router.put("/updateStatustodotaskofproject",authenticate,project.updateStatustodotaskofproject)
router.put("/updateStatusinProgresstaskofproject",authenticate,project.updateStatusinProgresstaskofproject)
router.put("/updateStatusopentaskofproject",authenticate,project.updateStatusopentaskofproject)
router.put("/updateStatusdonetaskofproject",authenticate,project.updateStatusdonetaskofproject)
router.put("/updateStatuscompletedtaskofproject",authenticate,project.updateStatuscompletedtaskofproject)

router.get("/addUsertaskofproject",authenticate,project.addUsertaskofprojects)
router.post("/addUsertoproject",authenticate,project.addusertoproject)
router.get("/getusersofproject",authenticate,project.getusersofprojects)
router.post("/addUsertotask",authenticate,project.addusertotask)
router.post("/addAdmintotask",authenticate,project.addadmintotask)

router.post("/userjoinproject",authenticate,project.userjoinproject)

// router.post("/sendMail",authenticate,sendEmail)

router.get("/gettaskdetails",authenticate,project.gettaskdetails)


router.get("/getaproject",authenticate,project.getaproject)


module.exports=router
const { projectSchema } = require('../Schema/ProjectSchema')
const { taskSchema } = require('../Schema/TasksSchema')
const mongoose = require("mongoose");
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');

const sendEmail = (projectId,email) => {
  return new Promise((resolve, reject) => {




    let transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.ethereal.email",

      port: 465,
      secure: true,
      service: 'Gmail',

      auth: {
        user: 'asacademy5401@gmail.com', // generated ethereal user
        pass: 'asad5401', // generated ethereal password
      },
    });


    var readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
          callback(err);
          throw err;

        }
        else {
          callback(null, html);
        }
      });
    };


    readHTMLFile(__dirname + "/message.html", function (err, html) {
      if (html) {
        var template = handlebars.compile(html);
        var replacements = {
          ProjectKey: projectId
        };

        var htmlToSend = template(replacements);
        let options = {
          from: "asacademy5401@gmail.com", // sender address
          to: email, // list of receivers
          subject: `You are invited on new project`, // Subject line
          html: htmlToSend

        };
        transporter.sendMail(options)
          .then((res) => {
            return resolve(res)
          })
          .catch((err) => {
            return reject(err)
          })

      }
      else {
        console.log(err)
        return reject("email not send")
      }
    });

  })
}


class Project {


  createProject = (req) => {

    const id = req.query.userId
    return new Promise(async (resolve, reject) => {

      try {


        const { projectName } = req.body;

        if (!projectName) {

          return reject("Plz fill all the fields!!")
        }

        const projectUniqueKey = Math.random().toString(36).slice(2)
        const Projectmodel = mongoose.model("projects", projectSchema);



        const projectdata =
        {
          projectName: projectName,
          projectKey: projectUniqueKey,
          createdBy: id,
          admins: [id]
        }



        console.log("pj", projectdata)
        const data = new Projectmodel(projectdata);
        data.save().then((result) => {

          return resolve("Success in Creation of Project")

        }).catch((err) => {
          console.log(err)
          return reject("Insufficient Details");
        })
      } catch (e) {

        return reject("Network Error")

      }

    })
  }



  addTasks = (req) => {

    const id = req.query.userId
    const projectId = req.body.projectId
    return new Promise(async (resolve, reject) => {

      try {


        const { taskName, taskNature, description, status,  projectId } = req.body;

        if (!taskName || !taskNature  || !description || !status  || !projectId) {

          return reject("Plz fill all the fields!!")
        }

        // if (!assignedToAdmin) {

        //   return reject("Must be assign to any user!!")
        // }

        const Taskmodel = mongoose.model("tasks", taskSchema);

        const taskdata =
        {
          taskName: req.body.taskName,
          taskNature: req.body.taskNature,
          createdBy: id,

          description: req.body.description,
          status: req.body.status,
          assignedToAdmin: id,
          projectId: req.body.projectId
        }


        console.log("ts", taskdata)
        const data = new Taskmodel(taskdata);
        data.save().then((result) => {

          return resolve("Successfully task added")

        }).catch((err) => {
          console.log(err)
          return reject("An error occurred");
        })
      } catch (e) {

        return reject("Network Error")

      }

    })
  }




  getallProjectsofuser = (req) => {

    const id = req.query.userId
    return new Promise(async (resolve, reject) => {

      try {
        const Projectmodel = mongoose.model("projects", projectSchema)
        const projectList = Projectmodel.find(
          {
            $or: [
              { users: id },
              { admins: id }

            ]

          }

        )
          .then((result) => {

            return resolve(result)
          }).catch((e) => {

            return reject("No Project Exists")
          })


      } catch (e) {

        return reject("Network Error")

      }

    })
  }




  getTasksofprojects = (req) => {

    const id = req.query.userId
    const projectid = req.query.projectId

    return new Promise(async (resolve, reject) => {

      try {
        const Taskmodel = mongoose.model("TASKS", taskSchema)
        const taskList = Taskmodel.find(
          { projectId: projectid } 
        ).then((result) => {
          return resolve(result)
        }).catch((e) => {

          return reject("No Tasks Exists")
        })


      } catch (e) {

        return reject("Network Error")

      }

    })
  }

  addUsertaskofprojects = (req) => {

    const userId = req.query.userId
    const projectid = req.query.projectId
    // const taskId=req.body.taskId
    const taskId = "6276251c606c50257cdfa02e"

    return new Promise(async (resolve, reject) => {

      try {
        const Taskmodel = mongoose.model("TASKS", taskSchema)
        const taskList = Taskmodel.findOne({ taskId }

          //   { $all: [{ projectId: projectid }] }
          // ).then((result) => {
          //   return resolve(result)
          // }).catch((e) => {

          //   return reject("No Tasks Exists")
          // }
        )
          .then((res) => {
            console.log(res)
          })
        if (taskList) {
          // console.log(taskList)
        }



      } catch (e) {

        return reject("Network Error")

      }

    })
  }
  updateStatustodotaskofproject = (req) => {

    const userId = req.query.userId
    const projectid = req.query.projectId
    const taskId = req.body.taskId
    return new Promise((resolve, reject) => {


      try {
        const Taskmodel = mongoose.model("TASKS", taskSchema)
        const taskList = Taskmodel.findOne({ taskId })
          .then((res) => {
            console.log(res)
            let updatedObj = {}
            updatedObj.status = "in progress"
            updatedObj.todo = { ...res.todo, endDate: Date.now(), completed: true }
            updatedObj.inProgress = { ...res.inProgress, startDate: Date.now() }


            Taskmodel.findByIdAndUpdate(taskId, updatedObj, { new: true }, (err, data) => {
              if (!err) {
                return resolve("updated")
              } else {
                return reject("no user with this id exsists")

              }
            })
          })
          .catch((e) => {
            return reject("no user with this id exsists")
          })
      } catch (e) {
        return reject("Network Error")
      }
    })
  }
  updateStatusinProgresstaskofproject = (req) => {

    const userId = req.query.userId
    const projectid = req.query.projectId
    const taskId = req.body.taskId
    return new Promise((resolve, reject) => {


      try {
        const Taskmodel = mongoose.model("TASKS", taskSchema)
        const taskList = Taskmodel.findOne({ taskId })
          .then((res) => {
            console.log(res)
            let updatedObj = {}
            updatedObj.status = "open"
            updatedObj.inProgress = { ...res.inProgress, endDate: Date.now(), completed: true }
            updatedObj.open = { ...res.open, startDate: Date.now() }
            Taskmodel.findByIdAndUpdate(taskId, updatedObj, { new: true }, (err, data) => {
              if (!err) {
                return resolve("updated")
              } else {
                return reject("no user with this id exsists")
              }
            })
          })
          .catch((e) => {
            return reject("no user with this id exsists")
          })
      } catch (e) {
        return reject("Network Error")
      }
    })
  }

  updateStatusopentaskofproject = (req) => {

    const userId = req.query.userId
    const projectid = req.query.projectId
    const taskId = req.body.taskId
    return new Promise((resolve, reject) => {


      try {
        const Taskmodel = mongoose.model("TASKS", taskSchema)
        const taskList = Taskmodel.findOne({ taskId })
          .then((res) => {
            console.log(res)
            let updatedObj = {}
            updatedObj.status = "done"
            updatedObj.open = { ...res.open, endDate: Date.now(), completed: true }
            updatedObj.done = { ...res.done, startDate: Date.now() }
            Taskmodel.findByIdAndUpdate(taskId, updatedObj, { new: true }, (err, data) => {
              if (!err) {
                return resolve("updated")
              } else {
                return reject("no user with this id exsists")
              }
            })
          })
          .catch((e) => {
            return reject("no user with this id exsists")
          })
      } catch (e) {
        return reject("Network Error")
      }
    })
  }

  updateStatusdonetaskofproject = (req) => {

    const userId = req.query.userId
    const projectid = req.query.projectId
    const taskId = req.body.taskId
    return new Promise((resolve, reject) => {


      try {
        const Taskmodel = mongoose.model("TASKS", taskSchema)
        const taskList = Taskmodel.findOne({ taskId })
          .then((res) => {
            console.log(res)
            let updatedObj = {}
            updatedObj.status = "completed"
            updatedObj.done = { ...res.done, endDate: Date.now(), completed: true }
            updatedObj.completed = { ...res.completed, startDate: Date.now() }
            Taskmodel.findByIdAndUpdate(taskId, updatedObj, { new: true }, (err, data) => {
              if (!err) {
                return resolve("updated")
              } else {
                return reject("no user with this id exsists")
              }
            })
          })
          .catch((e) => {
            return reject("no user with this id exsists")
          })
      } catch (e) {
        return reject("Network Error")
      }
    })
  }
  updateStatuscompletedtaskofproject = (req) => {

    const userId = req.query.userId
    const projectid = req.query.projectId
    const taskId = req.body.taskId
    return new Promise((resolve, reject) => {


      try {
        const Taskmodel = mongoose.model("TASKS", taskSchema)
        const taskList = Taskmodel.findOne({ taskId })
          .then((res) => {
            console.log(res)
            let updatedObj = {}
            updatedObj.status = "completed"
            updatedObj.completed = { ...res.completed, endDate: Date.now(), completed: true }
            // updatedObj.completed={...res.completed,startDate:Date.now()}
            Taskmodel.findByIdAndUpdate(taskId, updatedObj, { new: true }, (err, data) => {
              if (!err) {
                return resolve("updated")
              } else {
                return reject("no user with this id exsists")
              }
            })
          })
          .catch((e) => {
            return reject("no user with this id exsists")
          })
      } catch (e) {
        return reject("Network Error")
      }
    })
  }






  addUserToProject = (req) => {

    const id = req.query.userId
    const projectId = req.query.projectId
    const addId=req.body.addId
    const email=req.body.email

    console.log("here", id, projectId)
    return new Promise(async (resolve, reject) => {

      
      
      try {

        const ProjectModel = mongoose.model("projects", projectSchema);

        ProjectModel.findOne({
          _id: projectId,
          $or: [{ users: { "$in": [addId] } },
          { admins: { "$in": [addId] } }

          ]
        }


        ).then((result) => {
          console.log("res", result)

          if (result) {
            return resolve("User Exists")
          }
          else {
            if (req.body.admin == true) {
              console.log("new admin")
              ProjectModel.findByIdAndUpdate(projectId, { $push: { admins: addId } }).then((rest) => {
                sendEmail(projectId,email)
                console.log(rest)
                return resolve(rest)
              }).catch((e) => {
                return reject("still errior")
              })
            } else {
              ProjectModel.findByIdAndUpdate(projectId, { $push: { users: addId } }).then((rest) => {
                sendEmail(projectId,email)
                console.log(rest)
                return resolve(rest)
              }).catch((e) => {
                return reject("still errior")
              })
            }
          }


        }).catch((e) => {
          return reject("Not Updated")
        })


      }
      catch (e) {

        return reject("Network Error")

      }

    })
  }




  getUserofproject = (req) => {

    const id = req.query.userId
    const projectId = req.query.projectId;

    return new Promise(async (resolve, reject) => {

      try {
        const Projectmodel = mongoose.model("projects", projectSchema)
        const projectList = Projectmodel.findOne({ _id: projectId })
          .then((result) => {

            if (result.users.length == 0) {
              return reject("No User for this Project Exist")
            }
            else {
              return resolve(result.users)
            }


          }).catch((e) => {

            return reject("No Project Exists")
          })


      } catch (e) {

        return reject("Network Error")

      }

    })
  }




  addUserToTask = (req) => {

    const id = req.query.userId
    const taskId = req.query.taskId
    const projectId = req.query.projectId
  const addId=req.body.addId

    console.log("here", id, taskId)
    return new Promise(async (resolve, reject) => {

      try {

        const Taskmodel = mongoose.model("tasks", taskSchema);
        const ProjectModel = mongoose.model("proects", projectSchema);

        ProjectModel.findOne({
          _id: projectId,
          $or: [{ authorizedUsers: { "$in": [addId] } },
          { authorizedAdmins: { "$in": [addId] } }

          ]
        }


        ).then((result) => {
          console.log("res", result)

          // if (result) {
          //   return resolve("User Exists")
          // }
          // else {
            if (req.body.admin == true) {
              console.log("new admin")
              Taskmodel.findByIdAndUpdate(taskId, { $push: { assignedToAdmin: addId } }).then((rest) => {
                console.log(rest)
                return resolve(rest)
              }).catch((e) => {
                return reject("still errior")
              })
            } else {
              Taskmodel.findByIdAndUpdate(taskId, { $push: { assignedToUser: addId } }).then((rest) => {
                console.log(rest)
                return resolve(rest)
              }).catch((e) => {
                return reject("still errior")
              })
            // }
          }


        }).catch((e) => {
          return reject("Not Updated")
        })


      } catch (e) {

        return reject("Network Error")

      }

    })
  }




  addAdminToTask = (req) => {

    const id = req.query.userId
    const taskId = req.query.taskId

    console.log("here", id, taskId)
    return new Promise(async (resolve, reject) => {

      try {

        const Taskmodel = mongoose.model("tasks", taskSchema);
        Taskmodel.updateOne({ _id: taskId }, { $push: { assignedToAdmin: id } }).then((result) => {

          return resolve("succesfully updated")
        }).catch((e) => {
          return reject("Not Updated")
        })


      } catch (e) {

        return reject("Network Error")

      }

    })
  }
  userjoinproject = (req) => {

    const id = req.query.userId
    // const taskId = req.query.taskId
  const projectId=req.body.projectId
// const addId=req.body.addId;
    // console.log("here", id, taskId)
    return new Promise(async (resolve, reject) => {
      try {

        const ProjectModel = mongoose.model("projects", projectSchema);

        ProjectModel.findOne({
          _id: projectId,
          $or: [{ users: { "$in": [id] } },
          { admins: { "$in": [id] } }

          ]
        }


        ).then((result) => {
          console.log("res", result)


          
            if (req.body.admin == true) {
              console.log("new admin")
              ProjectModel.findByIdAndUpdate(projectId, { $push: { authorizedAdmins: id } }).then((rest) => {
                console.log(rest)
                return resolve(rest)
              }).catch((e) => {
                return reject("still errior")
              })
            } else {
              ProjectModel.findByIdAndUpdate(projectId, { $push: { authorizedUsers: id } }).then((rest) => {
                console.log(rest)
                return resolve(rest)
              }).catch((e) => {
                return reject("still errior")
              })
            }
          


        }).catch((e) => {
          return reject("Not Updated")
        })


      }
 catch (e) {

        return reject("Network Error")

      }

    })
  }



  getAProject = (req) => {

    const id = req.query.userId
    const projectId = req.query.projectId;

    return new Promise(async (resolve, reject) => {

      try {
        const Projectmodel = mongoose.model("projects", projectSchema)
        const projectList = Projectmodel.findOne({ _id: projectId })
          .then((result) => {


            return resolve(result)



          }).catch((e) => {

            return reject("No Project Exists")
          })


      } catch (e) {

        return reject("Network Error")

      }

    })
  }




  getTaskDetails = (req) => {

    const id = req.query.userId
    const taskId= req.query.taskId

    return new Promise(async (resolve, reject) => {

      try {
        const Taskmodel = mongoose.model("tasks", taskSchema)
        const taskList = Taskmodel.findById({_id:taskId}
        ).then((result) => {
          return resolve(result)
        }).catch((e) => {

          return reject("No Info")
        })


      } catch (e) {

        return reject("Network Error")

      }

    })
  }

}

module.exports = new Project();
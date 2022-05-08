const ProjectModel = require('../Model/Projects')

class Project {

    createproject = (req, res) => {


        ProjectModel.createProject(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "Plz fill all the fields!!") {
                return res.status(403).json({ "Error": err })

            } if (err == "Insufficient Details") {
                return res.status(403).json({ "Error": err })
            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }




    addtasks = (req, res) => {


        ProjectModel.addTasks(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "Plz fill all the fields!!") {
                return res.status(403).json({ "Error": err })

            } if (err == "Must be assign to any user!!") {
                return res.status(403).json({ "Error": err })
            }
            if (err == "An error occurred!") {
                return res.status(403).json({ "Error": err })
            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }




    getalluserprojects = (req, res) => {


        ProjectModel.getallProjectsofuser(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "No Project Exists") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }



    gettaskofprojects = (req, res) => {


        ProjectModel.getTasksofprojects(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "No Tasks Exists") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }



    addUsertaskofprojects = (req, res) => {


        ProjectModel.addUsertaskofprojects(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "No Tasks Exists") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }
    
    updateStatustodotaskofproject = (req, res) => {

        ProjectModel.updateStatustodotaskofproject(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "No Tasks Exists") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }
    updateStatusinProgresstaskofproject = (req, res) => {

        ProjectModel.updateStatusinProgresstaskofproject(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "No Tasks Exists") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }
    updateStatusopentaskofproject = (req, res) => {

        ProjectModel.updateStatusopentaskofproject(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "No Tasks Exists") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }
    updateStatusdonetaskofproject = (req, res) => {

        ProjectModel.updateStatusdonetaskofproject(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "No Tasks Exists") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }
    updateStatuscompletedtaskofproject = (req, res) => {

        ProjectModel.updateStatuscompletedtaskofproject(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "No Tasks Exists") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }
    
    












addusertoproject= (req, res) => {


        ProjectModel.addUserToProject(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err =="Not Added") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }




    getusersofprojects = (req, res) => {


        ProjectModel.getUserofproject(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "No User for this Project Exist") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }





     addusertotask= (req, res) => {


        ProjectModel.addUserToTask(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err =="Not Added") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }




addadmintotask= (req, res) => {


        ProjectModel.addAdminToTask(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err =="Not Added") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }

    userjoinproject= (req, res) => {


        ProjectModel.userjoinproject(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err =="Not Added") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }
    



    getaproject = (req, res) => {


        ProjectModel.getAProject(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "No Project Exist") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }



    gettaskdetails = (req, res) => {


        ProjectModel.getTaskDetails(req).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            if (err == "No Info") {
                return res.status(403).json({ "Error": err })

            }
            else {
                return res.status(500).json({ "Error": err })

            }
        })
    }

}
module.exports = new Project();


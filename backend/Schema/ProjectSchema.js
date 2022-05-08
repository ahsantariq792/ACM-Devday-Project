const mongoose=require('mongoose')

exports.projectSchema=new mongoose.Schema({

    projectName: {
        type: String,
        required: true
    },
    projectKey: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    admins:
       [{
       type:mongoose.Schema.Types.ObjectId,
       ref:'users',
      
       }]
    ,
    users: 
        [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
       

        }],
        
    authorizedUsers:
    [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
  
    }],
    
    authorizedAdmins:
       [{
       type:mongoose.Schema.Types.ObjectId,
       ref:'users',
       
       }]
    
    // tasks: 
    //     [{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'tasks',
    //     required:true

    //     }]
   
},
    { timestamps: true }
)


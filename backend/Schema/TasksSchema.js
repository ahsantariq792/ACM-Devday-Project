const mongoose=require('mongoose')
const start = Date.now();
var todo = { completed:false,startDate:start,endDate:null };
var restStatus = { completed:false,startDate:null,endDate:null };

exports.taskSchema=new mongoose.Schema({

    taskName: {
        type: String,
        required: true
    },
    taskNature: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    todo:
    {  
    type:Object,
    default:todo 
     },
    inProgress:{  
        type:Object,
        default:restStatus  
        },
    open:{  
        type:Object,
        default:restStatus  
        },
    done:{  
        type:Object,
        default:restStatus  
        },
    completed:{  
        type:Object,
        default:restStatus  
        },

    assignedToUser:
       [{
       type:mongoose.Schema.Types.ObjectId,
       ref:'users',
       required:true
       }]
    ,   
     assignedToAdmin:
       [{
       type:mongoose.Schema.Types.ObjectId,
       ref:'users',
       required:true
       }],
       
    projectId: 
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:'projects',
    required:true

    }
},
    { timestamps: true }
)
import React from 'react'

const Card = () => {
    return (
        <div style={{  margin:'20px'        }} className='cardTask'>
            <div>
                <p>Task Name</p>
                <p> Facebook UI</p>
            </div>
            <div>
                <p>Type</p>
                <p> Bug</p>
            </div>
            <div>
                <p>Status</p>
                <p> To Do</p>
            </div>
            <div>
                <p>Created By</p>
                <p>Asad</p>
            </div>
            <div>
                <p>last Updated</p>
                <p> 05-05-2000</p>
            </div>
            <div className='details'>
                <button >DETAILS</button>
            </div>
        </div>
    )
}

export default Card;
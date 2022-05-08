import React from 'react'
import { Button } from '@mui/material';

const JoinProject = () => {
  return (
    <>
      <div className='createNewProject'>
        <h2>JOIN PROJECT</h2>
      </div>
      <div className='parentcreateNewProject shadow'>

        <div className='childcreateNewProject'>
          <p>ENTER PROJECT ID</p>
          <input></input>
        </div>
        <div className='buttonContainer'>

          <Button id="btn" variant="contained" color="primary" type="submit">
            Join Project
          </Button>

        </div>

      </div>
    </>
  )
}

export default JoinProject;
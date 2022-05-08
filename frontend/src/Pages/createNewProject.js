import React from 'react'
import { Button } from '@mui/material';
import { useState } from 'react';
import { addproject } from '../api/api';
const CreateNewProject = () => {
  const [projectName, setProjectName] = useState("")
  const submit = () => {
    console.log(projectName)
    const id = localStorage.getItem("Id")
    const auth = localStorage.getItem("Token")
    // values.projectId="6276f8362b544ee54b745863"
    // values.status="to do"
    // console.log(values)
    addproject(id, { projectName }, auth)
      .then((res) => {
        if (res.status === 200) {

        }
        else if (res.status === 409) {

        }
        else {
        }
      })
  }
  return (
    <>

      <div className='parentcreateNewProject shadow'>
        <div className='createNewProject'>
          <h2>CREATE NEW PROJECT</h2>
        </div>
        <div className='childcreateNewProject'>
          <p>ENTER PROJECT NAME</p>
          <input value={projectName} onChange={(e) => setProjectName(e.target.value)}></input>
        </div>
        <div className='buttonContainer'>

          <Button onClick={() => submit()} id="btn" variant="contained" color="primary" type="submit">
            New Project
          </Button>

        </div>

      </div>
    </>
  )
}

export default CreateNewProject;
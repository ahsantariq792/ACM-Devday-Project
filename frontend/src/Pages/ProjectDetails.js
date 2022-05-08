import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, getAccordionDetailsUtilityClass } from '@mui/material';
import { baseurl } from '../Core'
import { Link } from 'react-router-dom';
import ImgMediaCard from '../components/ImgMediaCard';
import { getuser,addusertoproject } from '../api/api';
import userEvent from '@testing-library/user-event';
// import { useState } from 'react';
const BasicTable = ({projectId}) => {
    const [loader,setLoader]=useState()
    const [user,setUser]=useState()
    const getData = async (id,auth) => {
        try {
            setLoader(true);
            const api = await getuser(id, auth)
            console.log(api)
    
            // if (search.length > 0) {
            //     let filtered = api.filter((filtered) => {
            //         return filtered._id.toLowerCase().includes(search.toLowerCase()) 

            //     })
            //     setOrders(filtered)
            // }
            // else {
                setUser(api)
            // }
        } catch (err) {
            console.log(err.response);
        } finally {
            setLoader(false);
        }
    }
    const [id,setId]=useState()
    const [auth,setAuth]=useState()
    useEffect(async () => {
        const id = await localStorage.getItem('Id')
        const auth = await localStorage.getItem('Token')
        setId(id)
        setAuth(auth)
        getData(id,auth)
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table sx={{
                minWidth: 350, [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none"
                }
            }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="TableCell" align="center">Employees</TableCell>
                        <TableCell className="TableCell" align="center">Admin</TableCell>
                        <TableCell className="TableCell" align="center">Member</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {user?.map((item,index)=>{
                        console.log(item)
                        return(
                            <TableRow >
                            <TableCell align="center">{item.firstName} {item.lastName}</TableCell>
                            <TableCell align="center"><Button onClick={()=>{
                                addusertoproject(id,{admin:true,addId:item._id,email:item.email},auth,projectId).then((res)=>console.log(res))
                            }} id="btn" variant="contained" color="success" type="submit">ADD AS ADMIN</Button></TableCell>
                            <TableCell align="center"><Button onClick={()=>{
                                addusertoproject(id,{admin:false,addId:item._id,email:item.email},auth,projectId).then((res)=>console.log(res))
                            }} id="btn" variant="contained" color="primary" type="submit">ADD AS MEMBER</Button></TableCell>
                        </TableRow>
                        )
                    })}
                   

                </TableBody>
            </Table>
        </TableContainer>
    );
}


const ProjectDetails = (navigate) => {



    console.log("route", navigate)
    var token = localStorage.getItem("Token")
    var Id = localStorage.getItem("Id")
    console.log("Id", Id)
    const { id } = useParams()
    console.log("id", id)
    console.log(token)
    const [projectTasks, setProjectTasks] = useState([])

    const handler = () => {
        var config = {
            method: 'get',
            url: `${baseurl}/project/gettaskofproject?userId=${Id}&projectId=${id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setProjectTasks(() => response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    useEffect(() => {

        handler()
    }, [])



    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className='mainprojectDetals'>


                <div className="title m-4">
                    <h2>PROJECT DETAILS</h2>
                </div>

                <div className='projectDetails'>
                    <div className='childProjectDetails'>
                        <p>Project Name: </p>
                        <p>Facebook UI</p>
                    </div>
                    <div>
                    </div>
                    <div className='headTasks'>
                        <h3>TASKS</h3>
                        <Link to="/createtask">
                            <Button id="btn" variant="contained" color="success" type="submit">
                                Create New
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className='parentCard'>

                    {
                        projectTasks?.map((item, key) => {
                            return (
                                <>
                                    <ImgMediaCard
                                        id={item._id}
                                        title={item.taskName}
                                        tasknature={item.taskNature}
                                        status={item.status}
                                        createdby={item.createdBy}
                                        lastupdated={item.updatedAt}
                                    />
                                </>
                            )

                        })
                    }


                </div>

                <div className='employees'>
                    <div className='employeeslist'>
                        <h3>ADD EMPLOYEES</h3>
                    </div>
                    <div>
                        <BasicTable projectId={id}></BasicTable>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProjectDetails;
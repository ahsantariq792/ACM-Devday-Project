import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { baseurl } from '../Core';
import axios from 'axios';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const BasicTable = () => {
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
                    <TableRow >
                        <TableCell align="center">Ahsan Tariq</TableCell>
                        <TableCell align="center"><Button id="btn" variant="contained" color="success" type="submit">ADD AS ADMIN</Button></TableCell>
                        <TableCell align="center"><Button id="btn" variant="contained" color="primary" type="submit">ADD AS MEMBER</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">Ahsan Tariq</TableCell>
                        <TableCell align="center"><Button id="btn" variant="contained" color="success" type="submit">ADD AS ADMIN</Button></TableCell>
                        <TableCell align="center"><Button id="btn" variant="contained" color="primary" type="submit">ADD AS MEMBER</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">Ahsan Tariq</TableCell>
                        <TableCell align="center"><Button id="btn" variant="contained" color="success" type="submit">ADD AS ADMIN</Button></TableCell>
                        <TableCell align="center"><Button id="btn" variant="contained" color="primary" type="submit">ADD AS MEMBER</Button></TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    );
}



export default function Details(props) {

    const [posts, setPosts] = useState([])

    const { id } = useParams()
    console.log("id", id)
    const ID = localStorage.getItem("Id")
    console.log("ID", ID)
    var token = localStorage.getItem("Token")


    const handler = () => {
        var config = {
            method: 'get',
            url: `${baseurl}/project/gettaskdetails?userId=${ID}&taskId=${id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setPosts(() => response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        handler()
    }, [])



    return (

        <div className="container py-5">

            <div className="title">
                <h2>TASK DETAILS</h2>
            </div>

            <div className="accordion-body shadow rounded">
                <ul className="ul" style={{ listStyle: 'none' }}>

                    <li className="full"><span className="left">TASK NAME</span><span className="right">{posts?.taskName}</span>
                    </li>
                    <li className="full"><span className="left">TASK NATURE</span><span className="right"> {posts?.taskNature}</span>
                    </li>
                    <li className="full"><span className="left">CREATED BY</span><span className="right"> {posts?.createdBy}</span>
                    </li>
                    <li className="full"><span className="left">START DATE</span> <span className="right"> {posts?.startDate}</span>
                    </li>
                    <li className="full"><span className="left">END DATE</span> <span className="right">{posts?.endDate} </span>
                    </li>
                    <li className="full"><span className="left">STATUS</span> <span className="right"> {posts?.status} </span>
                    </li>
                    <li className="full"><span className="left">ASSIGNED TO</span>
                        <span className="right">
                            id: {posts?.assignedToUser}
                        </span>
                    </li>

                    <li className="full"><span className="left">DESCRIPTION</span>
                    </li>

                    <div className="accordion-body" style={{ textAlign: "center" }}>
                        <p>
                            {posts?.description}
                        </p>
                    </div>
                </ul>

                <div className='employees'>
                    <div className='employeeslist'>
                        <h3>ADD EMPLOYEES</h3>
                    </div>
                    <div>
                        <BasicTable></BasicTable>
                    </div>

                </div>

            </div>

            {/* <div classNameName='py-05'>
                <Button variant="contained" classNameName="productdetailbtn" color="primary">Go Back</Button>
            </div> */}

        </div>



    );
}
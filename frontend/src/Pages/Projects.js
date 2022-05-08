import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { baseurl } from '../Core'
import { useNavigate } from 'react-router-dom'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Projects() {
    let navigate = useNavigate();
    const [userdata, setUserdata] = useState()
    const { id } = useParams()
    console.log(id)

    var token = localStorage.getItem("Token")
    console.log(token)


    const handler = (e) => {
        var config = {
            method: 'get',
            url: `${baseurl}/project/getuserproject?userId=${id}`,
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.NjI3NmVkZGNjM2JhZWIyZjI5M2IxYmEz.RqI5-sNwVXmPVVTRRlkIXegr_vPD2t2Zf1DKr6u2Cvw`
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setUserdata(() => response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    useEffect(() => {
        handler()
        return () => {
            console.log("cleanup")
        }
    }, [])

    const toGo = (id, name) => {

        navigate(`/projectdetails/${id}`, name)
    }

    const Report = (id) => {
        navigate(`/charts/${id}`)

    }

    const handleDragEnd = (e) => {
        if (!e.destination) return;
        let tempData = Array.from(userdata);
        let [source_data] = tempData.splice(e.source.index, 1);
        tempData.splice(e.destination.index, 0, source_data);
        setUserdata(tempData);
    };




    return (
        <>


            <div className="table-container">
                <div className="title">
                    <h2>YOUR PROJECTS</h2>
                </div>

                <div>
                    <div className='heading'>
                        <h5>Projects</h5>
                        <Link to="/createnewproject">
                            <Button id="btn" variant="contained" color="success" type="submit">
                                Create New
                            </Button>
                        </Link>

                    </div>







                    <div className="table-heading">
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <table className="table">
                                <thead>
                                    <th></th>
                                    <th>Project Name</th>
                                    <th>Project Key</th>
                                    <th>Details</th>
                                    <th>Reports</th>
                                </thead>

                                <Droppable droppableId="droppable-1">
                                    {(provider) => (
                                        <tbody
                                            className="text-capitalize"
                                            ref={provider.innerRef}
                                            {...provider.droppableProps}
                                        >

                                            {userdata?.map((post, index) => (
                                                <Draggable
                                                    key={post._id}
                                                    draggableId={post._id}
                                                    index={index}
                                                >

                                                    {(provider) => (
                                                        <tr {...provider.draggableProps} ref={provider.innerRef}>
                                                            <td {...provider.dragHandleProps}> = </td>
                                                            <td data-label="Project Name">{post?.projectName}</td>
                                                            <td data-label="Project Key">{post?.projectKey}</td>
                                                            <td data-label="Details"><a onClick={() => { toGo(post?._id, post?.projectName) }} className="btn">See Details</a></td>
                                                            <td data-label="Details"><a onClick={() => { Report(post?._id) }} className="btn">See Report</a></td>
                                                        </tr>
                                                    )}


                                                </Draggable>
                                            ))}
                                            {provider.placeholder}
                                        </tbody>
                                    )}
                                </Droppable>
                            </table>
                        </DragDropContext>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Projects

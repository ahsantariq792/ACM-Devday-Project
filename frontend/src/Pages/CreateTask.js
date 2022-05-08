import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { addtask } from '../api/api'

const validationSchema = yup.object({

    taskName: yup
        .string('Enter title')
        .min(4, 'title should be of minimum 4 characters length')
        .required('title is required'),
    taskNature: yup
        .string('Enter title')
        .min(4, 'title should be of minimum 4 characters length')
        .required('title is required'),
    description: yup
        .string('Enter your description')
        .min(4, 'description should be of minimum 30 characters length')
        .required('description is required'),
});





function CreateTask() {
   

    const submit = async (values) => {
        const id = localStorage.getItem("Id")
        const auth = localStorage.getItem("Token")
    values.projectId="6276f8362b544ee54b745863"
    values.status="to do"
    console.log(values)
        addtask(id, values, auth)
            .then((res) => {
                if (res.status === 200) {

                }
                else if (res.status === 409) {

                }
                else {
                }
            })
        console.log(values)
    }





    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            taskName: "",
            taskNature: "",
            description: "",
        },
        onSubmit: submit
    },
    );













    return (
        <>
            <div className="container-form">
                <div className="title">
                    <h2>CREATE TASK</h2>
                </div>
                <div className="form">
                    <form onSubmit={formik.handleSubmit}>


                        <div className="section">
                            <div className="header_title">
                                INCLUDE SOME DETAILS
                            </div>


                            <div className="input_field">
                                <label className="form-table">Task Name</label>
                                <TextField
                                    name="taskName"
                                    id="taskName"
                                    className="form-input"
                                    value={formik.values.taskName}
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    error={formik.touched.taskName && Boolean(formik.errors.taskName)}
                                    helperText={formik.touched.taskName && formik.errors.taskName}
                                />
                            </div>

                            <div className="input_field">
                                <label className="form-table">Task Nature</label>
                                <TextField
                                    name="taskNature"
                                    id="taskNature"
                                    className="form-input"
                                    value={formik.values.taskNature}
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    error={formik.touched.taskNature && Boolean(formik.errors.taskNature)}
                                    helperText={formik.touched.taskNature && formik.errors.taskNature}
                                />
                            </div>

                            <div className="input_field">
                                <label className="form-table">Description</label>
                                <TextField
                                    name="description"
                                    id="description"
                                    className="textarea"
                                    multiline
                                    minRows={4}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    variant="filled"
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                            </div>







                        </div>

                        <div className="section" id="last_section">
                            <div className="input_field createTaskbtn">
                                <Button id="btn" variant="contained" color="success" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}

export default CreateTask;

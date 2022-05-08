// import '../App.css';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginPic from "../images/login.jpg"
import { baseurl } from "../Core"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/Context';
import { useContext } from "react";



const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),

  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});





function Login() {

  let navigate = useNavigate();

  let { state, dispatch } = useContext(GlobalContext);

  const submit = async (values) => {
    console.log("values", values)

    const { email, password } = values

    var data = JSON.stringify({
      "email": email,
      "password": password
    });
    console.log(data)

    var config = {
      method: 'post',
      url: `${baseurl}/loginuser/loginUser`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {

        dispatch({
          type: "USER_LOGIN",
          payload: {
            _id: response.data.ID
          }
        })

        console.log("id", response.data)
        localStorage.setItem("Token", response.data.Token)
        localStorage.setItem("Id", response.data.ID)

        navigate(`/projects/${response.data.ID}`)

      })
      .catch(function (error) {
        console.log(error);
      });

  }




  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: 'ahsan122244@gmail.com',
      password: '12345678',
    },
    onSubmit: submit
  },
  );


  return (
    <>
      <div className="container">

        <div className="row m-5 no-gutters shadow" >
          <div className="col-md-6 d-none d-md-block">

            <div style={{ backgroundColor: "#ffffff", display: "flex", justifyContent: "center" }}><center>
              <img style={{ height: "470px" }} src={LoginPic} /></center>
            </div>
          </div>
          <div className="col-md-6  p-5">
            <h2 className="pb-4" style={{ fontFamily: "corbel", marginBottom: "10px" }}><center><b> WELCOME </b></center></h2><br />
            <div className="form-style">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group pb-3">

                  <TextField
                    id="outlined-basic"
                    name="email"
                    label="email"
                    className="inputbox"
                    value={formik.values.email}
                    onChange={formik.handleChange}

                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                    variant="outlined" />

                </div>
                <div className="form-group pb-3">

                  <TextField
                    id="outlined-basic"
                    name="password"
                    label="password"
                    type="password"
                    className="inputbox"

                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
                    variant="outlined" />

                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div style={{ color: "green" }}>New User?</div>
                  </div>
                  <div style={{ color: "blue" }}>Forget Password?</div>
                </div><br />
                <div className="pb-2">
                  <button type="submit" id="userbtn" className="btn btn-dark w-100 font-weight-bold mt-2">LOGIN</button>
                </div>
              </form>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
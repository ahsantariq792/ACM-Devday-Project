import './App.css';
import CreateTask from './Pages/CreateTask';
import Signup from './Pages/Signup';
import Login from './Pages/LoginForm';
import Navbar from './components/Navbar/Navbar';
import CreateNewProject from './Pages/createNewProject'
import ProjectDetails from './Pages/ProjectDetails'
import Projects from './Pages/Projects';
import Charts from './Pages/Charts';
import Details from './Pages/Details';
import JoinProject from './Pages/JoinProject';
import { Routes, Route } from 'react-router-dom';
import { GlobalContext } from './context/Context';
import { useContext } from "react";
import { getNativeSelectUtilityClasses } from '@mui/material';

function App() {
  let { state, dispatch } = useContext(GlobalContext);


  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Login />} />
        <Route path="/createtask" element={<CreateTask />} />
        <Route path="/createnewproject" element={<CreateNewProject />} />
        <Route path="/projects/:id" element={<Projects />} />
        <Route path="/projectdetails/:id" element={<ProjectDetails />} />
        <Route path="/charts/:id" element={<Charts />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path='/joinproject' element={<JoinProject />} />
      </Routes>




    </>
  )
}


export default App;
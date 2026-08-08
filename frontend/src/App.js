import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StudentDashboard from "./dashboard/StudentDashboard";
import CompanyDashboard from "./dashboard/CompanyDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import Internships from "./pages/Internships";
import MyApplications from "./pages/MyApplications";
import PostInternship from "./pages/PostInternship";
import MyInternships from "./pages/MyInternships";
import EditInternship from "./pages/EditInternship";
import ViewApplications from "./pages/ViewApplications";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/register" element={<Register />} />

                <Route path="/login" element={<Login />} />

                <Route path="/student/dashboard" element={<ProtectedRoute role="student"> <StudentDashboard /> </ProtectedRoute> }/>
                
                <Route path="/company/dashboard" element={<ProtectedRoute role="company"><CompanyDashboard /></ProtectedRoute>}/>
                
                <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}/>
                
                <Route path="/internships" element={<ProtectedRoute role="student"> <Internships /></ProtectedRoute>}/>

                <Route path="/my-applications" element={<ProtectedRoute role="student"><MyApplications /></ProtectedRoute>}/>
             
                <Route path="/post-internship" element={<ProtectedRoute role="company"><PostInternship /></ProtectedRoute>}/>
                
                <Route path="/company/internships" element={<ProtectedRoute role="company"><MyInternships /></ProtectedRoute>}/>
                
                <Route path="/company/edit/:id" element={<ProtectedRoute role="company"><EditInternship /></ProtectedRoute>}/>

                <Route path="/company/applications" element={<ProtectedRoute role="company"><ViewApplications /></ProtectedRoute>}/>

                

            </Routes>
            <Footer/>
            <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

        </BrowserRouter>

    );

}

export default App;
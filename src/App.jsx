import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Confirmation from "./pages/Confirmation";
import MyAppointments from "./pages/MyAppointments";
import AppointmentDetails from "./pages/AppointmentDetails";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import About from "./pages/About";
import { Toaster } from "react-hot-toast";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:doctorId" element={<DoctorDetails />} />

        <Route
          path="/appointment/:doctorId"
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointment-confirmed/:appointmentId"
          element={
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute>
              <MyAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments/:appointmentId"
          element={
            <ProtectedRoute>
              <AppointmentDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
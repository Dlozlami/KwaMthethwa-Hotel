import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import Home from "./pages/home/home";
import Rooms from "./pages/rooms/rooms";
import Experiences from "./pages/experiences/experiences";
import Contact from "./pages/contact";
import Dining from "./pages/dining/dining";
import NoPage from "./pages/noPage";
import Bookings from "./pages/checkout/bookings";
import Login from "./pages/login";
import Register from "./pages/register";
import Successful from "./pages/checkout/paymentSuccessful";
import Cancelled from "./pages/checkout/paymentCancelled";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="dining" element={<Dining />} />
        <Route path="experiences" element={<Experiences />} />
        <Route path="contact" element={<Contact />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="successful" element={<Successful />} />
        <Route path="cancelled" element={<Cancelled />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

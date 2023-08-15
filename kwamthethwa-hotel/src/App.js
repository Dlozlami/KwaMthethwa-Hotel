import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import Home from "./pages/home";
import Rooms from "./pages/rooms";
import Experiences from "./pages/experiences";
import Contact from "./pages/contact";
import Dining from "./pages/dining";
import NoPage from "./pages/noPage";
import Bookings from "./pages/bookings";
import Login from "./pages/login";
import Register from "./pages/register";
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
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

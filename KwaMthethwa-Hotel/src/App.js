import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import Home from "./pages/home/home";
import Rooms from "./pages/rooms/rooms";
import Experiences from "./pages/experiences/experiences";
import Contact from "./pages/contact";
import Dining from "./pages/dining/dining";
import NoPage from "./pages/noPage";
import Bookings from "./pages/checkout/bookings";
import Login from "./pages/login/login";
import Register from "./pages/register";
import Successful from "./pages/checkout/paymentSuccessful";
import Cancelled from "./pages/checkout/paymentCancelled";
import ClientServices from "./pages/login/clientServices";
import AdminDashboard from "./pages/login/adminDashboard";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { setUserData, setIsLoggedIn } from "./features/login/loginSlice";

export default function App() {
  const { isLoggedIn, isAdmin } = useSelector((store) => store.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("KMHjwtUser");
    if (token) {
      // If token is present, dispatch setUserData action with the decoded token
      const decodedToken = jwt_decode(token);
      dispatch(setUserData(decodedToken));
      dispatch(setIsLoggedIn(true));
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="dining" element={<Dining />} />
        <Route path="experiences" element={<Experiences />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="bookings"
          element={isLoggedIn ? <Bookings /> : <Login />}
        />
        <Route
          path="login"
          element={isAdmin ? <AdminDashboard /> : <Login />}
        />
        <Route path="register" element={<Register />} />
        <Route
          path="successful"
          element={isLoggedIn ? <Successful /> : <Login />}
        />
        <Route
          path="cancelled"
          element={isLoggedIn ? <Cancelled /> : <Login />}
        />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import Home from "./pages/home/home";
import Rooms from "./pages/rooms/rooms";
import Contact from "./pages/contact";
import NoPage from "./pages/noPage";
import Bookings from "./pages/checkout/bookings";
import Login from "./pages/login/login";
import Register from "./pages/register";
import Successful from "./pages/checkout/paymentSuccessful";
import Cancelled from "./pages/checkout/paymentCancelled";
import AdminDashboard from "./pages/login/adminDashboard";
import ClientPortal from "./pages/login/clientPortal";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshLogin } from "./features/login/loginSlice";
import AllBookings from "./pages/allBookings";
import UserBookings from "./pages/userBookings";

export default function App() {
  const { isLoggedIn, isAdmin } = useSelector((store) => store.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshLogin());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<Rooms />} />
        {isLoggedIn ? (
          <Route
            path="profile"
            element={isAdmin ? <AdminDashboard /> : <ClientPortal />}
          />
        ) : (
          <Route path="profile" element={<Login />} />
        )}
        <Route path="contact" element={<Contact />} />
        <Route
          path="bookings"
          element={isLoggedIn ? <Bookings /> : <Login />}
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="successful"
          element={isLoggedIn ? <Successful /> : <Login />}
        />
        <Route
          path="cancelled"
          element={isLoggedIn ? <Cancelled /> : <Login />}
        />

        <Route
          path="allbookings"
          element={isLoggedIn ? <AllBookings /> : <Login />}
        />
        <Route
          path="userbookings/:id"
          element={isLoggedIn ? <UserBookings /> : <Login />}
        />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

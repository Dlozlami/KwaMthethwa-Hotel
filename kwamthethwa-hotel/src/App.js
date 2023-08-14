import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import Home from "./pages/home";
import Rooms from "./pages/rooms";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<Rooms />} />
        {/*0
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
      </Route>
    </Routes>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footers from "./components/Footer";
import SignUp from "./pages/SignUp";
import Signin from "./pages/SignIn";
import About from "./pages/About";
import ScheduleCollection from "./pages/ScheduleCollection";
import QRPage from "./pages/QRPage";
import Report from "./pages/Report";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import WasteProduction from "./pages/WasteProduction";

export default function App() {
  return (
    <BrowserRouter>
      {/* Component-based pattern: Using the Header component */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/schedule/collection" element={<ScheduleCollection />} />
        <Route path="/qr/scan" element={<QRPage />} />
        <Route path="/report" element={<Report />} />
        <Route path="/production" element={<WasteProduction />} />
        <Route path="/qr/generate" element={<QRCodeGenerator />} />
      </Routes>
      {/* Component-based pattern: Using the Footer component */}
      <Footers />
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import About from "../About/About";
import Home from "../Home/Home";
import Server from "../Server/Server";

const NavBar = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Nav />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/server" element={<Server />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default NavBar;

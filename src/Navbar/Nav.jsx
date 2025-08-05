import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "الصفحة الرئسية", path: "/" },
    { name: "صفحة القرآن", path: "/about" },
    { name: "صفحة الحديث", path: "/server" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-full bg-white shadow-md overflow-hidden flex items-center justify-center">
    <img
      src="/Imgs/ChatGPT Image Aug 5, 2025, 05_28_24 AM.png"
      alt="logo"
      className="w-full h-full object-cover"
    />
  </div>
  <h1 className="text-2xl font-extrabold tracking-wide text-white drop-shadow-md font-[Cairo]">
    نداء السماء
  </h1>
</div>



        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-amber-400 text-black shadow-md"
                      : "hover:bg-white hover:text-blue-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden absolute top-full left-0 w-full bg-white text-gray-800 shadow-md border-t">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-3 border-b text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-amber-400 text-black"
                      : "hover:bg-gray-100"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Nav;

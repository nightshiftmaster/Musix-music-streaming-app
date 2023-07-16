import { useState, useEffect, useRef, forwardRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({
  link,
  setLink,
  setMobileMenuOpen,
  mobileMenuOpen,
  handleClick,
}) => (
  <div className="mt-10">
    {links.map((item) => {
      return (
        <NavLink
          key={item.name}
          to={item.to}
          onClick={() => {
            setMobileMenuOpen(false);
            setLink(!link);
            return handleClick && handleClick();
          }}
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      );
    })}
  </div>
);

const Sidebar = ({ link, setLink }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="lg:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <Link to={`/`}>
          <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        </Link>

        <NavLinks
          link={link}
          setLink={setLink}
          setMobileMenuOpen={setMobileMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />
      </div>
      <div className="absolute lg:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h6 text-white mr-2"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>
      <div
        className={`fixed h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-30 p-6 lg:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks
          link={link}
          setLink={setLink}
          setMobileMenuOpen={setMobileMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />
      </div>
    </>
  );
};
export default Sidebar;

import { useState } from "react";
import { Link } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ link, setLink, setMobileMenuOpen }) => {
  const [activeLink, setActiveLink] = useState("Discover");
  return (
    <div className="mt-10">
      {links.map((item) => {
        return (
          <Link
            to={item.to}
            key={item.name}
            onClick={(e) => {
              setActiveLink(e.target.innerText);
              setMobileMenuOpen(false);
              setLink(!link);
              return;
            }}
            className={`flex flex-row justify-start ${
              activeLink === item.name ? "active" : null
            } items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400`}
          >
            <item.icon className="w-6 h-6 mr-2" />
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

const Sidebar = ({ link, setLink }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div
        className="lg:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]"
        data-testid="sidebar"
      >
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
      <div className="z-40 absolute lg:hidden block top-5 right-2">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>
      <div
        className={`fixed h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-50 p-6 lg:hidden smooth-transition ${
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

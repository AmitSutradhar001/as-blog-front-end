import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import HamburgerMenu from "./HamburgerMenu";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toggleTheme } from "../redux/theme/themeSlice.js";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme } = useSelector((state) => state.theme);
  const path = location.pathname;
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const getNavLinkClass = (to) => {
    return path === to
      ? "block px-4 py-2 dark:text-gray-200  text-blue-800 font-bold rounded-lg hover:bg-gray-300"
      : "block px-4 py-2 dark:text-gray-200  text-gray-800 hover:bg-gray-300 rounded-lg";
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <>
      <Navbar className="border-b-2 flex justify-around px-10">
        <Link
          to={"/"}
          className="self-center whitespace-nowrap text-sm sm:text-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 px-5 py-2 rounded-tl-lg rounded-br-lg"
        >
          AsBlog
        </Link>
        <form onSubmit={handleSubmit} className="lg:w-72 md:w-48">
          <TextInput
            className="hidden sm:inline"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            rightIcon={() => (
              <button type="submit">
                <AiOutlineSearch className="w-8 h-8 text-green-400 mt-1 cursor-pointer" />
              </button>
            )}
          />
        </form>
        <div className="hidden md:flex">
          <NavLink to="/" className={getNavLinkClass("/")}>
            Home
          </NavLink>
          <NavLink to="/about" className={getNavLinkClass("/about")}>
            About
          </NavLink>
        </div>
        <div className="flex gap-5 text-center">
          <Button
            onClick={() => dispatch(toggleTheme())}
            className="w-10 h-10 border-2 border-gray-600 items-center dark:bg-gray-500"
          >
            {theme === "light" ? (
              <FaMoon className="text-black dark:text-white" />
            ) : (
              <FaSun className="text-black dark:text-white" />
            )}
          </Button>
          {currentUser ? (
            <div className="relative cursor-pointer">
              {currentUser.user.profilePicture ? (
                <img
                  src={currentUser.user.profilePicture}
                  onClick={toggleMenu}
                  className="rounded-full w-10 h-10"
                />
              ) : (
                <div className="p-6 rounded-full w-6 h-6 bg-gray-300"></div>
              )}

              {isOpen && (
                <div className="absolute z-50 right-0 w-28 mt-2 py-2 bg-white border rounded shadow-xl dark:bg-gray-800 dark:border-gray-700">
                  <NavLink
                    onClick={() => setIsOpen((pre) => !pre)}
                    to="/dashboard?tab=profile"
                    className={`${getNavLinkClass(
                      "/profile"
                    )} dark:text-white hover:dark:text-gray-900`}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    onClick={() => setIsOpen((pre) => !pre)}
                    to="/dashboard?tab=posts"
                    className={`${getNavLinkClass(
                      "/posts"
                    )} dark:text-white hover:dark:text-gray-900`}
                  >
                    Posts
                  </NavLink>
                  <button
                    onClick={() => setIsOpen((pre) => !pre)}
                    className="text-center py-2 text-blue-800 font-bold px-4 hover:text-red-500 dark:text-blue-400 dark:hover:text-red-500"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/signin"}>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Sign In
                </span>
              </button>
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <HamburgerMenu />
        </div>
      </Navbar>
    </>
  );
};

export default Header;

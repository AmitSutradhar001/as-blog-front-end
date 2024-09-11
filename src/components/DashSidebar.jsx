import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const [tab, setTab] = useState("");
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.user.isAdmin);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-64 h-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link
            to="/dashboard?tab=profile"
            className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Sidebar.Item
              active={tab === "profile"}
              className="w-52"
              label={currentUser.user.isAdmin ? "Admin" : "User"}
              as="div"
            >
              <div className="w-full flex justify-between">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </div>
            </Sidebar.Item>
          </Link>

          {currentUser.user.isAdmin && (
            <>
              <Link
                to="/dashboard?tab=dashboard"
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Sidebar.Item
                  active={tab === "dashboard"}
                  className="w-52"
                  as="div"
                >
                  <div className="w-full flex justify-between">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7"
                      fill="none"
                      viewBox="0 0 96 96"
                      id="dashboard"
                    >
                      <rect
                        width="32"
                        height="32"
                        x="10"
                        y="54"
                        stroke="currentColor"
                        strokeWidth="5"
                        rx="9"
                      ></rect>
                      <rect
                        width="32"
                        height="32"
                        x="10"
                        y="10"
                        stroke="currentColor"
                        strokeWidth="5"
                        rx="9"
                      ></rect>
                      <rect
                        width="32"
                        height="32"
                        x="54"
                        y="10"
                        stroke="currentColor"
                        strokeWidth="5"
                        rx="9"
                      ></rect>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="5"
                        d="M70 57L70 83M83 70L57 70"
                      ></path>
                    </svg>

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Dashboard
                    </span>
                  </div>
                </Sidebar.Item>
              </Link>
              <Link
                to="/dashboard?tab=posts"
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Sidebar.Item
                  active={tab === "posts"}
                  className="w-52"
                  as="div"
                >
                  <div className="w-full flex justify-between">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      id="new-post"
                      className="text-black dark:text-white"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M4 4.75C3.30964 4.75 2.75 5.30964 2.75 6V20C2.75 20.6904 3.30964 21.25 4 21.25H6.5C6.91421 21.25 7.25 21.5858 7.25 22 7.25 22.4142 6.91421 22.75 6.5 22.75H4C2.48122 22.75 1.25 21.5188 1.25 20V6C1.25 4.48122 2.48122 3.25 4 3.25H13.5C13.9142 3.25 14.25 3.58579 14.25 4 14.25 4.41421 13.9142 4.75 13.5 4.75H4zM20 9.75C20.4142 9.75 20.75 10.0858 20.75 10.5V20C20.75 21.5188 19.5188 22.75 18 22.75H10.5C10.0858 22.75 9.75 22.4142 9.75 22 9.75 21.5858 10.0858 21.25 10.5 21.25H18C18.6904 21.25 19.25 20.6904 19.25 20V10.5C19.25 10.0858 19.5858 9.75 20 9.75zM15.25 5C15.25 4.58579 15.5858 4.25 16 4.25H22C22.4142 4.25 22.75 4.58579 22.75 5 22.75 5.41421 22.4142 5.75 22 5.75H16C15.5858 5.75 15.25 5.41421 15.25 5z"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M19 8.75C18.5858 8.75 18.25 8.41421 18.25 8V2C18.25 1.58579 18.5858 1.25 19 1.25C19.4142 1.25 19.75 1.58579 19.75 2V8C19.75 8.41421 19.4142 8.75 19 8.75Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>

                    <span className="flex-1 ms-3 whitespace-nowrap">Posts</span>
                  </div>
                </Sidebar.Item>
              </Link>
              <Link
                to="/dashboard?tab=users"
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Sidebar.Item
                  active={tab === "users"}
                  className="w-52"
                  as="div"
                >
                  <div className="w-full flex justify-between">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 62 62"
                      id="users"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g fill="currentColor" transform="translate(-609 -140)">
                          <g transform="translate(608 139)">
                            <path
                              stroke="currentColor"
                              d="M51.81 35.962h-6.4c-.915 0-1.524-.61-1.524-1.524s.61-1.524 1.524-1.524h6.4c1.523 0 3.047-.304 4.571-.61.914-.304 1.524-.609 2.133-.914.61-.304.915-1.219.915-1.828 0-.61-.305-1.22-.61-1.829-1.524-1.828-4.267-3.047-7.924-4.266-.305 0-.305-.305-.61-.305-.914-.61-1.523-1.524-1.828-2.438 0-1.22.61-2.134 1.524-2.743 2.133-3.048 3.352-5.79 3.048-8.229-.305-1.523-.915-2.742-2.134-3.657-2.133-1.524-5.18-1.524-7.01 0-1.218.915-1.828 2.134-2.133 3.657-.304 2.438.915 5.181 3.048 8.229.61.61.305 1.524-.305 2.133-.61.61-1.524.305-2.133-.304-3.048-3.658-4.267-7.315-3.657-10.667.305-2.133 1.524-4.267 3.352-5.486 3.048-2.438 7.62-2.438 10.667 0 1.828 1.524 3.047 3.353 3.352 5.486.305 3.352-.914 7.01-3.657 10.667-.305.304-.305.609-.61.609 0 0 .305 0 .305.305 3.962 1.219 7.01 3.047 8.838 5.18.915.915 1.524 2.439 1.524 3.963a5.332 5.332 0 01-2.133 4.266c-.914.61-1.829 1.22-3.048 1.524-1.828 0-3.657.305-5.485.305zM18.59 35.962h-6.4c-2.133 0-3.961-.305-5.485-.914-1.22-.305-2.134-.915-3.048-1.524-1.219-.914-2.133-2.743-2.133-4.267 0-1.524.61-2.743 1.524-3.962 2.133-2.133 5.18-3.657 9.142-4.876 0 0 .305 0 .305-.305 0 0-.305-.304-.305-.61C9.143 15.849 7.62 11.887 8.23 8.839c.304-2.133 1.523-4.267 3.352-5.486 3.048-2.438 7.619-2.438 10.667 0 1.828 1.524 3.047 3.353 3.352 5.486.305 3.352-.914 7.01-3.657 10.667-.61.61-1.524.61-2.133.305-.61-.61-.915-1.524-.305-2.134 2.438-3.047 3.352-6.095 3.047-8.228 0-1.524-.914-2.743-2.133-3.658-2.133-1.523-4.876-1.523-7.01 0-1.219.915-2.133 2.134-2.133 3.353-.305 2.438.914 5.18 3.048 8.228.61.915 1.524 1.829 1.219 2.743 0 1.22-.914 1.829-1.829 2.438 0 0-.304.305-.61.305-3.352 1.524-5.79 2.743-7.618 4.572-.305.61-.61 1.219-.61 1.828 0 .914.305 1.524.914 1.829.61.304 1.22.61 2.134.914 1.219.61 2.743.914 4.266.914h6.4c.915 0 1.524.61 1.524 1.524s-.61 1.524-1.524 1.524z"
                            ></path>
                            <path
                              stroke="currentColor"
                              d="M38.4 62.476H25.905c-2.743 0-5.181-.305-7.315-1.219-1.523-.61-2.742-1.219-3.657-2.133-1.828-.914-2.743-3.048-2.743-5.181 0-1.829.61-3.353 1.829-4.876 2.438-2.743 6.4-4.877 11.886-6.705l.914-.914-.914-.915c-3.962-5.18-5.79-9.752-5.181-14.019.61-2.743 1.828-5.18 4.266-7.01 3.962-2.742 10.058-2.742 13.715 0 2.438 1.83 3.962 4.267 4.266 7.01.61 4.267-1.219 9.143-4.876 14.02-.914.914-.914 1.218-.914 1.218s.61.305.914.61c5.486 1.828 9.448 3.962 11.886 6.705 1.219 1.219 1.829 3.047 1.829 4.876 0 2.133-.915 4.267-2.439 5.486-.914.914-2.133 1.523-3.657 2.133-2.438.61-4.876.914-7.314.914zM32 20.114c-1.829 0-3.657.61-5.181 1.524-1.829 1.22-2.743 3.048-3.048 5.181-.304 3.352 1.22 7.314 4.267 11.581.914.914 1.829 1.829 1.524 3.352 0 1.22-1.22 2.134-2.133 3.048 0 0-.305.305-.61.305-5.18 1.524-8.533 3.657-10.971 6.095-.305.61-.61 1.829-.61 2.743 0 1.219.61 2.438 1.524 3.047.61.61 1.828 1.22 3.048 1.524 1.828.61 3.961.915 6.095.915H38.4c2.133 0 4.267-.305 6.095-.915 1.22-.304 2.134-.914 3.048-1.524.914-.609 1.524-1.828 1.524-3.047 0-.914-.305-2.133-1.22-2.743-2.133-2.438-5.79-4.267-10.97-6.095-.306 0-.306-.305-.61-.305-.915-.914-2.134-1.829-2.134-3.048s.915-2.438 1.829-3.352c3.048-3.962 4.571-8.229 4.267-11.581-.305-2.133-1.22-3.657-3.048-5.18-1.524-.915-3.352-1.525-5.181-1.525z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>

                    <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                  </div>
                </Sidebar.Item>
              </Link>
              <Link
                to="/dashboard?tab=comments"
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Sidebar.Item
                  active={tab === "comments"}
                  className="w-52"
                  as="div"
                >
                  <div className="w-full flex justify-between">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width="26"
                      height="26"
                      id="comment"
                      className="text-black dark:text-white"
                    >
                      <path
                        fill="currentColor"
                        d="M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
                      ></path>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Comments
                    </span>
                  </div>
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Link
            to="/dashboard?tab=profile"
            className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Sidebar.Item className="w-52" as="div">
              <div className="w-full flex justify-between">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </div>
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;

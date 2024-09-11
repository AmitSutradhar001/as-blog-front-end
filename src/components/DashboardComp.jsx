import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
const DashboardComp = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotlUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const { user } = useSelector((state) => state.user.currentUser);
  const api = useApi();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get(import.meta.env.VITE_GET_USERS + "?limit=5", {
          headers: {
            "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
          },
        });
        if (res.status == 200) {
          setUsers(res.data.users);
          setTotlUsers(res.data.totalUsers);
          setLastMonthUsers(res.data.lastMonthUsers);
        }
        console.log(res);
      } catch (error) {
        const err =
          error.response.data.message ||
          error.message ||
          "Something went wrong!";
        return toast.error(err);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await api.get(
          import.meta.env.VITE_GET_RECENT_POSTS_ROUTE + 5,
          {
            headers: {
              "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
            },
          }
        );
        if (res.status == 200) {
          setPosts(res.data.posts);
          setTotalPosts(res.data.totalPosts);
          setLastMonthPosts(res.data.lastMonthPosts);
        }
        console.log(res);
      } catch (error) {
        const err =
          error.response.data.message ||
          error.message ||
          "Something went wrong!";
        return toast.error(err);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await api.get(
          import.meta.env.VITE_GET_COMMENTS_COMMENT + "?limit=5",
          {
            headers: {
              "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
            },
          }
        );
        if (res.status == 200) {
          setComments(res.data.comments);
          setTotalComments(res.data.totalComments);
          setLastMonthComments(res.data.lastMonthComments);
        }
        console.log(res);
      } catch (error) {
        const err =
          error.response.data.message ||
          error.message ||
          "Something went wrong!";
        return toast.error(err);
      }
    };
    if (user.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, []);
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        {/* Total Users */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        {/* Total Comments */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        {/* total Posts */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        {/* All Users */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Link
              to={"/dashboard?tab=users"}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                See all
              </span>
            </Link>
          </div>
          <div className="relative w-full mt-5 mr-4 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center rtl:text-center text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td scope="row" className="px-6 py-4 ">
                        <img
                          src={user.profilePicture}
                          className="w-7 h-7 rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4">{user.username}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* All Comments */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Link
              to={"/dashboard?tab=comments"}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                See all
              </span>
            </Link>
          </div>
          <div className="relative w-full mt-5 mr-4 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center rtl:text-center text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Comment Content
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Likes
                  </th>
                </tr>
              </thead>
              <tbody>
                {comments &&
                  comments.map((com) => (
                    <tr
                      key={com._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td scope="row" className="px-6 py-4 ">
                        {com.content}
                      </td>
                      <td className="px-6 py-4">{com.likes.length}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* All Posts */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Link
              to={"/dashboard?tab=posts"}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                See all
              </span>
            </Link>
          </div>
          <div className="relative w-full mt-5 mr-4 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center rtl:text-center text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Post Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Post Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts &&
                  posts.map((post) => (
                    <tr
                      key={post._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td scope="row" className="px-6 py-4 ">
                        <img
                          src={post.image}
                          className="w-7 h-7 rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 max-w-20 line-clamp-1">
                        {post.title}
                      </td>
                      <td className="px-6 py-4">{post.category}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;

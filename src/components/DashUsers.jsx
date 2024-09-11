import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { startLoading, endLoading } from "../redux/user/userSlice";
import DeleteUser from "./DeleteUser";

const DashUsers = () => {
  const api = useApi();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [isOn, setIsOn] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get(import.meta.env.VITE_GET_USERS, {
          headers: {
            "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
          },
        });
        if (res.status == 200) {
          setUsers(res.data.users);
          if (res.data.users.length < 6) {
            setShowMore(false);
          }
        }
        console.log(res);
      } catch (error) {
        const err =
          error.response.data.message ||
          error.message ||
          "Something went wrong!";
        toast.error(err);
      }
    };
    if (currentUser.user.isAdmin) {
      fetchUsers();
    }
  }, [currentUser.user._id, api, currentUser.user.isAdmin]);

  const handleShowClick = async () => {
    try {
      const startIndex = users.length;
      const res = await api.get(
        import.meta.env.VITE_GET_POSTS_ROUTE + "&startIndex=" + startIndex,
        {
          headers: {
            "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
          },
        }
      );
      console.log(res);

      if (res.status == 200) {
        setUsers((pre) => [...pre, ...res.data.users]);
        if (res.data.users.length < 6) {
          setShowMore(false);
        }
      }
    } catch (error) {
      const err =
        error.response.message || error.message || "Something went wrong!";
      toast.error(err);
    }
  };
  const deleteUser = async () => {
    try {
      dispatch(startLoading());
      const res = await api.delete(
        import.meta.env.VITE_DELETE_USER + deleteId,
        {
          headers: {
            "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
          },
        }
      );
      if (res.status == 200) {
        setIsOn((pre) => !pre);
        setUsers((pre) => pre.filter((user) => user._id !== deleteId));
        dispatch(endLoading());
        return toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(endLoading());
      const err =
        error.response.data.message || error.message || "Something went wrong!";
      return toast.error(err);
    }
  };
  return (
    <div className="overflow-x-scroll overflow-y-hidden">
      {open && (
        <DeleteUser isOn={isOn} setIsOn={setIsOn} deletePost={deleteUser} />
      )}
      {currentUser.user.isAdmin && users.length > 0 ? (
        <>
          <div className="relative mt-5 mr-4 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    DATE CREATED
                  </th>
                  <th scope="col" className="px-6 py-3">
                    USER IMAGE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    USERNAME
                  </th>
                  <th scope="col" className="px-6 py-3">
                    EMAIL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ADMIN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DELETE
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td scope="row" className="px-6 py-4 ">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        className="px-6 py-4"
                        to={`/update-post/${user._id}`}
                      >
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="w-12 h-12 rounded-full object-cover bg-gray-500"
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                      {user.username}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.isAdmin ? (
                        <>
                          <img src="/right.png" className="w-10 h-10" />
                        </>
                      ) : (
                        <>
                          <img src="/false.png" className="w-10 h-10" />
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setIsOn((pre) => !pre);
                          setDeleteId(user._id);
                        }}
                        className="text-red-500 font-medium hover:underline hover:cursor-pointer"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showMore && (
              <div className="flex justify-center items-center w-full">
                <button
                  type="button"
                  onClick={handleShowClick}
                  className="px-5 py-4 text-lg font-bold text-indigo-500"
                >
                  Show More...
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
    </div>
  );
};

export default DashUsers;

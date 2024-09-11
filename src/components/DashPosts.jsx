import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";
import { startLoading, endLoading } from "../redux/user/userSlice";
const DashPosts = () => {
  const api = useApi();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [isOn, setIsOn] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(
          import.meta.env.VITE_GET_POSTS_ROUTE + currentUser.user._id,
          {
            headers: {
              "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
            },
          }
        );
        if (res.status == 200) {
          setUserPosts(res.data.posts);
          if (res.data.posts.length < 6) {
            setShowMore(false);
          }
        }
      } catch (error) {
        const err =
          error.response.data.message ||
          error.message ||
          "Something went wrong!";
        toast.error(err);
      }
    };
    if (currentUser.user.isAdmin) {
      fetchPosts();
    }
  }, [currentUser.user._id, api, currentUser.user.isAdmin]);

  const handleShowClick = async () => {
    try {
      const startIndex = userPosts.length;
      const res = await api.get(
        import.meta.env.VITE_GET_POSTS_ROUTE +
          currentUser.user._id +
          "&startIndex=" +
          startIndex,
        {
          headers: {
            "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
          },
        }
      );
      if (res.status == 200) {
        setUserPosts((pre) => [...pre, ...res.data.posts]);
        if (res.data.posts.length < 6) {
          setShowMore(false);
        }
      }
    } catch (error) {
      const err =
        error.response.data.message || error.message || "Something went wrong!";
      toast.error(err);
    }
  };
  const deletePost = async () => {
    try {
      dispatch(startLoading());
      const res = await api.delete(
        import.meta.env.VITE_DELETE_POST + deleteId,
        {
          headers: {
            "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
          },
        }
      );
      if (res.status == 200) {
        setIsOn((pre) => !pre);
        setUserPosts((pre) => pre.filter((post) => post._id !== deleteId));
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
        <DeletePost isOn={isOn} setIsOn={setIsOn} deletePost={deletePost} />
      )}
      {currentUser.user.isAdmin && userPosts.length > 0 ? (
        <>
          <div className="relative mt-5 mr-4 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    DATE UPDATED
                  </th>
                  <th scope="col" className="px-6 py-3">
                    POST IMAGE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    POST TITLE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GATEGORY
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DELETE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    EDIT
                  </th>
                </tr>
              </thead>
              <tbody>
                {userPosts.map((post) => (
                  <tr
                    key={post._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td scope="row" className="px-6 py-4 ">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 ">
                      <Link className="px-6 py-4" to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-15 rounded-md object-cover bg-gray-500"
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                      {post.title}
                    </td>
                    <td className="px-6 py-4">{post.category}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setIsOn((pre) => !pre);
                          setDeleteId(post._id);
                        }}
                        className="text-red-500 font-medium hover:underline hover:cursor-pointer"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-4 hover:underline hover:cursor-pointer">
                      <Link
                        className="text-cyan-500 font-medium"
                        to={`/update-post/${post._id}`}
                      >
                        Edit
                      </Link>
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
        <p>You have no post yet!</p>
      )}
    </div>
  );
};

export default DashPosts;

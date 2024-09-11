import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { startLoading, endLoading } from "../redux/user/userSlice";
import DeleteComment from "./DeleteComment";

const DashComments = () => {
  const api = useApi();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [isOn, setIsOn] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(import.meta.env.VITE_GET_COMMENTS_COMMENT, {
          headers: {
            "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
          },
        });
        if (res.status == 200) {
          setComments(res.data.comments);
          if (res.data.comments.length < 6) {
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
      fetchComments();
    }
  }, [currentUser.user._id, api, currentUser.user.isAdmin]);

  const handleShowClick = async () => {
    try {
      const startIndex = comments.length;
      const res = await api.get(
        import.meta.env.VITE_GET_COMMENTS_COMMENT + "&startIndex=" + startIndex,
        {
          headers: {
            "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
          },
        }
      );
      console.log(res);

      if (res.status == 200) {
        setComments((pre) => [...pre, ...res.data.users]);
        if (res.data.comments.length < 6) {
          setShowMore(false);
        }
      }
    } catch (error) {
      const err =
        error.response.message || error.message || "Something went wrong!";
      toast.error(err);
    }
  };
  const deleteComment = async () => {
    try {
      dispatch(startLoading());
      const res = await api.delete(
        import.meta.env.VITE_DELETE_COMMENT + deleteId,
        {
          headers: {
            "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
          },
        }
      );
      if (res.status == 200) {
        setIsOn((pre) => !pre);
        setComments((pre) => pre.filter((com) => com._id !== deleteId));
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
        <DeleteComment
          isOn={isOn}
          setIsOn={setIsOn}
          deleteComment={deleteComment}
        />
      )}
      {currentUser.user.isAdmin && comments.length > 0 ? (
        <>
          <div className="relative mt-5 mr-4 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    DATE UPDATED
                  </th>
                  <th scope="col" className="px-6 py-3">
                    COMMENT CONTENT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NUMBER OF LIKES
                  </th>
                  <th scope="col" className="px-6 py-3">
                    POST ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    USER ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DELETE
                  </th>
                </tr>
              </thead>
              <tbody>
                {comments.map((com) => (
                  <tr
                    key={com._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td scope="row" className="px-6 py-4 ">
                      {new Date(com.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{com.content}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                      {com.numberOfLikes}
                    </td>
                    <td className="px-6 py-4">{com.postId}</td>
                    <td className="px-6 py-4">{com.userId}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setIsOn((pre) => !pre);
                          setDeleteId(com._id);
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
        <p>You have no comments yet!</p>
      )}
    </div>
  );
};

export default DashComments;

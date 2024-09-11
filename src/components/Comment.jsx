import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";
import DeleteComment from "../components/DeleteComment";
import moment from "moment";
import { Button, Textarea } from "flowbite-react";
const Comment = ({ comments, onLike, onEdit, onDelete }) => {
  const api = useApi();
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [editedComment, setEditedComment] = useState(comments.content);

  useEffect(() => {
    if (!comments) return;
    const getComments = async () => {
      try {
        const res = await api.get(
          import.meta.env.VITE_GET_THE_USER + comments.userId,

          { headers: { "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS } }
        );
        if (res.status == 200) {
          setUser(res.data);
          return;
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred.";
        return toast.error(errorMessage);
      }
    };
    getComments();
  }, [comments]);

  const handleEditComment = () => {
    setIsEditing(true);
    setEditedComment(comments.content);
  };

  const handleSave = async () => {
    try {
      const res = await api.put(
        import.meta.env.VITE_EDIT_COMMENT + comments._id,
        { content: editedComment },

        { headers: { "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS } }
      );
      if (res.status == 200) {
        setIsEditing(false);
        onEdit(comments, editedComment);
        return;
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      return toast.error(errorMessage);
    }
  };

  return (
    <>
      {open && (
        <DeleteComment
          isOn={isOn}
          setIsOn={setIsOn}
          deleteComment={onDelete}
          commentId={comments._id}
        />
      )}
      <div className=" flex p-4 border-b dark:border-gray-600 text-sm">
        <div className="flex-shrink-0 mr-3">
          <img
            className="w-10 h-10 rounded-full bg-gray-200"
            src={user.profilePicture}
            alt={user.username}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <span className="font-bold mr-1 text-sm truncate">
              {user ? `@${user.username}` : "Anonymous user"}
            </span>
            <span className="text-gray-500 text-xs">
              {moment(comments.updatedAt).fromNow()}
            </span>
          </div>
          {isEditing ? (
            <>
              <Textarea
                className="mb-2 resize-none"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
              <div className="flex gap-2 items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none "
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Cancel
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-600 to-purple-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none "
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Save
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-500 pb-2">{comments.content}</p>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => onLike(comments._id)}
                  type="button"
                  className="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="like"
                    x="0"
                    y="0"
                    viewBox="0 0 29 29"
                    xmlSpace="preserve"
                    className={`w-5 h-5 fill-current transition-colors duration-300 ${
                      user && comments.likes.includes(user._id)
                        ? "text-red-500"
                        : "dark:text-white text-gray-600 "
                    } hover:text-blue-500`}
                  >
                    <path d="M14.5 25.892a.997.997 0 0 1-.707-.293l-9.546-9.546c-2.924-2.924-2.924-7.682 0-10.606 2.808-2.81 7.309-2.923 10.253-.332 2.942-2.588 7.443-2.479 10.253.332 2.924 2.924 2.924 7.683 0 10.606l-9.546 9.546a.997.997 0 0 1-.707.293zM9.551 5.252a5.486 5.486 0 0 0-3.89 1.608 5.505 5.505 0 0 0 0 7.778l8.839 8.839 8.839-8.839a5.505 5.505 0 0 0 0-7.778 5.505 5.505 0 0 0-7.778 0l-.354.354a.999.999 0 0 1-1.414 0l-.354-.354a5.481 5.481 0 0 0-3.888-1.608z"></path>
                  </svg>
                </button>
                <p className="text-teal-400 font-mono">
                  {comments.numberOfLikes > 0 &&
                    comments.numberOfLikes +
                      " " +
                      (comments.numberOfLikes == 1 ? "like" : "likes")}
                </p>
                {user && (user._id === comments.userId || user.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEditComment}
                      className="text-gray-500 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOn((pre) => !pre)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;

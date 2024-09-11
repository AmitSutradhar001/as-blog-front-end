import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    if (!postId) return;
    const getComments = async () => {
      try {
        const res = await api.get(
          import.meta.env.VITE_GET_COMMENTS_ROUTE + postId,
          { headers: { "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS } }
        );
        if (res.status === 200) {
          setComments(res.data);
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred.";
        toast.error(errorMessage);
      }
    };
    getComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return toast.warn("Your comment must contain fewer than 200 characters!");
    }
    try {
      const res = await api.post(
        import.meta.env.VITE_COMMENT_CREATE_ROUTE,
        {
          content: comment,
          postId,
          userId: user._id,
        },
        { headers: { "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS } }
      );
      if (res.status === 200) {
        setComment("");
        setComments((prev) => [res.data, ...prev]);
        return toast.success("Comment is added successfully");
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!user) {
        navigate("/sign-in");
        return;
      }
      const res = await api.put(
        import.meta.env.VITE_LIKE_COMMENT + commentId,
        {},
        { headers: { "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS } }
      );
      if (res.status === 200) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: res.data.likes,
                  numberOfLikes: res.data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleEditCall = async (comment, editedComment) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedComment } : c
      )
    );
  };
  const deleteComment = async (commentId) => {
    try {
      if (!user) {
        navigate("/sign-in");
        return;
      }
      const res = await api.delete(
        import.meta.env.VITE_DELETE_COMMENT + commentId,
        { headers: { "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS } }
      );
      if (res.status === 200) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
        return toast.success("Comment is deleted!");
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
    <div className="max-w-2xl mx-auto w-full p-3">
      {user ? (
        <div className="flex items-center gap-2 my-5 p-4">
          <p className="text-cyan-400 font-semibold">Signed in as:</p>
          <img
            className="h-6 w-6 object-cover rounded-full"
            src={user.profilePicture}
            alt={user.username}
          />
          <Link
            className="hover:underline text-purple-600 text-xl"
            to={"/dashboard?tab=profile"}
          >
            @{user.username}
          </Link>
        </div>
      ) : (
        <div className="my-5 text-sm text-teal-400 flex gap-2">
          You must be signed in to comment.
          <Link className="text-purple-700 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {user && (
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-4 border-2 border-gray-400 dark:border-teal-400 rounded-lg bg-gray-50 dark:bg-gray-700 ">
            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="4"
                className="w-full resize-none px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Write a comment..."
                required
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
              <p>{200 - comment.length} characters remaining!</p>
              <button
                type="submit"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Post Comment
                </span>
              </button>
            </div>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500 my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-2">
            <p>Comments</p>
            <div className="border-[1px] border-teal-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments
            .filter((com) => com && com._id) // Ensure the comment has an _id before rendering
            .map((com) => (
              <Comment
                onEdit={handleEditCall}
                onDelete={deleteComment}
                key={com._id}
                onLike={handleLike}
                comments={com}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useApi } from "../context/ApiContext";
import { endLoading, startLoading } from "../redux/user/userSlice";
import Loading from "../components/Loading";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
// import CallToAction from "../components/CallToAction";

const PostPage = () => {
  const dispatch = useDispatch();
  const api = useApi();
  const { postSlug } = useParams(); // don't use slug for API call
  const { loading } = useSelector((state) => state.user);
  const [currentPost, setCurrentPost] = useState(null);
  const [recentPosts, setRecentePosts] = useState(null);

  useEffect(() => {
    dispatch(startLoading());
    const fetchPost = async () => {
      try {
        const res = await api.get(
          import.meta.env.VITE_GET_SINGLE_POST_BY_SLUG_ROUTE + postSlug,
          {
            headers: {
              "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
            },
          }
        );

        if (res.status === 200) {
          setCurrentPost(res.data.posts[0]);
          toast.success("Post is here!");
        } else {
          toast.error("An error occurred!");
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred.";
        return toast.error(errorMessage);
      } finally {
        dispatch(endLoading()); // Ensuring endLoading is called in both success and error cases
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await api.get(
          import.meta.env.VITE_GET_RECENT_POSTS_ROUTE + 3,
          {
            headers: {
              "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
            },
          }
        );

        if (res.status === 200) {
          setRecentePosts(res.data.posts);
        } else {
          toast.error("An error occurred in recent posts!");
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      return toast.error(errorMessage);
    }
  }, [postSlug]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-center items-center w-full">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl lg:text-4xl text-gray-900 dark:text-white">
          {currentPost && currentPost.title}
        </h1>
      </div>
      <Link
        className="self-center mt-5"
        to={`/search?category=${currentPost && currentPost.category}`}
      >
        <button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {currentPost && currentPost.category}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </Link>
      <img
        className="mt-10 p-3 max-h-[500px] w-full  object-cover"
        src={currentPost && currentPost.image}
        alt={currentPost && currentPost.title}
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>
          {currentPost && new Date(currentPost.createdAt).toLocaleDateString()}
        </span>
        <span className="italic">
          {currentPost && (currentPost.content.length / 1000).toFixed(0)} mins
          read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: currentPost && currentPost.content }}
      ></div>
      {/* <div className="max-w-4xl mx-auto w-full"><CallToAction /></div> */}
      <CommentSection postId={currentPost && currentPost._id} />
      <div className="flex flex-col justify-center items-center mb-5">
        <h2 className="text-xl mt-5">Recent Articales</h2>
        <div className="flex justify-center items-center flex-wrap gap-3 mt-5">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
};

export default PostPage;

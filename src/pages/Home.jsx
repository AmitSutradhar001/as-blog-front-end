import { Link } from "react-router-dom";
// import CallToAction from '../components/CallToAction';
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useApi } from "../context/ApiContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  const api = useApi();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(
          import.meta.env.VITE_GET_RECENT_POSTS_ROUTE + "9",
          {
            headers: {
              "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
            },
          }
        );

        if (res.status === 200) {
          setPosts(res.data.posts);
        } else {
          console.error("An error occurred!");
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred.";
        console.error(errorMessage);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you&apos;ll find a variety of articles and tutorials on topics
          such as web development, software engineering, and programming
          languages.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      {/* <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div> */}

      <div className="w-full mx-auto p-3 flex justify-center items-center flex-col gap-8 py-7 px-10">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex w-full  flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;

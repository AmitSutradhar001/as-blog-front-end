import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("Email").trim();
    const password = formData.get("Password").trim();
    if (!email || !password) {
      return toast.warn("Fill the form!");
    }
    try {
      dispatch(signInStart());
      const res = await api.post(
        import.meta.env.VITE_SIGNIN_ROUTE,
        { email, password },
        {
          headers: {
            "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
          },
        }
      );
      if (res.status == 200) {
        console.log(res);
        dispatch(signInSuccess(jwtDecode(res.data.asblog_token)));
        Cookies.set("asblog_token", res.data.asblog_token, {
          expires: 1 / 24,
        });
        toast.success(res.data.message || "SignedIn Success!");
        setTimeout(() => {
          navigate("/dashboard?tab=profile");
        }, 2000);
      } else {
        console.log(res.data);
        dispatch(signInFailure(res.data.message || "An error occurred."));
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      dispatch(signInFailure(errorMessage));
      return toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="flex justify-center lg:mt-16 items-center h-screen w-full">
        <div className="flex flex-col gap-5 items-center -top-7 justify-center md:h-screen ">
          <div className="flex flex-col  z-20  rounded-md flex-wrap justify-center items-center shadow-xl p-8 border-[1px]">
            <Link
              to={"/"}
              className="self-center whitespace-nowrap text-sm sm:text-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 px-5 py-2 w-32 text-center rounded-tl-lg rounded-br-lg"
            >
              AsBlog
            </Link>
            <h1 className="text-center pt-2 font-normal py-4">
              Welcome back on AsBlog. Sign in to see the content!
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-wrap justify-center items-start"
            >
              <Input
                name={"Email"}
                placeHolder={"Someone@gmail.com"}
                type={"email"}
              />
              <Input
                name={"Password"}
                placeHolder={"*******"}
                type={"password"}
              />

              <button
                disabled={loading}
                type="submit"
                className="w-full mt-3 p-2 text-white font-semibold text-center bg-gradient-to-r from-[#A54DFF] to-[#ff4dca] rounded-md transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              >
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="text-center w-full p-2">Or Continue with</p>
            <div className="flex justify-center items-center gap-4 w-full flex-wrap">
              <OAuth />
            </div>
            <p className="text-center w-full p-2">
              Don&rsquo;t have an account?{" "}
              <span className="text-indigo-700">
                <Link to="/signup">Sign Up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

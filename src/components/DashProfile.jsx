import { TextInput } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";
import DeleteToggole from "./DeleteToggole.jsx";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useApi } from "../context/ApiContext.jsx";
import {
  signoutStart,
  signoutSuccess,
  signoutFailure,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice.js";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const DashProfile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const api = useApi();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [isOn, setIsOn] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imgIsUploading, setImgIsUploading] = useState(false);
  const filePick = useRef();

  const handleImgChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  const uploadImage = async () => {
    setImgIsUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        const err =
          error.serverResponse.data.message ||
          error.message ||
          "Image upload failed!";
        toast.error(err);
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImgIsUploading(false);
        if (error.status === 403) {
          toast.error("Only image is accepted!");
        } else {
          toast.error(error.message);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setFormData({ ...formData, profilePicture: downloadUrl });
          setImgIsUploading(false);
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return toast.warn("No changes made!");
    }
    if (imgIsUploading) {
      return toast.warn("Image is Uploading. Please Wait!");
    }
    try {
      dispatch(updateStart());
      const res = await api.put(import.meta.env.VITE_UPDATE_ROUTE, formData, {
        headers: {
          "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
        },
      });

      if (res.status === 200) {
        console.log(res.data);
        dispatch(updateSuccess(res.data));
        setFormData({});
        return toast.success("Update is Successfull!");
      } else {
        console.log(res.data);
        dispatch(updateFailure(res.data.message));
        setFormData({});
        return toast.error("Update is Failure!");
      }
    } catch (error) {
      console.error(error);
      dispatch(updateFailure(error.message));
      setFormData({});
      return toast.error("Update is Failure!");
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signoutStart());
      const res = await api.post(
        import.meta.env.VITE_USER_SIGN_OUT,
        {},
        {
          headers: {
            "Content-Type": import.meta.env.VITE_SUP_SIN_HEADERS,
          },
        }
      );
      if (res.status == 200) {
        toast.success(res.data.message);
        Cookies.remove("asblog_token");
        setTimeout(() => {
          dispatch(signoutSuccess());
        }, 3000);
      } else {
        toast.warn("Something is wrong! Please try again.");
        dispatch(signoutFailure("Something is wrong! Please try again."));
      }
    } catch (error) {
      const err =
        error.response.data.message || error.message || "Error while sign out!";
      toast.warn(err);
      dispatch(signoutFailure(err));
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-3 w-full">
        {isOn && <DeleteToggole isOn={isOn} setIsOn={setIsOn} />}
        <h2 className="my-7 text-center font-semibold text-3xl">Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="file"
            ref={filePick}
            accept="image/.*"
            onChange={handleImgChange}
            hidden
          />
          <div
            className="w-32 h-32 self-center cursor-pointer relative shadow-md rounded-full overflow-hidden"
            onClick={() => filePick.current.click()}
          >
            {imageFileUploadingProgress && imgIsUploading && (
              <CircularProgressbar
                value={imageFileUploadingProgress || 0}
                text={`${imageFileUploadingProgress}%`}
                strokeWidth={4}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${
                      imageFileUploadingProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.user.profilePicture}
              alt="user pic"
              className={`rounded-full w-full h-full object-cover border-8 dark:border-green-400 ${
                imageFileUploadingProgress &&
                imageFileUploadingProgress < 100 &&
                "opacity-60"
              }`}
            />
          </div>
          <TextInput
            onChange={handleChange}
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.user.username}
          />
          <TextInput
            onChange={handleChange}
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.user.email}
          />
          <TextInput
            onChange={handleChange}
            type="password"
            id="password"
            placeholder="password"
          />
          <button
            disabled={loading}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 w-full bg-white dark:text-white dark:bg-gray-700 rounded-md group-hover:bg-opacity-0">
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-400 animate-spin dark:text-gray-600 fill-blue-700 dark:fill-gray-300"
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
                "Update"
              )}
            </span>
          </button>
          {currentUser.user.isAdmin && (
            <Link to="/create-post">
              <button className="relative w-full inline-flex items-center justify-center p-3 mb-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 text-white ">
                Create Post
              </button>
            </Link>
          )}
        </form>
        <div className="flex justify-between text-red-500 items-center flex-wrap py-1">
          <h3
            className="hover:cursor-pointer"
            onClick={() => setIsOn((pre) => !pre)}
          >
            Delete Account
          </h3>
          <h3 onClick={handleSignOut} className="hover:cursor-pointer">
            Sign Out
          </h3>
        </div>
      </div>
    </>
  );
};

export default DashProfile;

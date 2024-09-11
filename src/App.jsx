import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import FooterCom from "./components/FooterCom";
import { ApiProvider } from "./context/ApiContext";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/ThemeProvider.jsx";
import PrivateCom from "./components/PrivateCom.jsx";
import { ToastContainer } from "react-toastify";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import UpdatePost from "./pages/UpdatePost.jsx";
import PostPage from "./pages/PostPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import SearchPage from "./pages/SearchPage.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <PersistGate persistor={persistor}>
          <Provider store={store}>
            <ThemeProvider>
              <ApiProvider>
                <Header />
                <ToastContainer
                  style={{ top: "50px" }}
                  limit={1}
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateCom>
                        <Dashboard />
                      </PrivateCom>
                    }
                  />
                  <Route
                    path="/create-post"
                    element={
                      <OnlyAdminPrivateRoute>
                        <CreatePost />
                      </OnlyAdminPrivateRoute>
                    }
                  />
                  <Route
                    path="/update-post/:postId"
                    element={
                      <OnlyAdminPrivateRoute>
                        <UpdatePost />
                      </OnlyAdminPrivateRoute>
                    }
                  />
                  <Route path="/post/:postSlug" element={<PostPage />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
                <FooterCom />
              </ApiProvider>
            </ThemeProvider>
          </Provider>
        </PersistGate>
      </BrowserRouter>
    </>
  );
};
export default App;

import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import LoginForms from "./components/LoginForms";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForms from "./components/BlogForms";
import "./index.css";
import ToggLabel from "./components/ToggLabel";
import { useDispatch, useSelector } from "react-redux";
import { initializaBlogs } from "./reducers/blogReducer";
import { checkLoggedInUser, logout } from "./reducers/loginReducer";

const App = () => {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializaBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkLoggedInUser());
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(logout());
    window.location.replace("/");
  };

  return (
    <div>
      {user === null && (
        <div>
          <Notification />
          <LoginForms />
        </div>
      )}

      {user !== null && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.name} logged in{" "}
            <button onClick={handleLogOut}>Log out</button>{" "}
          </p>
          <ToggLabel>
            <BlogForms />
          </ToggLabel>
          <Blogs />
        </div>
      )}
    </div>
  );
};

export default App;

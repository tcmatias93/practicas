import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForms from "./components/LoginForms";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForms from "./components/BlogForms";
import "./index.css";
import ToggLabel from "./components/ToggLabel";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedUser");
    window.location.replace("/");
  };

  const compareLikesBlogs = (a, b) => {
    if (a.likes > b.likes) {
      return 1;
    }
    if (a.likes < b.likes) {
      return -1;
    }
    // a must be equal to b
    return 0;
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    blogService.create(blogObject).then((returnedNote) => {
      setBlogs(blogs.concat(returnedNote));
      setTitle("");
      setAuthor("");
      setUrl("");
      setSuccessMessage(`A new blog ${title} by ${author} added`);
    });
  };

  const toggleDeleteBlog = (id) => {
    const blog = blogs.find((n) => n.id === id);
    const deleted = confirm(`Remove blog ${blog.title} ${blog.author}`);

    if (deleted) {
      blogService.deleteBlog(blog.id).then(() => {
        setBlogs(blogs.filter((b) => b.id !== id));
      });
    }
  };

  const toggleLikeBlog = (id) => {
    const blog = blogs.find((n) => n.id === id);
    const changeBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .updateBlog(id, changeBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      })
      .catch(() => {
        setErrorMessage(`Note ${blog.title} was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setBlogs(blogs.filter((n) => n.id !== id));
      });
  };

  return (
    <div>
      {user === null && (
        <div>
          {errorMessage !== null && (
            <Notification message={errorMessage} type={"error"} />
          )}
          <LoginForms
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      )}

      {user !== null && (
        <div>
          <h2>blogs</h2>
          {successMessage !== null && (
            <Notification message={successMessage} type={"success"} />
          )}
          <p>
            {user.name} logged in{" "}
            <button onClick={handleLogOut}>Log out</button>{" "}
          </p>
          <ToggLabel ref={blogFormRef}>
            <BlogForms
              handleCreateBlog={handleCreateBlog}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
            />
          </ToggLabel>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              toggleLikeBlog={() => toggleLikeBlog(blog.id)}
              toggleDeleteBlog={() => toggleDeleteBlog(blog.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

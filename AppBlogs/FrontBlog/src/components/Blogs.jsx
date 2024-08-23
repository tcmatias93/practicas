import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, toggleLikeBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";
import useVisibility from "../hooks/useVisibility";

const Blog = ({ blog, toggleLikeBlog, toggleDeleteBlog }) => {
  const [visibility, changeVisibility] = useVisibility();

  const showWhenVisible = { display: visibility ? "" : "none" };

  return (
    <div className="blogStyle" key={blog.id}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => changeVisibility()}>
          {visibility ? "Hide" : "View"}
        </button>
      </div>

      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <div>
          <p>
            Likes {blog.likes === 0 ? "" : blog.likes}{" "}
            <button onClick={toggleLikeBlog}>Like</button>
          </p>
        </div>
        <p>{blog.author}</p>
        <button onClick={toggleDeleteBlog}>Remove</button>
      </div>
    </div>
  );
};

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const delteBlog = (id, blog) => {
    dispatch(deleteBlog(id));
    dispatch(showNotification(`Remove blog ${blog.title} ${blog.author}`));
  };
  return (
    <>
      {blogs.map((blog) => (
        <Blog
          blog={blog}
          toggleDeleteBlog={() => delteBlog(blog.id, blog)}
          toggleLikeBlog={() => dispatch(toggleLikeBlog(blog.id))}
        />
      ))}
    </>
  );
};

export default Blogs;

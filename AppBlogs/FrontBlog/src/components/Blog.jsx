import { useState } from "react";

const Blog = ({ blog, toggleLikesBlog }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleRemove = () => {
    const eliminar = confirm(`Remove blog ${blog.title} ${blog.author}`);
    console.log("Eliminar: ", eliminar);
  };

  return (
    <div className="blogStyle">
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>{visible ? "Hide" : "View"}</button>
      </div>

      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <div>
          <p>
            Likes {blog.likes} <button>Like</button>
          </p>
        </div>
        <p>{blog.author}</p>
        <button onClick={toggleLikesBlog}>Remove</button>
      </div>
    </div>
  );
};

export default Blog;

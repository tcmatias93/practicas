import useField from "../hooks/useField";
import { useDispatch } from "react-redux";
import { createBLog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";

const BlogForms = ({ changeVisibility }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const dispatch = useDispatch();

  const handleCreateBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    dispatch(createBLog(blogObject));
    dispatch(
      showNotification(`notification: ${title.value} created successfully`)
    );
    title.reset();
    author.reset();
    url.reset();
    changeVisibility();
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:
          <input {...title} />
        </div>
        <div>
          Author:
          <input {...author} />
        </div>
        <div>
          URL:
          <input {...url} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForms;

import { createSlice, current } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    toggleLike(state, action) {
      const updateBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updateBlog.id ? blog : updateBlog
      );
    },
    blogDelete(state, action) {
      const id = action.payload;

      return state.filter((n) => n.id !== id);
    },
  },
});

export const { setBlogs, addBlog, toggleLike, blogDelete } = blogSlice.actions;

export const initializaBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBLog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(addBlog(newBlog));
  };
};

export const toggleLikeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const blogToChange = blogs.find((n) => n.id === id);

    const changeBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    };

    const blogLike = await blogService.addLikes(id, changeBlog);
    dispatch(toggleLike(blogLike));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(blogDelete(id));
  };
};

export default blogSlice.reducer;

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (req, res, next) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blogId = req.params.id;
  const user = await User.findById(decodedToken.id);

  const blog = await Blog.findById(blogId);

  if (!blog) {
    return response.status(401).json({ error: "Blog not found" });
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res
      .status(403)
      .json({ error: "forbidden, blog does not belong to the user" });
  }

  await Blog.findByIdAndDelete(blogId);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = {
    likes: body.likes,
  };

  const updateBLog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });

  if (!updateBLog) {
    res.status(404).json({ error: "Blog not found" });
  }

  res.json(updateBLog);
});

module.exports = blogsRouter;

const logger = require("./logger");

const unknownEndpoint = (req, res) => {
  res.status(400).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(400).json({ error: "Token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(400).json({ error: "Token expired" });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};

require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person");

const today = new Date();

const consolePost = (req, res, next) => {
  if (req.method === "POST") {
    console.log(JSON.stringify(req.body));
  }
  next();
};

function getRandomInt() {
  return Math.floor(Math.random() * 1000);
}

app.use(express.json());
app.use(morgan("tiny"));
app.use(consolePost);
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("<h1>Phone Book </h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/info", (req, res) => {
  res.send(`<div>
    <p>PhoneBook has info for ${peopleData.length} people</p>
    <br/>
    <p> ${today} </p> 
    </div>`);
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((people) => {
      if (people) {
        res.json(people);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(Error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  //const personExisting = peopleData.find((person) => person.name === body.name);

  if (!body.number) {
    return res.status(400).json({
      error: "Number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savePerson) => {
      res.json(savePerson);
    })
    .catch((error) => {
      next(error);
    });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformateed id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

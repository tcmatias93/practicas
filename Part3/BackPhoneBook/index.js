const express = require("express");
const app = express();
const morgan = require("morgan");

let peopleData = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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

app.get("/", (req, res) => {
  res.send("<h1>Phone Book </h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(peopleData);
});

app.get("/info", (req, res) => {
  res.send(`<div>
    <p>PhoneBook has info for ${peopleData.length} people</p>
    <br/>
    <p> ${today} </p> 
    </div>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const datePhone = peopleData.find((person) => person.id === id);

  if (datePhone) {
    res.json(datePhone);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  peopleData = peopleData.filter((people) => people.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const personExisting = peopleData.find((person) => person.name === body.name);

  if (!body.name) {
    return res.status(400).json({
      error: "Name missing",
    });
  }
  if (personExisting) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: "Number missing",
    });
  }

  const person = {
    id: getRandomInt(),
    name: body.name,
    number: body.number,
  };

  peopleData = peopleData.concat(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

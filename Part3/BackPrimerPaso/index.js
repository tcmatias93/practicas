const express = require("express");
const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
const generateID = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

//Leo la pagina home
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

//Leo la pagina de las notas como una api
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

//Leo la pagina como una notas em particular como una api
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  //Compurba si existe nota
  if (note) {
    //Devuelvo la nota
    res.json(note);
  } else {
    //Si no existe devulvo un 404
    res.status(404).end();
  }
});

//Elimino una nota
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end;
});

//Creo una nota nueva
app.use(express.json());
app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "COntent missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateID(),
  };

  notes = notes.concat(note);
  res.json(note);
});

//Escucho por consola y selecciono el puerto
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

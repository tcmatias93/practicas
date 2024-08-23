import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  //useParams,
  useNavigate,
  Navigate,
  useMatch,
} from "react-router-dom";
import { Form, Table, Alert, Navbar, Nav } from "react-bootstrap";
import {
  Container,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableBody,
  TextField,
  Button,
} from "@mui/material";

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus
      ducimus repellendus illo, nam pariatur omnis harum architecto dolorum
      tempore culpa quia itaque temporibus ipsam aperiam totam. Consequatur
      ullam earum perferendis.
    </p>
  </div>
);

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? "important" : ""} </strong>
      </div>
    </div>
  );
};

const Notes = ({ notes }) => {
  {
    /* echo con react-bootstrap 
      <div>
      <h2>Notes</h2>
      <Table striped>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>
                <Link to={`/notes/${note.id}`}>{note.content} </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div> */
  }
  return (
    <div>
      <h2>Notes</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content} </Link>
                </TableCell>
                <TableCell>{note.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
);

const Login = (props) => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin("mluukkai");
    navigate("/");
  };

  /*  react-boopstrap
  <div>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name="username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
   */
  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="username" />
        </div>
        <div>
          <TextField label="password" type="password" />
        </div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "Matti Luukkainen",
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
      user: "Matti Luukkainen",
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "Arto Hellas",
    },
  ]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const login = (user) => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const padding = {
    padding: 5,
  };

  const match = useMatch("/notes/:id");
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  return (
    /* Echo con react-bootstrap   
      <div className="container">
        {message && <Alert variant="success">{message}</Alert>}
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to={"/"}>
                  home
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to={"/notes"}>
                  notes
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to={"/users"}>
                  users
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user ? (
                  <em>{user} logged in</em>
                ) : (
                  <Link style={padding} to={"login"}>
                    login
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/notes" element={<Notes notes={notes} />} />
          <Route path="/" element={<Home />} />
          <Route path="/notes/:id" element={<Note note={note} />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate replace to={"/login"} />}
          />
        </Routes>

        <div>
          <br />
          <i>Note app, Departament of Computer Science 2024</i>
        </div>
      </div> 
    */
    <Container>
      {message && <Alert variant="success">{message}</Alert>}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to={"/"}>
                home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to={"/notes"}>
                notes
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to={"/users"}>
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user ? (
                <em>{user} logged in</em>
              ) : (
                <Link style={padding} to={"login"}>
                  login
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/" element={<Home />} />
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to={"/login"} />}
        />
      </Routes>

      <div>
        <br />
        <i>Note app, Departament of Computer Science 2024</i>
      </div>
    </Container>
  );
}

export default App;

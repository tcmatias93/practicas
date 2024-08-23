import useField from "../hooks/useField";
import { login } from "../reducers/loginReducer";
import { showNotification } from "../reducers/notificationReducer";
import loginService from "../services/login";
import { useDispatch } from "react-redux";

const LoginForms = () => {
  const userName = useField("text");
  const passwordInput = useField("password");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = userName.value;
    const password = passwordInput.value;
    dispatch(login({ username, password }));
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input {...userName} />
        </div>
        <div>
          Password
          <input {...passwordInput} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForms;

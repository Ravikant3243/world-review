import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";

export default function Login({setShowLogin, myStorage, setCurrentUser}) {
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const user = {
          username: nameRef.current.value,
          password: passwordRef.current.value,
      };

      try {
        const res = await axios.post("http://localhost:8800/api/users/login", user);
        myStorage.setItem("user", res.data.username);
        setCurrentUser(res.data.username);
        setShowLogin(false);
        setError(false);
      } catch (err) {
          setError(true);
      }
  }

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room /> World Review
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}/>
        <input type="password" placeholder="password" ref={passwordRef}/>
        <button className="loginBtn">Login</button>
        {error && <span className="failure">Username or Password is incorrect</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}

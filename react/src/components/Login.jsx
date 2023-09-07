import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { Form, Button, Card } from "react-bootstrap";
import "./Login.css";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import "../components/NavButton.css";

function Login() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  const [error, setError] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log("State Changed");
      setUser(currentUser);
    });
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      setError("FAILED TO REGISTER: " + error.message);
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      setError("FAILED TO LOGIN: " + error.message);
      console.log(error.message);
    }
  };

  const handleGoogle = async (e) => {
    const providor = await new GoogleAuthProvider();
    return signInWithPopup(auth, providor);
  };

  const logout = async () => {
    await signOut(auth);
  };

  // const handleAdd = async (event) => {
  //   event.preventDefault();
  // };

  // TODO: Use Context file to upload doc to firebase

  return (
    <>
      {/* temporary style, focusing on Auth functionality */}

      <div className="container">
        <div className="center">
          <div>
            <p>If you want to save your data, login here:</p>
            <p>{error}</p>
            <h3>Register</h3>
            <input
              id="registerEmial"
              placeholder="Email..."
              onChange={(e) => {
                setRegisterEmail(e.target.value);
                console.log(e.target.value);
              }}
            />
            <input
              id="registerpassword"
              placeholder="Password..."
              onChange={(e) => {
                setRegisterPassword(e.target.value);
                console.log(e.target.value);
              }}
            />
            <button onClick={register}>Create Account</button>
          </div>
          <div>
            <h3>Login</h3>
            <input
              id="loginemail"
              placeholder="Email..."
              onChange={(e) => {
                e.preventDefault();
                setLoginEmail(e.target.value);
                console.log(e.target.value);
              }}
            />
            <input
              id="loginpassword"
              placeholder="Password..."
              onChange={(e) => {
                setLoginPassword(e.target.value);
                console.log(e.target.value);
              }}
            />
            <button onClick={login}>Login</button>
          </div>
          <h4>User logged in:</h4>
          {user?.email}
          <button onClick={logout}>Sign Out</button>
          <div></div>
          <button onClick={handleGoogle}>Sign In with Google</button>
        </div>
        <NavButton
          text="Prev"
          className="prev-button"
          onClick={() => navigate("/input")}
        />
      </div>
    </>
  );
}

export default Login;

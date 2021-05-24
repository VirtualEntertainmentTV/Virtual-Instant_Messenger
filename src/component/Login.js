import React from "react";
import "../css/Login.css";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = (e) => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <img src="https://i.ibb.co/bQkbphV/vimsmall.png" alt="" />
      <button onClick={signIn}>Login</button>
    </div>
  );
}

export default Login;

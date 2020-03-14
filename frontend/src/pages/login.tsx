import React, { useState } from "react";
import api from "../services/api";

function Login(props: { history: any }) {
  const { history } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event: any) {
    event.preventDefault();
    try {
      const response = await api.post("/login", {
        email,
        password
      });
      sessionStorage.setItem("token", response.data.token);
      history.push("/chat");
    } catch (err) {
      window.alert(err.response.data.error);
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name=""
          id=""
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <h5 onClick={() => history.push("/")}>
        Don't have an account? click here
      </h5>
    </div>
  );
}

export default Login;

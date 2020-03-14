import React, { useState } from "react";
import api from "../services/api";

function Register(props: { history: any }) {
  const { history } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(event: any) {
    event.preventDefault();

    try {
      const response = await api.post("/register", {
        email,
        username,
        password
      });
      window.alert(response.data.userStatus);
    } catch (err) {
      window.alert(err.response.data.error);
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
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
      <h5 onClick={() => history.push("/login")}>
        Already have an account? click here
      </h5>
    </div>
  );
}

export default Register;

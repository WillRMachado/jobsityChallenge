import React, { useMemo, useEffect } from "react";
import socketio from "socket.io-client";

import api from "../services/api";

function Chat() {
  const token = sessionStorage.getItem("token");

  const socket = useMemo(
    () =>
      socketio("http://localhost:3333", {
        query: { user_id: token }
      }),
    [token]
  );

  useEffect(() => {
    const socket = socketio("http://localhost:3333");
  }, []);

  const sendMessage = async () => {
    // event.preventDefault();
    const body = {
      username: "k",
      message: "k"
    };
    const headers = {
      headers: { authorization: sessionStorage.getItem("token") }
    };
    try {
      const response = await api.post("/message", body, headers);
      //   sessionStorage.setItem("token", response.data.token);
      //   history.push("/chat");
    } catch (err) {
      window.alert(err.response.data.error);
    }
  };
  return (
    <div>
      <h1>Welcome to chat</h1>
      <button type="submit" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
}

export default Chat;

import React, { useState, useMemo, useEffect } from "react";
import socketio from "socket.io-client";
import settings from "../settings.json";

import api from "../services/api";

function Chat() {
  const [message, setMessage] = useState("");

  const token = sessionStorage.getItem("token");

  const socket = useMemo(
    () => socketio(`${settings.API_URL}:${settings.API_PORT}`),
    [token]
  );

  useEffect(() => {
    socket.on("newMessage", (data: any) => {
      console.log(data);
    });
  }, []);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = {
      message: message
    };
    const headers = {
      headers: { authorization: token }
    };
    try {
      const response = await api.post("/message", body, headers);
      // socket.emit("vai", "teste");
      //   sessionStorage.setItem("token", response.data.token);
      //   history.push("/chat");
    } catch (err) {
      console.log(err.response.data.error);
    }
  };
  return (
    <div>
      <h1>Welcome to chat</h1>
      <form onSubmit={event => sendMessage(event)}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Chat;

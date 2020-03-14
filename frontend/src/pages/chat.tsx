import React from "react";
import api from "../services/api";

function Chat() {
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
      <h1>asssssssssssssssssssssssssssssss</h1>
      <button type="submit" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
}

export default Chat;

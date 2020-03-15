import React, { useState, useMemo, useEffect } from "react";
import socketio from "socket.io-client";
import settings from "../settings.json";

import api from "../services/api";
import MessageBox from "../components/messagesBox";

function Chat() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState(Array());

  const token = sessionStorage.getItem("token");

  const socket = useMemo(
    () => socketio(`${settings.API_URL}:${settings.API_PORT}`),
    [token]
  );

  useEffect(() => {
    getMessages();
    socket.on("newMessage", (data: any) => {
      getMessages();
      //ANCHOR
      // addNewMessageToDisplay(data);
    });
  }, []);

  const addNewMessageToDisplay = (data: any) => {
    let newList: Array<any> = messageList;
    newList.push(data);
    console.log(newList);
  };

  const getMessages = async () => {
    const apiMsg = await api.get("/message");
    const formatedDateMessageList = apiMsg.data.map((msg: any) => {
      msg.timestamp = new Date(msg.timestamp).toUTCString();
      return msg;
    });
    setMessageList(formatedDateMessageList);
  };

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    const body = {
      message: message
    };
    const headers = {
      headers: { authorization: token }
    };
    try {
      const response = await api.post("/message", body, headers);
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  return (
    <div>
      <h1>Welcome to Jobsity chat example</h1>
      <form onSubmit={event => sendMessage(event)}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send Message</button>
        <MessageBox messages={messageList} />
      </form>
    </div>
  );
}

export default Chat;

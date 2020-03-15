import React, { useState, useMemo, useEffect } from "react";
import socketio from "socket.io-client";
import settings from "../settings.json";

import api from "../services/api";
import MessageBox from "../components/messagesBox";

function Chat() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState(Array());
  const [chatChoice, setChatChoice] = useState("mainChat");

  const token = sessionStorage.getItem("token");

  const socket = useMemo(
    () => socketio(`${settings.API_URL}:${settings.API_PORT}`),
    [token]
  );

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    getMessages();

    socket.on("newMessageSecondaryChat", (data: any) => {
      getMessages("secondaryChat");
      //ANCHOR
      // addNewMessageToDisplay(data);
    });
    socket.on("newMessage", (data: any) => {
      getMessages("mainChat");
      //ANCHOR
      // addNewMessageToDisplay(data);
    });
  }, [chatChoice, socket]);

  // const addNewMessageToDisplay = (data: any) => {
  //   let newList: Array<any> = messageList;
  //   newList.push(data);
  //   console.log(newList);
  // };

  const getMessages = async (data?: any) => {
    const apiMsg = await api.get("/message", {
      headers: { chat: chatChoice }
    });
    const formatedDateMessageList = apiMsg.data.map((msg: any) => {
      msg.timestamp = new Date(msg.timestamp).toUTCString();
      return msg;
    });
    setMessageList([]);
    setMessageList(formatedDateMessageList);
  };

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    const body = {
      message: message
    };
    const headers = {
      headers: { authorization: token, chat: chatChoice }
    };
    try {
      await api.post("/message", body, headers);
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  const handleChatRoomChange = () => {
    if (chatChoice === "mainChat") {
      setChatChoice("secondaryChat");
    } else {
      setChatChoice("mainChat");
    }
  };
  return (
    <>
      <div>
        <h1>Welcome to Jobsity chat room example</h1>
        <h2>{`you are in the ${chatChoice} room `}</h2>
        <button onClick={() => handleChatRoomChange()}>Change chat room</button>
      </div>
      <br />
      <form onSubmit={event => sendMessage(event)}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send Message</button>
        <MessageBox messages={messageList} />
      </form>
    </>
  );
}

export default Chat;

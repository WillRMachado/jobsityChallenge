import React from "react";

function MessageBox(props: { messages: any }) {
  const { messages } = props;
  return (
    <div>
      {messages.length > 0
        ? messages.map(
            (msg: {
              _id: string;
              timestamp: React.ReactNode;
              username: React.ReactNode;
              message: React.ReactNode;
            }) => (
              <div key={msg._id}>
                <h1>{msg.timestamp}</h1>
                <h1>{msg.username}</h1>
                <h1>{msg.message}</h1>
              </div>
            )
          )
        : null}
    </div>
  );
}

export default MessageBox;

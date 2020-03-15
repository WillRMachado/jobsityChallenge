import React from "react";

function MessageBox(props: { messages: any }) {
  const { messages } = props;
  const sortedMessages = messages.sort(
    (a: { timestamp: any }, b: { timestamp: any }) =>
      a.timestamp > b.timestamp ? -1 : 1
  );
  return (
    <div>
      {messages.length > 0
        ? sortedMessages.map(
            (msg: {
              _id: string;
              timestamp: React.ReactNode;
              username: React.ReactNode;
              message: React.ReactNode;
            }) => (
              <div key={msg._id}>
                <h5>{msg.timestamp}</h5>
                <h5>{msg.username}</h5>
                <h5>{msg.message}</h5>
                <hr></hr>
              </div>
            )
          )
        : null}
    </div>
  );
}

export default MessageBox;

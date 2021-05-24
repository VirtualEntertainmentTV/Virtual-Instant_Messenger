import { Avatar } from "@material-ui/core";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../css/SidebarChat.css";
import { setChatInfo } from "../features/chatSlice";
import db from "../firebase";
import * as timeago from "timeago.js";

const SidebarChat = forwardRef(({ id, name, chatImage }, ref) => {
  const dispatch = useDispatch();
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setLastMessage(snapshot.docs.map((doc) => doc.data()))
      );
  });

  return (
    <div
      ref={ref}
      className="sidebarChat"
      onClick={() =>
        dispatch(
          setChatInfo({
            chatId: id,
            chatName: name,
            chatImage: chatImage,
          })
        )
      }
    >
      <Avatar src={chatImage} />
      <div className="sidebarChat__info">
        <small>{timeago.format(lastMessage[0]?.timestamp?.toDate())}</small>
        <h3>{name}</h3>
        {<p>{lastMessage[0]?.message}</p>}
      </div>
    </div>
  );
});

export default SidebarChat;

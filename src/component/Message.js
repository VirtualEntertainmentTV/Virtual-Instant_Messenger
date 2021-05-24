import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import "../css/Message.css";
import { selectUser } from "../features/userSlice";

const Message = forwardRef(
  ({ id, message, timestamp, sender, senderName }, ref) => {
    const user = useSelector(selectUser);
    return (
      <div ref={ref} className="message">
        <div className="message__content">
          <span>
            {user.email !== sender ? <span>{senderName}</span> : null}
          </span>
          <p>{message}</p>
          <small>{new Date(timestamp?.toDate()).toLocaleString}</small>
        </div>
      </div>
    );
  }
);

export default Message;

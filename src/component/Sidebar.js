import { Avatar, IconButton, Input } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../css/Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
import { Add } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";
import Modal from "react-modal";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function Sidebar() {
  const user = useSelector(selectUser);
  const [modal, setModal] = useState(false);
  const [chatInput, setChatInput] = useState(null);
  const [imageInput, setImageInput] = useState(
    "https://i.ibb.co/bQkbphV/vimsmall.png"
  );
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            chatName: doc.data(),
          }))
        )
      );
  }, []);

  const handleChat = (e) => {
    if (chatInput) {
      db.collection("chats").add({
        chatName: chatInput,
        chatImage: imageInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setChatInput(null);
    setImageInput("https://i.ibb.co/hf9bwVK/vim.png");
    setModal(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          src={user.photo}
          onClick={() => auth.signOut()}
          style={{
            cursor: "pointer",
          }}
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
        <Add
          onClick={() => setModal(true)}
          style={{
            color: "white",
            fontSize: "xx-large",
            paddingLeft: "10px",
            cursor: "pointer",
          }}
        />
        <Modal
          isOpen={modal}
          onRequestClose={() => setModal(false)}
          style={{
            overlay: {
              width: 500,
              height: 550,
              zIndex: "1000",
              background: "rgba(0,0,0,0.8)",
              top: "50%",
              left: "50%",
              marginTop: "-225px",
              marginLeft: "-250px",
            },
          }}
        >
          <div className="modal__info">
            <h3>Add New Chat Name</h3>
            <Input
              required
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="name__input"
              type="text"
              placeholder="Enter New Chat Name"
            />
            <h3>Add Profile Image (URL)</h3>
            <Input
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              required
              className="name__input"
              type="text"
              placeholder="Enter Chat Image Url"
            />
            <div className="modal__add">
              <IconButton onClick={handleChat}>
                <Add
                  style={{
                    fontSize: "xx-large",
                    color: "white",
                  }}
                />
              </IconButton>
            </div>
            <button onClick={() => setModal(false)}>Close</button>
          </div>
        </Modal>
      </div>
      <div className="sidebar__chats">
        <FlipMove>
          {chats.map(({ id, chatName }) => (
            <SidebarChat
              key={id}
              id={id}
              name={chatName.chatName}
              chatImage={chatName.chatImage}
            />
          ))}
        </FlipMove>
      </div>
      <div className="sidebar__notes">
        <div className="sidebar__notesIcon">
          <SpeakerNotesIcon />
        </div>
        <p>Note to Self</p>
      </div>
    </div>
  );
}

export default Sidebar;

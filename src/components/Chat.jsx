import React, { useState } from "react";
import axios from "axios";

const prompt = "talk like Walt Whitman";
const promptName = "Walt";

//let history = [{ role: "developer", content: prompt }];

function Chat() {
  const [convoHistory, setConvoHistory] = useState([
    { role: "developer", content: prompt },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // need useState for selection between promptNames

  const getResponse = async (newHistory) => {
    setLoading(true);
    try {
      console.log("Sending history:", newHistory);

      const res = await axios.post(
        "https://intense-reaches-17556-8fa8bab9eb70.herokuapp.com/chat",
        {
          history: newHistory,
        }
      );

      console.log("API response:", res.data);

      const response = {
        role: "assistant",
        content: res.data,
      };
      setConvoHistory((prevConvoHistory) => [...prevConvoHistory, response]);
    } catch (error) {
      console.error("Error sending messages to backend:", error);
    } finally {
      setLoading(false);
    }

    setMessage("");
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newHistory = [...convoHistory, { role: "user", content: message }];
    setConvoHistory(newHistory);
    console.log(convoHistory);
    getResponse(newHistory);
  };

  const clearChat = () => {
    setConvoHistory([{ role: "developer", content: prompt }]);
  };

  return (
    <>
      <div class="header">
        <h1>Walt Whitman</h1>
        <button class="btn" onClick={clearChat}>
          Clear Chat
        </button>
      </div>
      <div class="chat">
        <div class="chatBox">
          <div class="messages">
            {convoHistory.slice(1).map((item) => (
              <div key={item.content} class={item.role}>
                {item.content}
              </div>
            ))}
          </div>
        </div>
        <form class="userBox" onSubmit={handleSubmit}>
          <input
            class="textBox"
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="..."
            disabled={loading}
          />
          <button class="btn" type="submit" disabled={loading} role="button">
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default Chat;

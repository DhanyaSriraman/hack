import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "../Assets/User.svg";
import Response from "./Response.js";
import Input from "./Input";
import Send from "../Assets/send.svg";
import { useParams } from "react-router-dom";
let currentUserId = 0;

function Threads({ isConvoStarted, setIsConvoStarted }) {
  const { id } = useParams();
  const { user_id } = useParams();

  if (user_id !== undefined) {
    currentUserId = user_id;
  }

  const [input, setinput] = useState("");
  const [messages, setMessages] = useState([]);
  
  const newChat = {
    user_id: currentUserId,
    created_at: Math.floor(Date.now() / 1000),
  }

  useEffect(() => {
    if (isConvoStarted) {
      if (id !== undefined) {
        const fetchConversation = async () => {
          try {
            const convId = parseInt(id);
            const response = await axios.get(
              `http://127.0.0.1:8000/v1/conv/${convId}/chat/history`
            );
            const parsedMessages = response.data.conversation.map(
              ({ chat_id, user_msg, ai_msg }) => ({
                chat_id,
                input: user_msg,
                res: ai_msg,
              })
            );
            setMessages(parsedMessages);
          } catch (error) {
            console.error("Error fetching conversation:", error);
          } finally {
            setIsConvoStarted(false);
          }
        };
        fetchConversation();
      } else {
        setMessages([]);
        const getConvId = async () => {
          try {
            await axios.post("http://127.0.0.1:8000/v1/conv", newChat);
          } catch (error) {
            console.error("Error fetching conversation:", error);
          } finally {
            setIsConvoStarted(false);
          }
        };
        getConvId();
      }
    }
  }, [id, isConvoStarted]);

  const handleSubmit = async (e) => {
    const convId = parseInt(id);
    e.preventDefault();
    const chatPayload = {
      conv_id: convId,
      user_msg: input,
      doc_name: "java",
    };
    const response = await axios.post(
      "http://127.0.0.1:8000/v1/conv/chat",
      chatPayload
    );
    setMessages([...messages, { input: input, res: response.data.response }]);
    setinput("");
  };

  return (
    <div className="bg-[#A9BA9D] w-[100vw] h-[100vh]">
      <div className="flex flex-col justify-between h-[98vh]">
        <div className="bg-[#222222] flex mx-2 p-1 mt-4 px-2 rounded-2xl text-white justify-between">
          <div className="flex p-2">
            <img src={User} className="w-10 mx-2" alt="User" />
            <div>
              <p>Matsya Chatbot</p>
            </div>
          </div>
        </div>
        {/* Message Area */}
        <div className="overflow-y-scroll h-[75vh] py-2 px-4 scrollbar scrollbar-thumb-gray-900 scrollbar-h-[2vh]">
          <Response msg="Welcome to Matsya.You can chat in: English or தமிழ் or हिंदी" />
          {messages.map((res, index) => (
              <div key={index} className="">
                <Input msg={res.input} />
                <Response msg={res.res} />
              </div>
            ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-2 bg-[#222222] flex justify-between w-[80vw] px-4 py-2 rounded-lg"
        >
          <input
            autoFocus
            value={input}
            type="text"
            placeholder="Type your query..."
            className="px-4 w-[60vw] h-[7vh] bg-[#222222] rounded-lg  text-white focus:outline-none focus:border-none"
            onChange={(e) => {
              setinput(e.target.value);
            }}
          />
          <div className="flex">
            <button type="submit" className="mx-0">
              <img
                alt="Send"
                src={Send}
                className="text-white w-[4.5vw] h-[4.5vh] justify-center cursor-pointer mt-0.7 ml-2"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Threads;
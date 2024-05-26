import React, { useState, useEffect } from "react";
import cx from "classnames";
import MatsyaLogo from "../Assets/Logo12.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { formatUnixTimestamp } from "./utils";

function Sidebar({ setIsConvoStarted }) {
  const [conversation, setConversation] = useState([]);
  const { user_id } = useParams();
  const { id } = useParams();
  const fetchConversation = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/v1/conv/${user_id}/history`
      );
      setConversation(response.data.conversations);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    } finally {
      setIsConvoStarted(true);
    }
  };

  useEffect(() => {
    fetchConversation();
  }, []);

  return (
    <div className="bg-[#494949] w-[23vw] h-[100vh] text-white ">
      <div className="flex flex-col justify-between h-[80vh]">
        <img
          src={MatsyaLogo}
          alt="Logo"
          className="w-[17vw] h-[30vh] py-3 mx-auto"
        />
        <div className="flex flex-col justify-center items-center">
          <Link
            to={`/app/user/${user_id}/threads`}
            className="bg-[#333333] p-1.5 rounded-2xl w-60 my-2 text-base text-center relative"
            style={{ color: "#72A0C1" }}
            onClick={() => fetchConversation()}
          >
            New Chat
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2"></div>
          </Link>
          {conversation.map((conv) => {
              const currentConvStyle =
                conv.conversation_id == id
                  ? "bg-[#215A63] p-1.5 rounded-2xl w-60 my-2 text-base text-center"
                  : "bg-[#333333] p-1.5 rounded-2xl w-60 my-2 text-base text-center";
              return (
                <Link
                  key={conv.conversation_id}
                  to={`/app/user/${user_id}/threads/${conv.conversation_id}`}
                  className={cx(currentConvStyle)}
                  onClick={() => fetchConversation()}
                >
                  <div>{conv.conversation_tag}</div>
                  <div style={{ color: "#CCCCCC", fontSize: "12px" }}>
                    {formatUnixTimestamp(conv.created_at)}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

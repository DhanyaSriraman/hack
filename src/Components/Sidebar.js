import React, { useState, useEffect } from 'react';
import Logo from "../Assets/Logo.png";
import Logo4 from "../Assets/Logo12.png";
import Declaration from "../Assets/Declaration.png";
import { Route, Link } from "react-router-dom";
import axios from 'axios';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const conversationsData = {
  "conversations": [
    {
      "conversation_id": 1,
      "conversation_tag": "Fetch conversation History",
      "created_at": 100340243
    },
    {
      "conversation_id": 2,
      "conversation_tag": "second",
      "created_at": 100340245
    },
    {
      "conversation_id": 3,
      "conversation_tag": "third",
      "created_at": 100340289
    }
  ]
};
function Sidebar() {
  const [conversation, setConversation] = useState([]);
  const fetchConversation = async () => {
    try {
      console.log("In fetch prompts")
      const response = await axios.get('https://p9v82c8s-8000.inc1.devtunnels.ms/v1/conv/2/history');
      setConversation(response.data.conversations);
      console.log(conversation)
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };
//   let options = {"Access-Control-Allow-Origin": "*",'Accept':'*/*', "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT","Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",'Access-Control-Allow-Credentials':true
// ,crossorigin:true}
  useEffect(() => {
    fetchConversation();
  }, []);
  console.log(conversation)
  
  // const handleConversationClick = async (conversationId) => {
  //   // Fetch new data when a conversation is clicked
  //   await fetchConversation();
  //   // Implement logic for handling conversation click
  //   console.log('Conversation clicked:', conversationId);
  // };
// 127.0.0.1:8000/v1/conv/4/chat/history

return (
  <div className="bg-[#494949] w-[23vw] h-[100vh] text-white ">
    <div className="flex flex-col justify-between h-[80vh]">
      <img src={Logo4} alt="Logo" className="w-[17vw] h-[30vh] py-3 mx-auto" />
      <div className="flex flex-col justify-center items-center">
        <Link to={`/threads`}
          className="bg-[#333333] p-1.5 rounded-2xl w-60 my-2 text-base text-center relative"
          style={{ color: '#72A0C1' }} onClick={() => fetchConversation()}
        >
          New Chat
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </Link>
        {conversation.map((conv) => (
          <Link key={conv.conversation_id} to={`/threads/${conv.conversation_id}`} className="bg-[#333333] p-1.5 rounded-2xl w-60 my-2 text-base text-center" onClick={() => fetchConversation()}>
            <div>{conv.conversation_tag}</div>
            <div style={{ color: '#CCCCCC', fontSize: '12px' }}>{format(new Date(conv.created_at), 'dd/MM/yyyy hh:mm a')}</div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

}


export default Sidebar;

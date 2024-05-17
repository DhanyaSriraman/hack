import React, { useState,useEffect } from "react";
import axios from "axios";
import User from "../Assets/User.svg";
import Response from "./Response.js";
import Input from "./Input";
import darkmode from "../Assets/darkmode.svg";
import Switch from "react-switch";
import Dictaphone from "./Dictaphone";
import Send from "../Assets/send.svg";
import { useParams } from 'react-router-dom';
const conversations ={
  "conversation": [
      {
          "chat_id": 1,
          "user_msg": "What is wikipedia",
          "ai_msg": "Wikipedia is an online encyclopedia that is maintained by volunteers and dedicated to providing free, up-to-date information on various subjects. It contains articles on various topics from around the world, as well as photographs, maps, and other multimedia resources. Wikipedia aims to provide a wide range of knowledge on various subjects in order to help people learn and understand complex ideas. It is one of the most popular and widely used encyclopedias in the world today."
      },
      {
          "chat_id": 2,
          "user_msg": "tell me about Google-search",
          "ai_msg": "Google Search is an online search engine that allows users to search for information, images, and videos from the internet using keywords in their queries. The search engine works by processing user input, comparing it to the available results on the web, and returning relevant results to the user.\nTo use Google Search, you can simply type your query into the search box or click on the \"Search\" button in the toolbar above your screen. The search engine will then display a list of websites related to your query,"
      },
      {
          "chat_id": 3,
          "user_msg": "tell me about Java",
          "ai_msg": "Java is an open-source programming language developed by Sun Microsystems in 1995. It was designed to be platform-independent and can run on any operating system, including Windows, Linux, macOS, and Android.\nJava is widely used for building web applications, enterprise software, mobile apps, and other types of software that require a large amount of processing power. It has gained popularity due to its simplicity, flexibility, and wide range of libraries and frameworks available for developing desktop and web applications.\nOne of"
      },
      {
          "chat_id": 4,
          "user_msg": "tell me about python",
          "ai_msg": "Python is a high-level, interpreted programming language that was designed to be easy for beginners and experienced programmers alike. It was created by Guido van Rossum in 1991 and has since become one of the most widely used languages in the world.\nPython has a wide range of applications, including web development, data analysis, artificial intelligence, game development, and more. It supports multiple programming paradigms, such as procedural, object-oriented, and functional programming, which allows developers to write"
      }
  ]
}
function Threads() {
  console.log("In threads")
  const { id } = useParams();
  console.log("Conversation ID:", id);
  const [checked, setchecked] = useState(false);
  const [input, setinput] = useState("");
  const [msg, setmsg] = useState(input);
  const [typing, settyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState(""); 
  useEffect(() => {
    if (id !== undefined) {
      console.log("Hey in threads fetch")
      const fetchConversation = async () => {
        try {
          const parsedId = parseInt(id);
          const response = await axios.get(`https://p9v82c8s-8000.inc1.devtunnels.ms/v1/conv/${parsedId}/chat/history`);
          const parsedMessages = response.data.conversation.map(({ chat_id, user_msg, ai_msg }) => ({ chat_id, input: user_msg, res: ai_msg }));
          setMessages(parsedMessages);
          // const conversation = response.data.conversation
          // if (conversation) {
           
          // }
        } catch (error) {
          console.error('Error fetching conversation:', error);
        }
      };
  
      fetchConversation();
      // const conversation = conversations.conversation.find(conv => conv.chat_id === parseInt(id));
      // if (conversation) {
      //   setMessages([{ input: conversation.user_msg, res: conversation.ai_msg }]);
      // }
    }else {
      setMessages([]);
    }
  }, [id]);

  const handleClick = () => {
    setchecked(!checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input+" heyyyy input")
    const response = await axios.post("http://127.0.0.1:5000/api", { msg: input ,language: language});
    setMessages([...messages, { input: input, res: response.data }]);
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
        {/* <div className="flex justify-end p-4">
          <img src={darkmode} className="px-4" />
          <Switch
            onChange={handleClick}
            checked={checked}
            onColor={"#FFE600"}
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </div> */}
      </div>
      {/* Message Area */}
      <div className="overflow-y-scroll h-[75vh] py-2 px-4 scrollbar scrollbar-thumb-gray-900 scrollbar-h-[2vh] ">
      <Response msg="Welcome to Matsya.You can chat in: English or தமிழ் or हिंदी" />
        {messages.map((res, index) => (
          <div key={index} className="py-2 pl-4">
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
          onFocus={() => settyping(true)}
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
          <Dictaphone
            input={input}
            setinput={setinput}
            language={language}
            setLanguage={setLanguage}
            className="cursor-pointer px-0"
          />
        </div>
      </form>
    </div>
    </div>
  );
}

export default Threads;



// import React, { useState, useEffect } from "react";
// import User from "../Assets/User.svg";
// import Response from "./Response.js";
// import Input from "./Input";
// import darkmode from "../Assets/darkmode.svg";
// import Switch from "react-switch";
// import Dictaphone from "./Dictaphone";
// import Send from "../Assets/send.svg";

// function Threads() {
//   const [checked, setchecked] = useState(false);
//   const [input, setinput] = useState("");
//   const [msg, setmsg] = useState(input);
//   const [typing, settyping] = useState(false);
//   const [messages, setMessages] = useState([]);

//   const handleClick = () => {
//     if (checked) {
//       setchecked(false);
//     } else {
//       setchecked(true);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await axios.post("http://127.0.0.1:5000/api", { msg: input });
//     setMessages([...messages, { input: input, res: response.data }]);
//     setinput("");
//   };
//   console.log(msg);
//   useEffect(() => {}, [msg]);
//   return (
//     <div className="flex flex-col justify-between h-[98vh]">
//       <div className="bg-[#222222] flex mx-2 p-1 mt-4 px-2 rounded-2xl text-white justify-between">
//         <div className="flex p-2">
//           <img src={User} className="w-10 mx-2" alt="User" />
//           <div>
//             <p>Vakil Bot</p>
//             <p className="text-xs">@legal.ly</p>
//           </div>
//         </div>
//         <div className="flex justify-end p-4">
//           <img src={darkmode} className="px-4" />
//           <Switch
//             onChange={handleClick}
//             checked={checked}
//             onColor={"#FFE600"}
//             handleDiameter={30}
//             uncheckedIcon={false}
//             checkedIcon={false}
//             boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
//             activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
//             height={20}
//             width={48}
//             className="react-switch"
//             id="material-switch"
//           />
//         </div>
//       </div>
//       {/* Message Area */}
//       <div className="overflow-y-scroll h-[75vh] py-2 px-4 scrollbar scrollbar-thumb-gray-900 scrollbar-h-[2vh] ">
//         <Response msg="Hello how may I help you?" />

//         {messages.map((res) => (
//           <div className="py-2 pl-4">
//             <Input msg={res.input} />
//             <Response msg={res.res} />
//           </div>
//         ))}
//         {typing && (
//           <div className="px-4 w-fit p-3 h-fit bg-[#494949] ml-auto mr-16 rounded-lg text-center text-sm text-white rounded-br-none align-right ">
//             Typing ...
//           </div>
//         )}
//       </div>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           setMessages([
//             ...messages,
//             {
//               input: input,
//               res: "Yes Hello",
//             },
//           ]);
//           setinput("");
//           settyping(false);
//         }}
//         className="mx-2 bg-[#222222] flex justify-between w-[80vw] px-4 py-2 rounded-lg"
//       >
//         <input
//           onFocus={() => settyping(true)}
//           autoFocus
//           value={input}
//           type="text"
//           placeholder="Type your query..."
//           className="px-4 w-[60vw] h-[7vh] bg-[#222222] rounded-lg  text-white focus:outline-none focus:border-none"
//           onChange={(e) => {
//             setinput(e.target.value);
//           }}
//         />
//         <div className="flex">
//           <button type="submit" className="mx-0">
//             <img
//               alt="Send"
//               src={Send}
//               className="text-white w-[4.5vw] h-[4.5vh] justify-center cursor-pointer mt-0.7 ml-2"
//             />
//           </button>
//           <Dictaphone
//             input={input}
//             setinput={setinput}
//             className="cursor-pointer px-0"
//           />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Threads;
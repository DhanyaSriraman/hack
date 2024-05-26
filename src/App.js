import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogoHolder from "./Components/LogoHolder";
import Threads from "./Components/Threads";
import Home from "./Components/Home";
import MainLayout from "./Components/MainLayout";

function App() {
  const [isConvoStarted, setIsConvoStarted] = useState(false);
  return (
    <Router>
      <div className="App">
        <div className="font-[Poppins] flex">
          <LogoHolder />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app" element={<MainLayout setIsConvoStarted={setIsConvoStarted} />}>
              <Route path="user/:user_id/threads/:id" element={<Threads isConvoStarted={isConvoStarted} setIsConvoStarted={setIsConvoStarted} />} />
              <Route path="user/:user_id/threads" element={<Threads isConvoStarted={isConvoStarted} setIsConvoStarted={setIsConvoStarted} />} />
              {/* <Route path="threads" element={<Threads />} /> */}
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

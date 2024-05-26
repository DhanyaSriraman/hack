import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from "./Components/Sidebar1";
import Threads from "./Components/Threads";
import Home from "./Components/Home";
import MainLayout from "./Components/MainLayout";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="font-[Poppins] flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app" element={<MainLayout />}>
              <Route path="threads/:id" element={<Threads />} />
              <Route path="threads/user/:user_id" element={<Threads />} />
              <Route path="threads" element={<Threads />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

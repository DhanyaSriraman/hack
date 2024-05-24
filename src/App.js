import Sidebar from "./Components/Sidebar1";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Threads from "./Components/Threads";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="font-[Poppins] flex">
          <Sidebar />
          <Home />
          <Routes>
            <Route path="/threads/:id" element={<Threads />} />
            <Route path="/threads" element={<Threads />} />
            <Route path="/sidebar" element={<Sidebar />} />
            {/* <Route path="/" element={<Threads />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

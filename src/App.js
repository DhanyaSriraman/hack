import Sidebar from "./Components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Threads from "./Components/Threads";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="font-[Poppins] flex">
          <Sidebar />
          <Routes>
            <Route path="/threads/:id" element={<Threads />} />
            <Route path="/threads" element={<Threads />} />
            <Route path="/" element={<Threads />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

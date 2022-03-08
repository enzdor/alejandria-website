import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './Pages/Home';
import Books from './Pages/Books';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;

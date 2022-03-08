import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './Pages/Home';
import Books from './Pages/Books';
import Profile from './Pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

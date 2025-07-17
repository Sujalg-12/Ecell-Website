import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Events from './pages/EventsSection.jsx';
import useLenis from './pages/useLenis.jsx';

function App() {
  useLenis(); // ✅ Valid if it's a custom hook

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;


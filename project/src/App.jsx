import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/events" element={<Events />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

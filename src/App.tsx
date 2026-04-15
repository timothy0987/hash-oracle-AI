import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Markets from './pages/Markets';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <div className="min-height-screen bg-dark-bg text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
        
        <footer className="px-6 py-12 border-t border-white/5 mt-24">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-gray-500 text-sm">© 2026 HashOracle. Built for Hedera Hashgraph.</span>
            <div className="flex gap-8">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Twitter</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Discord</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Docs</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ControlDetail from './pages/ControlDetail';
import Frameworks from './pages/Frameworks';
import About from './pages/About';

function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 py-5 text-center">
        <p className="text-xs text-gray-400">
          Built for portfolio purposes. Data is simplified and not sourced from official framework publications.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/control/:id" element={<ControlDetail />} />
            <Route path="/frameworks" element={<Frameworks />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

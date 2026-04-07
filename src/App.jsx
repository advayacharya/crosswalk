import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ControlDetail from './pages/ControlDetail';
import Frameworks from './pages/Frameworks';
import About from './pages/About';

function Footer() {
  return (
    <footer className="surface-low border-t border-stone-high py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-steel font-bold text-xs uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          Sovereign Ledger v1.0.0
        </div>
        <p className="text-[10px] text-steel font-medium max-w-sm text-center md:text-right italic">
          Portfolio asset. Data is architecturally derived for demonstration purposes. Not sourced from official publications.
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

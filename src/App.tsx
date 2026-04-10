import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AsmeIndex from './pages/AsmeIndex';
import Disciplines from './pages/Disciplines';
import Instructors from './pages/Instructors';
import Pricing from './pages/Pricing';
import Planning from './pages/Planning';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<AsmeIndex />} />
          <Route path="/disciplines" element={<Disciplines />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;

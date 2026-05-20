import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import config from '../sanity.config';

const SanityStudio = lazy(() =>
  import('sanity').then(m => ({ default: m.Studio }))
);
import AsmeIndex from './pages/AsmeIndex';
import Disciplines from './pages/Disciplines';
import Instructors from './pages/Instructors';
import Pricing from './pages/Pricing';
import Planning from './pages/Planning';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import Histoire from './pages/Histoire';
import Actualites from './pages/Actualites';
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
          <Route path="/histoire" element={<Histoire />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/studio/*" element={
            <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Chargement...</div>}>
              <SanityStudio config={config} />
            </Suspense>
          } />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;

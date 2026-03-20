import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import PeoplePage from './pages/PeoplePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/people" element={<PeoplePage />} />
      </Routes>
    </BrowserRouter>
  );
}
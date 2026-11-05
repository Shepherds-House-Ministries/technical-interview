import { BrowserRouter, Route, Routes } from 'react-router';
import { VolunteersPage } from './VolunteersPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VolunteersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

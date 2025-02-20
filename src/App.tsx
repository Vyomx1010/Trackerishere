import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Goals } from './pages/Goals';
import { Analytics } from './pages/Analytics';
import { Achievements } from './pages/Achievements';
import { AuthLayout } from './components/AuthLayout';
import { Header } from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/dashboard"
            element={
              <>
                <Header />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/goals"
            element={
              <>
                <Header />
                <Goals />
              </>
            }
          />
          <Route
            path="/analytics"
            element={
              <>
                <Header />
                <Analytics />
              </>
            }
          />
          <Route
            path="/achievements"
            element={
              <>
                <Header />
                <Achievements />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
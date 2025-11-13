import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from './theme/theme';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
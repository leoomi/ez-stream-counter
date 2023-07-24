import { Routes, Route, Outlet, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ConfigurationPage from "./components/configuration-page/configuration-page.component";
import './App.css';
import CounterPage from "./components/counter-page/counter-page.component";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <ConfigurationPage />
        </ThemeProvider>
      }>
      </Route>
      <Route path="/counter/:id" element={<CounterPage />}>
      </Route>
    </Routes>
  );
}

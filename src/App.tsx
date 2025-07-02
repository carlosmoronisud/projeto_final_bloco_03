// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar'; // Será Navbar MUI
import Footer from './components/footer/Footer'; // Será Footer MUI
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importe componentes de Material UI para estrutura básica, se quiser
import { Box, createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Opcional: Tema personalizado do MUI
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Azul primário (pode ser o azul da sua imagem)
    },
    secondary: {
      main: '#FFC107', // Amarelo (para destaque, se necessário)
    },
    background: {
      default: '#E0FFFF', // Cor de fundo ciano principal
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Para reset de CSS básico */}
      <BrowserRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}> {/* flexGrow para ocupar espaço restante */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              {/* Rotas de categoria CRUD virão aqui depois */}
            </Routes>
          </Box>
          <Footer />
        </Box>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
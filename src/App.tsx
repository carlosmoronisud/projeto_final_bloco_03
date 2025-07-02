import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importar os novos componentes de Categoria
import ListaCategorias from './pages/categoria/ListaCategorias';
import FormCategoria from './pages/categoria/FormCategoria';
import DeleteCategoria from './pages/categoria/DeleteCategoria';


// Para o Material UI
import { Box, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import FormCategoriaEdicao from './pages/categoria/FormCategoriaEdicao';

// Opcional: Tema personalizado do MUI (pode ser mais detalhado)
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Azul primário (pode ser o azul do navbar)
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
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: 'calc(100vh - 64px - 80px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* Rotas para Categoria */}
            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/cadastroCategoria" element={<FormCategoria />} /> {/* Aponta para o de CADASTRO */}
            <Route path="/editarCategoria/:id" element={<FormCategoriaEdicao />} /> {/* Aponta para o de EDIÇÃO */}
            <Route path="/deletarCategoria/:id" element={<DeleteCategoria />} />

          </Routes>
        </Box>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
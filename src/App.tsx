import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componentes de Categoria (já feitos)
import ListaCategorias from './pages/categoria/ListaCategorias';
import FormCategoria from './pages/categoria/FormCategoria'; // Para Cadastro de Categoria
import FormCategoriaEdicao from './pages/categoria/FormCategoriaEdicao'; // Para Edição de Categoria
import DeleteCategoria from './pages/categoria/DeleteCategoria';

// Componentes de Produtos (agora com separação clara de cadastro e edição)


// Componente de Perfil
import Perfil from './pages/perfil/Perfil';

// Para o Material UI
import { Box, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import ListaProdutos from './pages/produtos/ListaProdutos';
import FormProdutoCadastro from './pages/produtos/FormProdutoCadastro';
import FormProdutoEdicao from './pages/produtos/FormProdutoEdicao';
import DeleteProduto from './pages/produtos/DeleteProdutos';
import ProdutosBuscaPage from './pages/ProdutosBuscaPage';

const theme = createTheme({
  palette: {
    primary: { main: '#007bff' },
    secondary: { main: '#FFC107' },
    background: { default: '#E0FFFF' },
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

                {/* Rotas de Categoria */}
                <Route path="/categorias" element={<ListaCategorias />} />
                <Route path="/cadastroCategoria" element={<FormCategoria />} />
                <Route path="/editarCategoria/:id" element={<FormCategoriaEdicao />} />
                <Route path="/deletarCategoria/:id" element={<DeleteCategoria />} />

                {/* Rotas para Produtos */}
                <Route path="/produtos" element={<ListaProdutos />} /> {/* Lista TODOS os produtos */}
                <Route path="/cadastroProduto" element={<FormProdutoCadastro />} />
                <Route path="/editarProduto/:id" element={<FormProdutoEdicao />} />
                <Route path="/deletarProduto/:id" element={<DeleteProduto />} />
                <Route path="/produtos/busca" element={<ProdutosBuscaPage />} /> {/* <<<< NOVA ROTA DE BUSCA */}

                {/* Rota para Perfil */}
                <Route path="/perfil" element={<Perfil />} />

              </Routes>
            </Box>
            <Footer />
            <ToastContainer />
          </BrowserRouter>
        </ThemeProvider>
      );
    }

    export default App;
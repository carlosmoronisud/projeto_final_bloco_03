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

// Componente de Perfil
import Perfil from './pages/perfil/Perfil';

// Para o Material UI
import { Box, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import ListaProdutos from './pages/produtos/ListaProdutos';
import FormProdutoCadastro from './pages/produtos/FormProdutoCadastro';
import FormProdutoEdicao from './pages/produtos/FormProdutoEdicao';
import DeleteProduto from './pages/produtos/DeleteProdutos';
import ProdutosBuscaPage from './pages/ProdutosBuscaPage';

// Importando o PrivateRoute para proteger rotas
import PrivateRoute from './routes/PrivateRoute'


// Importando o componente de login com Google
import LoginGoogle from './components/login/LoginGoogle';

// Configuração do tema do Material UI
const theme = createTheme({
  palette: {
    primary: { main: '#007bff' },
    secondary: { main: '#FFC107' },
    background: { default: '#E0FFFF' },
  },
});

 function App() {
      return (
        <>
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
                  <Route
                    path="/cadastroCategoria" 
                    element={
                      <PrivateRoute>
                        <FormCategoria />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/editarCategoria/:id"
                    element={
                      <PrivateRoute>
                        <FormCategoriaEdicao />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/deletarCategoria/:id"
                    element={
                      <PrivateRoute>
                        <DeleteCategoria />
                      </PrivateRoute>
                    }
                  />
                  {/* Rotas para Produtos */}
                  <Route path="/produtos" element={<ListaProdutos />} /> {/* Lista TODOS os produtos */}
                  <Route
                    path="/cadastroProduto"
                    element={
                      <PrivateRoute>
                        <FormProdutoCadastro />
                      </PrivateRoute>
                    }
                  />             
                  <Route
                    path="/editarProduto/:id"
                    element={
                      <PrivateRoute>
                        <FormProdutoEdicao />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/deletarProduto/:id"
                    element={
                      <PrivateRoute>
                        <DeleteProduto/>
                      </PrivateRoute>
                    }
                  />
                  {/* Rota para busca de produtos */}
                  <Route path="/produtos/busca" element={<ProdutosBuscaPage />} /> {/* <<<< NOVA ROTA DE BUSCA */}

                  {/* Rota para Perfil */}
                  <Route path="/login" element={<LoginGoogle />} />                  
                  <Route path="/perfil" element={<Perfil />} />
                  
                </Routes>
              </Box>
              <Footer />
              <ToastContainer />
            </BrowserRouter>
          </ThemeProvider>
        </>
      );
    }

    export default App;